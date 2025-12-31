"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function LifePerspectives({ posts = [] }: { posts?: any[] }) {
    if (!posts || posts.length === 0) return null

    // First post is featured
    const featuredPost = posts[0]
    // Remaining posts for list
    const listPosts = posts.slice(1, 4)

    return (
        <section className="space-y-6 py-8 border-b">
            <div className="flex items-center justify-between border-l-4 border-foreground pl-4">
                <h2 className="text-xl font-bold">Góc nhìn cuộc sống</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Featured Post */}
                <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl aspect-[16/10] lg:aspect-auto">
                    <Link href={`/blog/${featuredPost.slug}`} className="block w-full h-full relative">
                        <img
                            src={featuredPost.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                            {featuredPost.categories?.edges[0] && (
                                <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-4">
                                    {featuredPost.categories.edges[0].node.name}
                                </Badge>
                            )}
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight text-shadow" dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                            <div className="text-white/80 line-clamp-2 md:line-clamp-3 mb-6 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }} />

                            <div className="flex items-center gap-4 text-white/90 text-sm">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6 border border-white/20">
                                        <AvatarImage src={featuredPost.author?.node?.avatar?.url} />
                                        <AvatarFallback>{featuredPost.author?.node?.name?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{featuredPost.author?.node?.name || 'Author'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{new Date(featuredPost.date).toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Right List */}
                <div className="space-y-4">
                    {listPosts.map((post: any) => (
                        <div key={post.id} className="flex gap-4 group cursor-pointer hover:bg-muted/30 p-2 rounded-xl transition-colors">
                            <Link href={`/blog/${post.slug}`} className="flex gap-4 w-full">
                                <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-muted">
                                    <img
                                        src={post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                                        {new Date(post.date).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
                                    {post.categories?.edges[0] && (
                                        <span className="text-[10px] font-bold text-blue-600 uppercase">
                                            {post.categories.edges[0].node.name}
                                        </span>
                                    )}
                                    <h4 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <span className="text-[10px] text-muted-foreground">Bởi {post.author?.node?.name || 'Author'}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
