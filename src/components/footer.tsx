"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ABhavikj123",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bhavik-joshi-0b0636261",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:bhavikjoshi8989@gmail.com",
    icon: Mail,
  },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Social Links */}
        <div className="mb-8 flex justify-center space-x-6">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={link.name}
              >
                <Icon className="h-6 w-6" />
              </Link>
            )
          })}
        </div>

        {/* Navigation Links */}
        <div className="mb-8 flex justify-center space-x-8 text-sm">
          <Link
            href="/privacy"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MessageCraft. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Crafting professional communications with AI technology.
            For support or inquiries, please contact us through the links above.
          </p>
        </div>
      </div>
    </footer>
  )
} 