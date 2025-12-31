"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    Video,
    Info,
    Store,
    Wrench,
    Code2,
    Tv,
    ChevronDown,
    ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarItems = [
    { icon: Home, label: "Trang chủ", href: "/" },
    { icon: Video, label: "Video", href: "/video" },
    { icon: Info, label: "Giới thiệu", href: "/about" },
    { icon: Store, label: "Cửa hàng", href: "/store" },
    { icon: Wrench, label: "Công cụ", href: "/tools" },
]

interface SidebarProps {
    categories?: any[];
}

function CategoryItem({ item }: { item: any }) {
    const pathname = usePathname()
    // Check if child is active to auto-expand
    const hasChildren = item.children && item.children.edges.length > 0
    const isChildActive = hasChildren && item.children.edges.some(({ node: child }: any) => pathname === `/category/${child.slug}`)

    // Auto-expand if a child is active
    const [isOpen, setIsOpen] = useState(isChildActive)
    const isActive = pathname === `/category/${item.slug}`

    if (!hasChildren) {
        return (
            <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                    "w-full justify-start font-normal transition-all duration-200",
                    isActive ? "bg-secondary font-medium text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
                asChild
            >
                <Link href={`/category/${item.slug}`}>
                    <span className="truncate">{item.name}</span>
                </Link>
            </Button>
        )
    }

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-1 group">
                <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                        "flex-1 justify-start font-normal pl-3 transition-colors",
                        isActive ? "bg-secondary font-medium text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                    asChild
                >
                    <Link href={`/category/${item.slug}`}>
                        <span className="truncate">{item.name}</span>
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ChevronRight className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-90")} />
                </Button>
            </div>

            <div className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out pl-4",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}>
                <div className="overflow-hidden border-l border-border/50 ml-2 pl-2 space-y-1">
                    {item.children.edges.map(({ node: child }: any) => {
                        const isChildLinkActive = pathname === `/category/${child.slug}`
                        return (
                            <Button
                                key={child.slug}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start font-normal h-8 text-sm transition-colors relative",
                                    isChildLinkActive ? "text-primary bg-primary/5 font-medium" : "text-muted-foreground hover:text-foreground"
                                )}
                                asChild
                            >
                                <Link href={`/category/${child.slug}`}>
                                    {/* Dot indicator for active child */}
                                    {isChildLinkActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />}
                                    <span className="truncate">{child.name}</span>
                                </Link>
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export function Sidebar({ categories = [] }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className="hidden border-r bg-background lg:flex lg:flex-col lg:w-64 lg:shrink-0 sticky top-0 h-screen">
            <div className="flex h-16 items-center px-6 border-b shrink-0">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Code2 className="h-6 w-6" />
                    <span>Xuân Hiếu IT</span>
                </Link>
            </div>

            <ScrollArea className="flex-1 min-h-0">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <div className="space-y-1">
                            {sidebarItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                            DANH MỤC
                        </h2>
                        <div className="space-y-1">
                            {categories.map(({ node: item }) => (
                                <CategoryItem key={item.slug} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <div className="p-3 border-t bg-background shrink-0">
                <div className="flex items-center p-3 bg-muted/50 rounded-lg gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <Tv className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate">Tác giả</p>
                        <p className="text-xs text-muted-foreground truncate">Chưa có thông tin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
