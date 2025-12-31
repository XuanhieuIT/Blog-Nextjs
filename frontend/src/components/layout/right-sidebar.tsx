"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Cloud, Droplets, Wind, MapPin, Globe, TrendingUp, TrendingDown } from "lucide-react"

import { vi } from "date-fns/locale"

interface RightSidebarProps {
    posts?: any[];
    categories?: any[];
}

export function RightSidebar({ posts, categories = [] }: RightSidebarProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [formattedDate, setFormattedDate] = React.useState<string>("")
    const [lunarDate, setLunarDate] = React.useState<string>("")

    React.useEffect(() => {
        const today = new Date();
        setFormattedDate(today.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' }))

        // Simple mock calculation for Lunar Date (just for display as requested, real conversation requires lib)
        // In a real app, use 'lunar-javascript' or similar
        setLunarDate("Ngày 8 tháng 11 năm 2025");
    }, [])

    // Use passed posts or fallback to empty array
    const sidebarPosts = (posts || []).slice(0, 3);

    // Mock Weather Data
    const weather = {
        location: "Hà Nội",
        temp: 18,
        desc: "Âm U",
        humidity: 49,
        wind: 6
    };

    return (
        <div className="space-y-6">
            {/* Calendar Widget */}
            <Card className="rounded-3xl border-none shadow-sm bg-background">
                <CardContent className="p-4">
                    <div className="text-center mb-4">
                        <span className="font-semibold text-lg capitalize">
                            {date?.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-0 flex justify-center w-full"
                        classNames={{
                            month: "space-y-4 w-full",
                            caption: "hidden", // We use custom caption above
                            head_row: "flex w-full justify-between mb-2",
                            head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2 justify-between",
                            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-muted rounded-full",
                            day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-full",
                            day_today: "bg-accent text-accent-foreground rounded-full",
                        }}
                        locale={vi}
                    />
                    <div className="mt-6 flex flex-col items-center gap-1 text-sm border-t pt-4">
                        <div className="flex justify-between w-full px-2">
                            <span className="text-muted-foreground">Hôm nay</span>
                            <span className="font-semibold">{formattedDate}</span>
                        </div>
                        <div className="flex justify-between w-full px-2 text-xs text-muted-foreground mt-1">
                            <span>Âm lịch</span>
                            <span>{lunarDate}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Trending Posts */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold border-l-4 border-foreground pl-3 text-lg">Tin tức xu hướng</h3>
                    <Link href="/news" className="text-muted-foreground hover:text-primary">
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {sidebarPosts.map(({ node: item }) => (
                        <Link
                            key={item.id}
                            href={`/blog/${item.slug}`}
                            className="flex gap-3 group cursor-pointer hover:bg-muted/40 p-1.5 rounded-lg transition-colors"
                        >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                                <img
                                    src={item.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-1 min-w-0">
                                <span className="text-[10px] font-bold uppercase text-orange-500 truncate">
                                    {item.categories?.edges[0]?.node?.name || "News"}
                                </span>
                                <h4 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: item.title }} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Hot Categories */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold border-l-4 border-foreground pl-3 text-lg">Chuyên mục Hot</h3>
                    <Link href="/categories" className="text-muted-foreground hover:text-primary">
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="space-y-3">
                    {categories.slice(0, 5).map(({ node: cat }, idx) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="flex items-center justify-between group p-1 hover:bg-muted/30 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full border bg-background group-hover:border-primary transition-colors text-muted-foreground group-hover:text-primary">
                                    <Globe className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                    {cat.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">
                                    {cat.count > 1000 ? `${(cat.count / 1000).toFixed(1)}K` : cat.count}
                                </span>
                                {idx % 2 === 0 ? (
                                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-rose-500" />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Weather Widget */}
            <Card className="rounded-3xl border-none shadow-sm bg-blue-50/50 dark:bg-slate-900/50">
                <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4 text-sm text-foreground/80">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{weather.location}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">▼</div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <Cloud className="h-12 w-12 text-gray-400" />
                        <div>
                            <div className="text-4xl font-bold">{weather.temp}°</div>
                            <div className="text-sm text-muted-foreground capitalize">{weather.desc}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center gap-2 bg-background/50 p-2 rounded-lg">
                            <Droplets className="h-4 w-4 text-blue-400" />
                            <div>
                                <div className="text-muted-foreground">Độ ẩm</div>
                                <div className="font-bold">{weather.humidity}%</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-background/50 p-2 rounded-lg">
                            <Wind className="h-4 w-4 text-blue-400" />
                            <div>
                                <div className="text-muted-foreground">Gió</div>
                                <div className="font-bold">{weather.wind} km/h</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
