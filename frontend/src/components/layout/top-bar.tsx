"use client"

import { Search, Bell, Info, MessageSquare, Moon, Sun, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { getLatestPosts } from "@/lib/wpgraphql"
import Link from "next/link"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function TopBar() {
    const router = useRouter()
    const [query, setQuery] = useState("")
    const [isDark, setIsDark] = useState(false)
    const [notifications, setNotifications] = useState<any[]>([])
    const [hasNew, setHasNew] = useState(false)

    // Initial Theme Check and Notifications
    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark') ||
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(isDarkMode);
        if (isDarkMode) document.documentElement.classList.add('dark');

        // Fetch latest posts for notifications
        const fetchNotify = async () => {
            try {
                const posts = await getLatestPosts(5);
                setNotifications(posts);

                // Logic for red dot: compare latest post ID with stored ID
                if (posts.length > 0) {
                    const lastSeenId = localStorage.getItem('last_seen_post_id');
                    if (lastSeenId !== posts[0].id) {
                        setHasNew(true);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        fetchNotify();
        // Poll every 5 minutes
        const interval = setInterval(fetchNotify, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }

    const markAsRead = () => {
        setHasNew(false);
        if (notifications.length > 0) {
            localStorage.setItem('last_seen_post_id', notifications[0].id);
        }
    }

    return (
        <div className="flex h-16 items-center gap-4 border-b bg-background px-6 sticky top-0 z-10 transition-colors duration-300">
            <div className="relative flex-1">
                <form onSubmit={handleSearch}>
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Tìm kiếm..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 rounded-xl border-dashed"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
            </div>
            <div className="flex items-center gap-2">
                <Popover onOpenChange={(open) => open && markAsRead()}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
                            <Bell className="h-5 w-5" />
                            {hasNew && (
                                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-background animate-pulse"></span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <div className="p-4 border-b">
                            <h4 className="font-bold leading-none">Thông báo mới</h4>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                <div className="divide-y">
                                    {notifications.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/blog/${post.slug}`}
                                            className="flex gap-3 p-3 hover:bg-muted transition-colors group"
                                        >
                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-muted">
                                                <img
                                                    src={post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-1 min-w-0">
                                                <p className="text-xs font-medium leading-none line-clamp-2 group-hover:text-primary transition-colors">
                                                    {post.title}
                                                </p>
                                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-sm text-muted-foreground">
                                    Không có thông báo nào.
                                </div>
                            )}
                        </div>
                        <div className="p-2 border-t text-center">
                            <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                                <Link href="/">Xem tất cả</Link>
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>

                <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => alert("Phiên bản v1.0.0\nDeveloped by Antigravity")}>
                    <Info className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => alert("Tính năng chat đang được phát triển!")}>
                    <MessageSquare className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={toggleTheme}>
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </div>
        </div>
    )
}

