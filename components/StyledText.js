'use client';

/**
 * StyledText Component
 * Küçük 'a' harflerine ss02, küçük 'd' harflerine ss01 uygular
 * Diğer harfler normal kalır
 */
export default function StyledText({ children, className = "" }) {
    if (typeof children !== 'string') {
        return <span className={className}>{children}</span>;
    }

    const processedText = children.split('').map((char, index) => {
        if (char === 'a') {
            return (
                <span key={index} className="glyph-a">
                    {char}
                </span>
            );
        }
        if (char === 'd') {
            return (
                <span key={index} className="glyph-d">
                    {char}
                </span>
            );
        }
        return char;
    });

    return <span className={className}>{processedText}</span>;
}
