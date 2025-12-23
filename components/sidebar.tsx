"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Upload,
  Edit3,
  Map,
  TrendingUp,
  AlertTriangle,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, current: true },
  { name: "Data Upload", icon: Upload, current: false },
  { name: "Manual Input", icon: Edit3, current: false },
  { name: "Map", icon: Map, current: false },
  { name: "Predictions", icon: TrendingUp, current: false },
  { name: "Alerts", icon: AlertTriangle, current: false },
  { name: "Reports", icon: FileText, current: false },
  { name: "Settings", icon: Settings, current: false },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden glassmorphism neon-glow"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isExpanded ? "translate-x-0" : "-translate-x-full lg:w-16",
        )}
      >
        <div className="flex h-full flex-col glassmorphism border-r border-border">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary neon-glow flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span
                className={cn(
                  "font-bold text-lg transition-opacity duration-300",
                  !isExpanded && "lg:opacity-0 lg:hidden",
                )}
              >
                LandslideAI
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  item.current && "neon-glow",
                  !isExpanded && "lg:justify-center lg:px-2",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={cn("ml-3 transition-opacity duration-300", !isExpanded && "lg:opacity-0 lg:hidden")}>
                  {item.name}
                </span>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  )
}
