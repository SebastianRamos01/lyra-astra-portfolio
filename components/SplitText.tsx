type SplitTextProps = {
  text: string;
  start?: number;
};

// Crawlers and screen readers get the whole line; the per-character copy is decorative.
export function SplitText({ text, start = 0 }: SplitTextProps) {
  return (
    <>
      <div className="sr-only">{text}</div>
      <div className="split-line" aria-hidden="true">
        {Array.from(text).map((char, i) => (
          <div
            key={i}
            className="split-char"
            style={{ "--i": start + i } as React.CSSProperties}
          >
            {char === " " ? " " : char}
          </div>
        ))}
      </div>
    </>
  );
}
