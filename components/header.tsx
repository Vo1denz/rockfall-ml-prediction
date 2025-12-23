"use client"

import { Bell, User, Wifi, Database, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="h-16 border-b border-border glassmorphism">
      <div className="flex h-full items-center justify-between px-6">
        {/* Greeting */}
        <div>
          <h1 className="text-xl font-semibold text-balance">Good morning, User</h1>
          <p className="text-sm text-muted-foreground">Monitoring 247 geological sites in India</p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4 text-primary" />
            <Badge variant="secondary" className="neon-glow">
              Online
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-accent" />
            <Badge variant="secondary" className="neon-glow-cyan">
              Synced
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-primary" />
            <Badge variant="secondary" className="neon-glow">
              Active
            </Badge>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs neon-glow-red">3</Badge>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
