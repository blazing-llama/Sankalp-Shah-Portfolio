import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Built', href: '#built' },
  { name: 'How I Work', href: '#how-i-work' },
  { name: 'Analyzed', href: '#analyzed' },
  { name: 'More Work', href: '#more' },
  { name: 'About', href: '#about' },
  { name: 'Interests', href: '#outside-backlog' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['hero', 'built', 'how-i-work', 'analyzed', 'more', 'about', 'outside-backlog'];
      let currentSection = 'hero';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-[#252525] py-3'
          : 'bg-[#0D0D0D]/60 backdrop-blur-md border-b border-[#252525]/50 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          id="nav-logo-link"
          className="group flex items-center gap-2.5 text-white decoration-transparent"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#6C47FF] shadow-[0_0_10px_rgba(108,71,255,0.8)] group-hover:scale-125 transition-transform" />
          <span className="font-syne font-extrabold text-base tracking-tight text-[#F2F2F2] group-hover:text-white transition-colors">
            Sankalp Shah
          </span>
          <span className="hidden md:inline-block text-xs font-mono text-[#666] ml-1 pl-2.5 border-l border-[#2E2E2E]">
            PM · AI Systems
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const sectionKey = item.href.replace('#', '');
              const isActive = activeSection === sectionKey;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    id={`nav-link-${sectionKey}`}
                    className={`nav-link-item text-xs font-medium tracking-wider transition-colors py-1 ${
                      isActive
                        ? 'text-white active'
                        : 'text-[#888888] hover:text-[#F2F2F2]'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 pl-4 border-l border-[#252525]">
            <a
              href="mailto:sankalp7979@gmail.com"
              id="nav-contact-cta"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#171717] hover:bg-[#222222] text-[#B0A0FF] hover:text-white border border-[#2E2E2E] hover:border-[#6C47FF]/50 transition-all"
            >
              <Mail className="w-3 h-3 text-[#6C47FF]" />
              <span>Get in touch</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-[#888888] hover:text-white rounded-lg bg-[#171717] border border-[#252525]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown"
          className="md:hidden bg-[#111111]/95 backdrop-blur-2xl border-b border-[#252525] px-6 py-5"
        >
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const sectionKey = item.href.replace('#', '');
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#6C47FF]/15 text-[#B0A0FF] border border-[#6C47FF]/30'
                      : 'text-[#888888] hover:text-white hover:bg-[#171717]'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#6C47FF]" />}
                </a>
              );
            })}
            <div className="pt-3 mt-1 border-t border-[#252525]">
              <a
                href="mailto:sankalp7979@gmail.com"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-semibold bg-[#6C47FF] text-white hover:bg-[#8B6FFF] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Sankalp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
