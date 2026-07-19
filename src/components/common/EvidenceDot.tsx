interface EvidenceDotProps {
  color: string;
  size?: number;
  glow?: boolean;
}

export function EvidenceDot({ color, size = 7, glow = false }: EvidenceDotProps) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: glow ? `0 0 0 4px ${color}29` : undefined,
      }}
    />
  );
}
