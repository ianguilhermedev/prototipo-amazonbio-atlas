interface PillProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
}

// Property/compound tag pill. "light" is used on cream/white surfaces,
// "dark" on the forest-green hero — same shape and type scale, just an
// inverted outline so the same tag reads consistently in both places.
export function Pill({ children, variant = 'light' }: PillProps) {
  const styles =
    variant === 'light'
      ? 'text-forest-700 border-forest-700/25'
      : 'text-cream-100/90 border-cream-100/25';

  return (
    <span className={`text-[13px] border rounded-full px-[13px] py-[6px] whitespace-nowrap ${styles}`}>
      {children}
    </span>
  );
}
