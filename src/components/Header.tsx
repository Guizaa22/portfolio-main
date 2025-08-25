'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle'; // Import ThemeToggle

export default function Header() {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    return isActive ? 'nav-link-active' : 'nav-link-inactive';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Adjust container to justify space between nav and toggle */}
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Placeholder for Logo or Name */}
            <span className="font-bold">Med Guizani</span>
          </Link>
          <Link href="/" className={getLinkClassName('/')}>
            Home
          </Link>
          <Link href="/experience" className={getLinkClassName('/experience')}>
            Experience
          </Link>
          <Link href="/projects" className={getLinkClassName('/projects')}>
            Projects
          </Link>
          <Link href="/contact" className={getLinkClassName('/contact')}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle /> {/* Add the ThemeToggle component */}
        </div>
      </div>
    </header>
  );
}