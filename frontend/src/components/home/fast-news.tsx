"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"

interface FastNewsProps {
    posts: any[];
}

export function FastNews({ posts }: FastNewsProps) {
    const [api, setApi] = React.useState<CarouselApi>()

    if (!posts || posts.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold border-l-4 border-primary pl-3 text-lg">Tin nhanh</h3>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => api?.scrollPrev()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => api?.scrollNext()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {posts.map((item) => (
                        <CarouselItem key={item.id} className="pl-4 basis-auto">
                            <div className="relative h-64 w-44 shrink-0 overflow-hidden rounded-2xl group cursor-pointer">
                                <Link href={`/blog/${item.slug}`} className="block h-full w-full">
                                    <img
                                        src={item.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-blue-600 hover:bg-blue-700 border-none text-[10px] px-2 h-5 text-white">
                                            {item.categories?.edges[0]?.node?.name || "News"}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h4 className="text-white text-sm font-semibold whitespace-normal line-clamp-3 mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.title }} />
                                        <div className="flex items-center gap-2 text-[10px] text-white/70">
                                            <span className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center">🕒</span>
                                            <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

