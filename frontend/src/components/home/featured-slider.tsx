"use client"

import * as React from "react"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { Clock, Tag } from "lucide-react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Removed mock data 'slides'
interface FeaturedSliderProps {
    posts: any[];
}

export function FeaturedSlider({ posts }: FeaturedSliderProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    )

    if (!posts || posts.length === 0) {
        return null; // Or return a skeleton/placeholder
    }

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full relative group"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {posts.map((post) => (
                    <CarouselItem key={post.id}>
                        <Link href={`/blog/${post.slug}`} className="block relative aspect-[21/9] w-full overflow-hidden rounded-3xl cursor-pointer">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                style={{ backgroundImage: `url(${post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white max-w-3xl">
                                <Badge className="w-fit mb-4 bg-emerald-500 hover:bg-emerald-600 border-none text-white px-3 py-1 text-sm">
                                    {post.categories?.edges[0]?.node?.name || "Uncategorized"}
                                </Badge>
                                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-balance" dangerouslySetInnerHTML={{ __html: post.title }} />
                                <div className="flex items-center gap-4 text-white/80 text-sm">
                                    <div className="flex items-center gap-2">
                                        {post.author?.node?.avatar?.url && <img src={post.author.node.avatar.url} alt="Author" className="w-6 h-6 rounded-full" />}
                                        <span className="font-medium text-white">{post.author?.node?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CarouselPrevious variant="secondary" />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CarouselNext variant="secondary" />
            </div>
        </Carousel>
    )
}
