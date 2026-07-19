import { Link } from 'react-router-dom';
import { logoImg } from '../../data/plantImages';
import { useCart } from '../../lib/cart';

const links = ['Espécies', 'Evidências', 'Sobre a base'];

export function Nav() {
  const { count } = useCart();

  return (
    <nav className="relative max-w-[1240px] mx-auto flex items-center justify-between gap-6 px-6 py-6 md:px-12 md:py-[30px]">
      <img src={logoImg} alt="amazonbio atlas" className="h-9 md:h-[46px] w-auto block" />
      <div className="flex items-center gap-4 md:gap-[38px]">
        <div className="hidden md:flex items-center gap-[34px] text-[15px] text-cream-100/72">
          {links.map((label) => (
            <a key={label} href="#" className="transition-colors duration-150 hover:text-lime-400">
              {label}
            </a>
          ))}
        </div>
        <Link
          to="/carrinho"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-[11px] md:px-[22px] rounded-full border border-cream-100/32 text-cream-100 transition-colors duration-150 hover:border-lime-400 hover:text-lime-400"
        >
          Seleção
          {count > 0 && (
            <span className="inline-flex items-center justify-center min-w-[19px] h-[19px] px-1 rounded-full bg-lime-400 text-forest-900 font-mono text-[11px] font-semibold leading-none">
              {count}
            </span>
          )}
        </Link>
        <a
          href="#"
          className="hidden sm:inline-block text-sm font-medium px-4 py-[11px] md:px-[22px] rounded-full border border-cream-100/32 text-cream-100 transition-colors duration-150 hover:border-lime-400 hover:text-lime-400"
        >
          Explorar o atlas
        </a>
      </div>
    </nav>
  );
}
