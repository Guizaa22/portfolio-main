import Link from 'next/link';
// We might need icons later, e.g., from lucide-react
// import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {currentYear} Med Guizani. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/Guizaa22" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            {/* Placeholder for GitHub Icon */}
            <span>GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/guizani-mohamed-b66802250/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
            {/* Placeholder for LinkedIn Icon */}
            <span>LinkedIn</span>
          </Link>
          {/* Add other links if needed */}
        </div>
      </div>
    </footer>
  );
}