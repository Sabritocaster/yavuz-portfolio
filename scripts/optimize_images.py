import os
import sys
import time
from pathlib import Path
from PIL import Image, ImageOps

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def find_source_dir():
    candidates = [
        Path(r"C:\Users\yavuz\Desktop\2026 Spring Photos"),
        Path(r"C:\Users\yavuz\Desktop\2026 Spring Photo"),
        Path("./2026 Spring Photos").resolve(),
        Path("./2026 Spring Photo").resolve(),
    ]
    for c in candidates:
        if c.exists() and c.is_dir():
            return c
    return None

def optimize_images(src_root: Path, dest_root: Path, max_dim: int = 2048, quality: int = 80):
    dest_root.mkdir(parents=True, exist_ok=True)
    
    image_extensions = {".jpg", ".jpeg", ".png", ".webp", ".tiff", ".bmp"}
    all_files = [
        f for f in src_root.rglob("*")
        if f.is_file() and f.suffix.lower() in image_extensions and "optimized" not in f.parts
    ]
    
    total_files = len(all_files)
    print(f"Found {total_files} images in '{src_root}'")
    print(f"Output directory: '{dest_root}'")
    print(f"Settings: max dimension = {max_dim}px, JPEG quality = {quality}% (progressive & optimized)")
    print("-" * 60)
    
    total_original_bytes = 0
    total_optimized_bytes = 0
    start_time = time.time()
    
    for idx, file_path in enumerate(all_files, 1):
        rel_path = file_path.relative_to(src_root)
        dest_file = (dest_root / rel_path).with_suffix(".jpg")
        dest_file.parent.mkdir(parents=True, exist_ok=True)
        
        orig_size = file_path.stat().st_size
        total_original_bytes += orig_size
        
        try:
            with Image.open(file_path) as img:
                # Transpose according to EXIF orientation tag so orientation is preserved
                img = ImageOps.exif_transpose(img)
                
                # Convert palette or RGBA to RGB for JPEG compatibility
                if img.mode in ("RGBA", "LA", "P"):
                    # Create white background for alpha channel
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    if img.mode == "P":
                        img = img.convert("RGBA")
                    background.paste(img, mask=img.split()[3])
                    img = background
                elif img.mode != "RGB":
                    img = img.convert("RGB")
                
                # Resize if exceeding max dimension
                orig_w, orig_h = img.size
                if max(orig_w, orig_h) > max_dim:
                    if orig_w >= orig_h:
                        new_w = max_dim
                        new_h = int(round(orig_h * (max_dim / orig_w)))
                    else:
                        new_h = max_dim
                        new_w = int(round(orig_w * (max_dim / orig_h)))
                    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                
                # Save optimized JPEG
                img.save(
                    dest_file,
                    format="JPEG",
                    quality=quality,
                    optimize=True,
                    progressive=True
                )
            
            opt_size = dest_file.stat().st_size
            total_optimized_bytes += opt_size
            savings = (1 - (opt_size / orig_size)) * 100 if orig_size > 0 else 0
            
            print(f"[{idx}/{total_files}] {rel_path} -> {orig_size / (1024*1024):.2f}MB to {opt_size / 1024:.1f}KB (-{savings:.1f}%)")
            
        except Exception as e:
            print(f"[{idx}/{total_files}] ERROR processing {rel_path}: {e}")
            
    elapsed = time.time() - start_time
    orig_mb = total_original_bytes / (1024 * 1024)
    opt_mb = total_optimized_bytes / (1024 * 1024)
    total_savings = (1 - (total_optimized_bytes / total_original_bytes)) * 100 if total_original_bytes > 0 else 0
    
    print("=" * 60)
    print(f"Completed in {elapsed:.1f}s")
    print(f"Total Original:  {orig_mb:.2f} MB")
    print(f"Total Optimized: {opt_mb:.2f} MB")
    print(f"Total Reduction: -{total_savings:.1f}% (saved {orig_mb - opt_mb:.2f} MB)")
    print(f"All files saved to: {dest_root}")

if __name__ == "__main__":
    src_dir = find_source_dir()
    if not src_dir:
        print("Error: Could not find '2026 Spring Photos' or '2026 Spring Photo' directory on Desktop.")
        sys.exit(1)
        
    out_dir = Path("./images/optimized").resolve()
    if len(sys.argv) > 1:
        out_dir = Path(sys.argv[1]).resolve()
        
    optimize_images(src_dir, out_dir, max_dim=2048, quality=80)
