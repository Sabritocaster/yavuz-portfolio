'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  GPUComposer,
  GPULayer,
  GPUProgram,
  FLOAT,
  INT,
  REPEAT,
  LINEAR,
  NEAREST,
} from 'gpu-io';

// Simulation parameters - matching original gpu-io fluid example
const TOUCH_FORCE_SCALE = 2;
const NUM_JACOBI_STEPS = 3;
const PRESSURE_CALC_ALPHA = -1;
const PRESSURE_CALC_BETA = 0.25;
const VELOCITY_SCALE_FACTOR = 8;
const MAX_VELOCITY = 30;

export default function FluidBackground({ className = '' }) {
  const canvasRef = useRef(null);
  const composerRef = useRef(null);
  const stateRef = useRef(null);
  const animationRef = useRef(null);
  const activeTouchesRef = useRef({});

  const initSimulation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    try {
      // Initialize GPU Composer
      const composer = new GPUComposer({ canvas });
      composerRef.current = composer;

      // Init velocity state at lower resolution for performance
      const velocityState = new GPULayer(composer, {
        name: 'velocity',
        dimensions: [Math.ceil(width / VELOCITY_SCALE_FACTOR), Math.ceil(height / VELOCITY_SCALE_FACTOR)],
        type: FLOAT,
        filter: LINEAR,
        numComponents: 2,
        wrapX: REPEAT,
        wrapY: REPEAT,
        numBuffers: 2,
      });

      const divergenceState = new GPULayer(composer, {
        name: 'divergence',
        dimensions: [velocityState.width, velocityState.height],
        type: FLOAT,
        filter: NEAREST,
        numComponents: 1,
        wrapX: REPEAT,
        wrapY: REPEAT,
      });

      const pressureState = new GPULayer(composer, {
        name: 'pressure',
        dimensions: [velocityState.width, velocityState.height],
        type: FLOAT,
        filter: NEAREST,
        numComponents: 1,
        wrapX: REPEAT,
        wrapY: REPEAT,
        numBuffers: 2,
      });

      // Advection program
      const advection = new GPUProgram(composer, {
        name: 'advection',
        fragmentShader: `
          in vec2 v_uv;
          uniform sampler2D u_state;
          uniform sampler2D u_velocity;
          uniform vec2 u_dimensions;
          out vec2 out_state;
          void main() {
            out_state = texture(u_state, v_uv - texture(u_velocity, v_uv).xy / u_dimensions).xy;
          }
        `,
        uniforms: [
          { name: 'u_state', value: 0, type: INT },
          { name: 'u_velocity', value: 1, type: INT },
          { name: 'u_dimensions', value: [width, height], type: FLOAT },
        ],
      });

      // Divergence program
      const divergence2D = new GPUProgram(composer, {
        name: 'divergence2D',
        fragmentShader: `
          in vec2 v_uv;
          uniform sampler2D u_vectorField;
          uniform vec2 u_pxSize;
          out float out_divergence;
          void main() {
            float n = texture(u_vectorField, v_uv + vec2(0, u_pxSize.y)).y;
            float s = texture(u_vectorField, v_uv - vec2(0, u_pxSize.y)).y;
            float e = texture(u_vectorField, v_uv + vec2(u_pxSize.x, 0)).x;
            float w = texture(u_vectorField, v_uv - vec2(u_pxSize.x, 0)).x;
            out_divergence = 0.5 * (e - w + n - s);
          }
        `,
        uniforms: [
          { name: 'u_vectorField', value: 0, type: INT },
          { name: 'u_pxSize', value: [1 / velocityState.width, 1 / velocityState.height], type: FLOAT },
        ],
      });

      // Jacobi iteration for pressure
      const jacobi = new GPUProgram(composer, {
        name: 'jacobi',
        fragmentShader: `
          in vec2 v_uv;
          uniform float u_alpha;
          uniform float u_beta;
          uniform vec2 u_pxSize;
          uniform sampler2D u_previousState;
          uniform sampler2D u_divergence;
          out vec4 out_jacobi;
          void main() {
            vec4 n = texture(u_previousState, v_uv + vec2(0, u_pxSize.y));
            vec4 s = texture(u_previousState, v_uv - vec2(0, u_pxSize.y));
            vec4 e = texture(u_previousState, v_uv + vec2(u_pxSize.x, 0));
            vec4 w = texture(u_previousState, v_uv - vec2(u_pxSize.x, 0));
            vec4 d = texture(u_divergence, v_uv);
            out_jacobi = (n + s + e + w + u_alpha * d) * u_beta;
          }
        `,
        uniforms: [
          { name: 'u_alpha', value: PRESSURE_CALC_ALPHA, type: FLOAT },
          { name: 'u_beta', value: PRESSURE_CALC_BETA, type: FLOAT },
          { name: 'u_pxSize', value: [1 / velocityState.width, 1 / velocityState.height], type: FLOAT },
          { name: 'u_previousState', value: 0, type: INT },
          { name: 'u_divergence', value: 1, type: INT },
        ],
      });

      // Gradient subtraction
      const gradientSubtraction = new GPUProgram(composer, {
        name: 'gradientSubtraction',
        fragmentShader: `
          in vec2 v_uv;
          uniform vec2 u_pxSize;
          uniform sampler2D u_scalarField;
          uniform sampler2D u_vectorField;
          out vec2 out_result;
          void main() {
            float n = texture(u_scalarField, v_uv + vec2(0, u_pxSize.y)).r;
            float s = texture(u_scalarField, v_uv - vec2(0, u_pxSize.y)).r;
            float e = texture(u_scalarField, v_uv + vec2(u_pxSize.x, 0)).r;
            float w = texture(u_scalarField, v_uv - vec2(u_pxSize.x, 0)).r;
            out_result = texture(u_vectorField, v_uv).xy - 0.5 * vec2(e - w, n - s);
          }
        `,
        uniforms: [
          { name: 'u_pxSize', value: [1 / velocityState.width, 1 / velocityState.height], type: FLOAT },
          { name: 'u_scalarField', value: 0, type: INT },
          { name: 'u_vectorField', value: 1, type: INT },
        ],
      });

      // Touch interaction program
      const touch = new GPUProgram(composer, {
        name: 'touch',
        fragmentShader: `
          in vec2 v_uv;
          in vec2 v_uv_local;
          uniform sampler2D u_velocity;
          uniform vec2 u_vector;
          out vec2 out_velocity;
          void main() {
            vec2 radialVec = (v_uv_local * 2.0 - 1.0);
            float radiusSq = dot(radialVec, radialVec);
            vec2 velocity = texture(u_velocity, v_uv).xy + (1.0 - radiusSq) * u_vector * ${TOUCH_FORCE_SCALE.toFixed(1)};
            float velocityMag = length(velocity);
            out_velocity = velocity / max(velocityMag, 0.0001) * min(velocityMag, ${MAX_VELOCITY.toFixed(1)});
          }
        `,
        uniforms: [
          { name: 'u_velocity', value: 0, type: INT },
          { name: 'u_vector', value: [0, 0], type: FLOAT },
        ],
      });

      // Store state for animation loop
      stateRef.current = {
        velocityState,
        divergenceState,
        pressureState,
        advection,
        divergence2D,
        jacobi,
        gradientSubtraction,
        touch,
      };

      // Animation loop
      const animate = () => {
        const state = stateRef.current;
        if (!state) return;

        const {
          velocityState,
          divergenceState,
          pressureState,
          advection,
          divergence2D,
          jacobi,
          gradientSubtraction,
        } = state;

        // Advect the velocity vector field
        composer.step({
          program: advection,
          input: [velocityState, velocityState],
          output: velocityState,
        });

        // Compute divergence of advected velocity field
        composer.step({
          program: divergence2D,
          input: velocityState,
          output: divergenceState,
        });

        // Compute pressure gradient using Jacobi iterations
        for (let i = 0; i < NUM_JACOBI_STEPS; i++) {
          composer.step({
            program: jacobi,
            input: [pressureState, divergenceState],
            output: pressureState,
          });
        }

        // Subtract pressure gradient from velocity
        composer.step({
          program: gradientSubtraction,
          input: [pressureState, velocityState],
          output: velocityState,
        });

        // Render velocity as vector field (this is the "Velocity" render mode)
        composer.drawLayerAsVectorField({
          layer: velocityState,
          vectorSpacing: 10,
          vectorScale: 2.5,
          color: [255, 255, 255], // White vectors on red background
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      // Start animation
      animate();

      // Add some initial velocity to start the animation
      const addInitialVelocity = () => {
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const dx = (Math.random() - 0.5) * 20;
          const dy = (Math.random() - 0.5) * 20;
          
          touch.setUniform('u_vector', [dx, dy]);
          composer.stepSegment({
            program: touch,
            input: velocityState,
            output: velocityState,
            position1: [x, y],
            position2: [x + dx * 2, y + dy * 2],
            thickness: 50,
            endCaps: true,
          });
        }
      };
      
      setTimeout(addInitialVelocity, 100);

    } catch (error) {
      console.error('Failed to initialize fluid simulation:', error);
    }
  }, []);

  useEffect(() => {
    initSimulation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Touch events - using DOM events like original gpu-io example
    const onPointerMove = (e) => {
      const composer = composerRef.current;
      const state = stateRef.current;
      if (!composer || !state) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pointerId = e.pointerId || 0;

      if (activeTouchesRef.current[pointerId] === undefined) {
        activeTouchesRef.current[pointerId] = { current: [x, y] };
        return;
      }

      activeTouchesRef.current[pointerId].last = activeTouchesRef.current[pointerId].current;
      activeTouchesRef.current[pointerId].current = [x, y];

      const { current, last } = activeTouchesRef.current[pointerId];
      if (current[0] === last[0] && current[1] === last[1]) return;

      const { touch, velocityState } = state;
      touch.setUniform('u_vector', [current[0] - last[0], -(current[1] - last[1])]);
      composer.stepSegment({
        program: touch,
        input: velocityState,
        output: velocityState,
        position1: [current[0], canvas.clientHeight - current[1]],
        position2: [last[0], canvas.clientHeight - last[1]],
        thickness: 30,
        endCaps: true,
      });
    };

    const onPointerStop = (e) => {
      const pointerId = e.pointerId || 0;
      delete activeTouchesRef.current[pointerId];
    };

    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (composerRef.current) {
        composerRef.current.dispose();
      }
      stateRef.current = null;
      activeTouchesRef.current = {};
      initSimulation();
    };

    // Add event listeners
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerStop);
    canvas.addEventListener('pointerout', onPointerStop);
    canvas.addEventListener('pointercancel', onPointerStop);
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerStop);
      canvas.removeEventListener('pointerout', onPointerStop);
      canvas.removeEventListener('pointercancel', onPointerStop);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (composerRef.current) {
        composerRef.current.dispose();
      }
    };
  }, [initSimulation]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} bg-[#FF0000]`}
      style={{ touchAction: 'none' }}
    />
  );
}
