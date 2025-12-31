import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Post {
    id: string
    title: string
    url: string
    excerpt: string
    category: string
    date: string
    author: {
        name: string
        avatar: string
    }
    image: string
}

export function PostGrid({ posts }: { posts: Post[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/10">
                    <Link href={post.url} className="group relative block aspect-video overflow-hidden bg-muted">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge className="absolute left-4 top-4 z-10">{post.category}</Badge>
                    </Link>
                    <CardHeader className="flex-1 p-5">
                        <div className="space-y-2">
                            <Link href={post.url} className="block">
                                <h3 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight transition-colors hover:text-primary">
                                    {post.title}
                                </h3>
                            </Link>
                            <p className="line-clamp-3 text-muted-foreground text-sm">
                                {post.excerpt}
                            </p>
                        </div>
                    </CardHeader>
                    <CardFooter className="p-5 pt-0">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground w-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0.5 text-xs">
                                <span className="font-medium text-foreground">{post.author.name}</span>
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
