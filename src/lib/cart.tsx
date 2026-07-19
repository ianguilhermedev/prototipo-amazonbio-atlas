import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'amazonbio-atlas:carrinho';

function lerArmazenamento(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

interface CartContextValue {
  slugs: string[];
  count: number;
  isInCart: (slug: string) => boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>(lerArmazenamento);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs]);

  const value = useMemo<CartContextValue>(
    () => ({
      slugs,
      count: slugs.length,
      isInCart: (slug) => slugs.includes(slug),
      add: (slug) => setSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug])),
      remove: (slug) => setSlugs((prev) => prev.filter((s) => s !== slug)),
      toggle: (slug) =>
        setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      clear: () => setSlugs([]),
    }),
    [slugs],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>');
  return ctx;
}
