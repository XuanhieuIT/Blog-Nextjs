"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VideoSection({ posts = [] }: { posts?: any[] }) {
    if (!posts || posts.length === 0) return null

    // Use the first post as the main video
    const mainVideo = posts[0]
    // Remaining posts for playlist
    const playlist = posts.slice(1, 4)

    return (
        <section className="space-y-6 py-6 border-b">
            <div className="flex items-center justify-between border-l-4 border-foreground pl-4">
                <h2 className="text-xl font-bold">Video nổi bật</h2>
                <Button variant="outline" size="sm" className="rounded-full h-8 text-xs bg-muted/50 border-none hover:bg-muted" asChild>
                    <Link href="/category/video">Xem thêm &rarr;</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Video */}
                <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl bg-black aspect-video lg:aspect-auto">
                    <Link href={`/blog/${mainVideo.slug}`} className="block w-full h-full relative">
                        <img
                            src={mainVideo.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                            alt={mainVideo.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="h-8 w-8 text-white fill-white ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/90 to-transparent">
                            <h3 className="text-xl font-bold text-white line-clamp-2 text-shadow" dangerouslySetInnerHTML={{ __html: mainVideo.title }} />
                        </div>
                    </Link>
                </div>

                {/* Video List */}
                <div className="space-y-4">
                    {playlist.map((video: any) => (
                        <div key={video.id} className="flex gap-3 group cursor-pointer hover:bg-muted/50 p-2 rounded-xl transition-colors">
                            <Link href={`/blog/${video.slug}`} className="flex gap-3 w-full">
                                <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-muted">
                                    <img
                                        src={video.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                        alt={video.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <Play className="h-4 w-4 text-white fill-white" />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                                        Video
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h4 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: video.title }} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
