import { logoImg } from '../../data/plantImages';

const links = ['Metodologia', 'API de dados', 'Instituições parceiras', 'Contato'];

export function Footer() {
  return (
    <footer className="bg-forest-900 text-cream-100">
      <div className="max-w-[1240px] mx-auto px-6 py-10 md:px-12 md:py-[46px] flex flex-col md:flex-row items-center justify-between gap-6 border-t border-cream-100/10">
        <img src={logoImg} alt="amazonbio atlas" className="h-8 md:h-[38px] w-auto block" />
        <div className="flex flex-wrap justify-center gap-x-[30px] gap-y-2 text-[13.5px] text-cream-100/60">
          {links.map((label) => (
            <a key={label} href="#" className="transition-colors duration-150 hover:text-lime-400">
              {label}
            </a>
          ))}
        </div>
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream-100/40">
          © 2026 · Base aberta
        </div>
      </div>
    </footer>
  );
}
