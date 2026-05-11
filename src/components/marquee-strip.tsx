type MarqueeStripProps = {
  items: string[];
  reverse?: boolean;
  className?: string;
};

export function MarqueeStrip({
  items,
  reverse = false,
  className,
}: MarqueeStripProps) {
  const loopItems = [...items, ...items];

  return (
    <div className={['motion-marquee', className].filter(Boolean).join(' ')}>
      <div className={['motion-marquee-track', reverse ? 'motion-marquee-track--reverse' : ''].join(' ')}>
        {loopItems.map((item, index) => (
          <span key={`${item}-${index}`} className="motion-marquee-chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
