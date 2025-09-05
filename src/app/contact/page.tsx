'use client'; // Needed for form handling later, even if basic for now

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

// Note: Metadata export might need adjustment if 'use client' is strictly required at the top level.
// For now, we keep it, but might need a separate layout or server component for metadata if form interaction becomes complex.
// export const metadata: Metadata = {
//   title: "Contact | Med Guizani",
//   description: "Get in touch with Med Guizani via email, LinkedIn, or the contact form.",
// };


export default function ContactPage() {

  // Basic handler to prevent default form submission for now
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        setSuccess(result.message || 'Message sent successfully!');
        form.reset();
      } else {
        const result = await res.json();
        setError(result.error || 'Failed to send message.');
      }
    } catch {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-12 md:mb-16">
        Get In Touch
      </h1>

      {/* Add wrapper div with accent background */}
      <div className="bg-muted/10 rounded-lg p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p className="text-muted-foreground">
            Feel free to reach out via email or connect on social media.
          </p>
          <div className="space-y-4">
            <Link href="mailto:hama.guizeni842@gmail.com" className="flex items-center space-x-3 group">
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground group-hover:text-primary transition-colors">hama.guizeni842@gmail.com</span>
            </Link>
            <Link href="https://www.linkedin.com/in/guizani-mohamed-b66802250/" target="_blank" rel="noreferrer" className="flex items-center space-x-3 group">
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground group-hover:text-primary transition-colors">LinkedIn</span>
            </Link>
            <Link href="https://github.com/Guizaa22" target="_blank" rel="noreferrer" className="flex items-center space-x-3 group">
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground group-hover:text-primary transition-colors">GitHub</span>
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
           <h2 className="text-2xl font-semibold">Send a Message</h2>
           <form onSubmit={handleSubmit} className="space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="name">Name</Label>
                 <Input id="name" name="name" placeholder="Your Name" required />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
               </div>
             </div>
             <div className="space-y-2">
               <Label htmlFor="subject">Subject</Label>
               <Input id="subject" name="subject" placeholder="Subject of your message" required />
             </div>
             <div className="space-y-2">
               <Label htmlFor="message">Message</Label>
               <Textarea id="message" name="message" placeholder="Your message..." required rows={5} />
             </div>
             <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
             {success && <div className="text-green-600 pt-2">{success}</div>}
             {error && <div className="text-red-600 pt-2">{error}</div>}
           </form>
        </div>
          </div>
        </div>
      </div>
  );
}