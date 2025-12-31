import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar as CalendarIcon, Clock, ChevronRight, User, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { SocialShare } from "@/components/blog/social-share"
import { CommentsWidget } from "@/components/blog/sidebar-widgets"
import { getPostAndMorePosts } from "@/lib/wpgraphql"
import { processContent } from "@/lib/utils"

export default async function SinglePostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const data = await getPostAndMorePosts(slug, false, null)

    if (!data?.post) {
        notFound()
    }

    const post = data.post

    // Process content to add IDs and extract headings
    const { modifiedContent, headings } = processContent(post.content || '')

    // Fallback/Calculation for readTime as it's not in standard API
    const readTime = "5 phút đọc"
    const categories = post.categories?.edges?.map((edge: any) => edge.node) || []
    const firstCategory = categories[0]
    const tags = post.tags?.edges?.map((edge: any) => edge.node.name) || []

    // More posts for sidebar
    const morePosts = data.posts?.edges || []

    return (
        <DashboardLayout>
            {/* Main Content Column - Full Width */}
            <div className="min-w-0 max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                    {firstCategory && (
                        <>
                            <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
                            <Link href={`/category/${firstCategory.slug}`} className="hover:text-primary transition-colors">{firstCategory.name}</Link>
                        </>
                    )}
                    <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
                    <span className="text-foreground font-medium truncate">{post.title}</span>
                </nav>

                <article className="bg-background">
                    {/* Header */}
                    <div className="space-y-6 mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-balance leading-[1.2]" dangerouslySetInnerHTML={{ __html: post.title }} />

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 font-normal uppercase text-[10px] tracking-wider px-2 py-1 cursor-pointer">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground border-y py-4">
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <User className="w-4 h-4" />
                                <span>{post.author?.node?.name || 'Author'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{readTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments?.edges?.length || 0} bình luận</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post.featuredImage?.node?.sourceUrl && (
                        <div className="aspect-[2/1] w-full overflow-hidden rounded-xl border bg-muted mb-10">
                            <img
                                src={post.featuredImage.node.sourceUrl}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Table of Contents - Now Dynamic */}
                    <TableOfContents headings={headings} />

                    {/* Content */}
                    <div className="prose prose-zinc md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-p:leading-relaxed prose-p:text-muted-foreground/90">
                        <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />
                    </div>
                </article>

                {/* Share Section (Below Content) */}
                <div className="mt-12 flex justify-end">
                    <div className="w-full md:w-auto">
                        <SocialShare />
                    </div>
                </div>

                {/* Comments */}
                <CommentsWidget comments={post.comments?.edges} postId={post.databaseId} />
            </div>
        </DashboardLayout>
    )
}
