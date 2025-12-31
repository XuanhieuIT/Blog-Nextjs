"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CategoryFeeds({ feeds = [] }: { feeds?: any[] }) {
    if (!feeds || feeds.length === 0) return null

    return (
        <section className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feeds.map((col: any, idx) => {
                    const featured = col.posts[0]
                    const listFn = col.posts.slice(1, 4)
                    if (!featured) return null

                    // Set colors based on index or category name if needed
                    const badgeColor = idx === 0 ? "bg-blue-600" : idx === 1 ? "bg-green-600" : "bg-purple-600"

                    return (
                        <div key={idx} className="flex flex-col h-full bg-card rounded-3xl border shadow-sm overflow-hidden">
                            {/* Featured Post */}
                            <Link href={`/blog/${featured.slug}`} className="block relative aspect-[16/10] overflow-hidden group cursor-pointer">
                                <img
                                    src={featured.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                    alt={featured.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                <div className="absolute top-4 left-4">
                                    <Badge className={`${badgeColor} hover:${badgeColor} text-white border-none rounded-full px-3`}>
                                        {col.name}
                                    </Badge>
                                </div>
                            </Link>

                            <div className="p-5 flex-1 flex flex-col">
                                {/* Featured Title */}
                                <Link href={`/blog/${featured.slug}`}>
                                    <h3 className="font-bold text-lg leading-tight mb-6 line-clamp-2 hover:text-primary cursor-pointer transition-colors" dangerouslySetInnerHTML={{ __html: featured.title }} />
                                </Link>

                                {/* List Posts */}
                                <div className="space-y-5 flex-1 mb-6">
                                    {listFn.map((item: any) => (
                                        <Link key={item.id} href={`/blog/${item.slug}`} className="flex gap-3 group cursor-pointer items-start">
                                            <div className="w-20 h-14 shrink-0 rounded-lg overflow-hidden bg-muted">
                                                <img
                                                    src={item.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <div
                                                    className="text-[13px] font-medium line-clamp-2 leading-snug group-hover:text-primary transition-colors"
                                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Footer Button */}
                                <Button variant="secondary" className="w-full mt-auto rounded-xl hover:bg-muted-foreground/10" asChild>
                                    <Link href={`/category/${col.slug}`} className="flex items-center justify-center gap-2">
                                        Xem tất cả <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
