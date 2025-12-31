import { getPostsByCategory } from "@/lib/wpgraphql"
import DashboardLayout from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const categoryData = await getPostsByCategory(slug)

    // Fallback if category not found or has no posts
    const categoryName = categoryData?.name || "Category"
    const posts = categoryData?.posts?.edges || []

    return (
        <DashboardLayout>
            {/* Main Content - Full Width */}
            <div className="space-y-8 min-w-0 max-w-6xl mx-auto">
                <div className="flex items-center justify-between border-b pb-4">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Danh mục: <span className="text-primary">{categoryName}</span>
                    </h1>
                    <span className="text-muted-foreground">{categoryData?.count || posts.length} bài viết</span>
                </div>

                {posts.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {posts.map(({ node: post }: any) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block space-y-3">
                                <div className="overflow-hidden rounded-xl bg-muted aspect-[16/10]">
                                    <img
                                        src={post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {post.categories?.edges[0] && (
                                            <Badge variant="secondary" className="font-normal text-[10px]">
                                                {post.categories.edges[0].node.name}
                                            </Badge>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{new Date(post.date).toLocaleDateString("vi-VN")}</span>
                                        </div>
                                    </div>
                                    <h3 className="line-clamp-2 text-lg font-bold leading-tight group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <div className="line-clamp-2 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-muted-foreground">
                        Chưa có bài viết nào trong danh mục này.
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
