"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"
import { useState } from "react"
import { navigationLinks } from "@/config/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <div className="flex flex-1 items-center gap-2 md:gap-8">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">MessageCraft</span>
          </Link>
          <div
            className={`absolute left-0 right-0 top-[56px] border-b bg-background p-4 md:static md:border-none md:bg-transparent md:p-0 ${
              isMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                {navigationLinks.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}