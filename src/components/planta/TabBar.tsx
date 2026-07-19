import { TABS } from './tabs';

interface TabBarProps {
  active: string;
  onChange: (id: string) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="sticky top-0 z-20 bg-cream-100/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`font-mono text-[11.5px] tracking-[0.08em] uppercase whitespace-nowrap px-4 py-5 border-b-2 transition-colors duration-150 ${
                  isActive
                    ? 'border-forest-900 text-forest-900'
                    : 'border-transparent text-forest-900/45 hover:text-forest-900/75'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
