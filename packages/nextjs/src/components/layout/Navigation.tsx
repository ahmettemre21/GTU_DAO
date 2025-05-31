"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Menu, X, Home, Vote, Users, Wallet, Zap, Bell } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Proposals", href: "/proposals", icon: Vote },
    { name: "Team", href: "/team", icon: Users },
    { name: "Verify", href: "/verify", icon: Shield },
  ]

  return (
    <nav className="bg-[#0B0E12] border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#00C4FF] to-white bg-clip-text text-transparent">
              GTU DAO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-[#00C4FF] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge className="bg-[#00C4FF]/20 text-[#00C4FF] border-[#00C4FF]/30">
              <Zap className="w-3 h-3 mr-1" />
              1,250 STAT
            </Badge>
            <Button variant="outline" size="icon" className="border-gray-600 hover:border-[#00C4FF]">
              <Bell className="w-4 h-4" />
            </Button>
            <Button className="bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]">
              <Wallet className="w-4 h-4 mr-2" />
              Connect
            </Button>
            <Avatar className="w-8 h-8 border-2 border-[#00C4FF]">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-[#00C4FF] to-[#0080CC] text-white text-sm">
                JD
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#00C4FF] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <Badge className="bg-[#00C4FF]/20 text-[#00C4FF] border-[#00C4FF]/30">
                  <Zap className="w-3 h-3 mr-1" />
                  1,250 STAT
                </Badge>
                <Button className="w-full bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 