'use client';

import { useEffect } from 'react';

/**
 * GlyphProvider - Global Font Feature Provider
 * Tüm DOM'daki küçük 'a' harflerine ss02, küçük 'd' harflerine ss01 uygular
 * MutationObserver ile dinamik içerikleri de yakalar
 */
export default function GlyphProvider({ children }) {
    useEffect(() => {
        const processTextNode = (textNode) => {
            const text = textNode.textContent;
            // Sadece 'a' veya 'd' içeren text node'ları işle
            if (!text.match(/[ad]/)) return;

            const fragment = document.createDocumentFragment();
            let hasChanges = false;

            text.split('').forEach(char => {
                if (char === 'a') {
                    const span = document.createElement('span');
                    span.className = 'glyph-a';
                    span.textContent = char;
                    fragment.appendChild(span);
                    hasChanges = true;
                } else if (char === 'd') {
                    const span = document.createElement('span');
                    span.className = 'glyph-d';
                    span.textContent = char;
                    fragment.appendChild(span);
                    hasChanges = true;
                } else {
                    fragment.appendChild(document.createTextNode(char));
                }
            });

            if (hasChanges && textNode.parentNode) {
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        };

        const processElement = (element) => {
            // Script, style, ve zaten işlenmiş elementleri atla
            if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
            if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'TEXTAREA', 'INPUT'].includes(element.tagName)) return;
            if (element.classList?.contains('glyph-a') || element.classList?.contains('glyph-d')) return;

            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        // Boş text node'ları ve zaten işlenmiş olanları atla
                        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
                        if (node.parentElement?.classList?.contains('glyph-a')) return NodeFilter.FILTER_REJECT;
                        if (node.parentElement?.classList?.contains('glyph-d')) return NodeFilter.FILTER_REJECT;
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            const textNodes = [];
            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }

            // Text node'ları tersten işle (DOM değişikliklerinden etkilenmemek için)
            textNodes.reverse().forEach(processTextNode);
        };

        // İlk yükleme
        processElement(document.body);

        // Dinamik içerikler için MutationObserver
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        processElement(node);
                    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.match(/[ad]/)) {
                        processTextNode(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }, []);

    return children;
}
