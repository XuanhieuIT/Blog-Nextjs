import { PostGrid } from "@/components/post-grid"
import { Separator } from "@/components/ui/separator"

// Mock Data (Expanded)
const allPosts = [
    {
        id: "1",
        title: "Hướng dẫn Next.js 15: Có gì mới?",
        url: "/blog/nextjs-15-guide",
        excerpt: "Tổng hợp những tính năng mới nhất trong Next.js 15 bao gồm React Compiler, Partial Prerendering và nhiều hơn nữa.",
        category: "Development",
        date: "26/12/2025",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        author: {
            name: "Xuan Hieu",
            avatar: "https://github.com/shadcn.png"
        }
    },
    {
        id: "2",
        title: "10 Xu hướng thiết kế web năm 2026",
        url: "/blog/web-design-trends-2026",
        excerpt: "Khám phá các phong cách thiết kế đang làm mưa làm gió trong cộng đồng sáng tạo năm nay.",
        category: "Design",
        date: "25/12/2025",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
        author: {
            name: "Xuan Hieu",
            avatar: "https://github.com/shadcn.png"
        }
    },
    {
        id: "3",
        title: "Tối ưu hóa SEO cho Headless WordPress",
        url: "/blog/seo-headless-wordpress",
        excerpt: "Làm sao để website headless của bạn đạt điểm SEO tối đa trên Google? Đọc ngay bài viết này.",
        category: "SEO",
        date: "24/12/2025",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
        author: {
            name: "Xuan Hieu",
            avatar: "https://github.com/shadcn.png"
        }
    },
    {
        id: "4",
        title: "Cách xây dựng Blog cá nhân chuyên nghiệp",
        url: "/blog/build-personal-blog",
        excerpt: "Hướng dẫn từng bước xây dựng thương hiệu cá nhân thông qua việc viết blog.",
        category: "Lifestyle",
        date: "23/12/2025",
        image: "https://images.unsplash.com/photo-1499750310159-fb3c2612045f?q=80&w=2070&auto=format&fit=crop",
        author: {
            name: "Xuan Hieu",
            avatar: "https://github.com/shadcn.png"
        }
    },
    {
        id: "5",
        title: "Làm chủ TailwindCSS v4",
        url: "/blog/mastering-tailwindcss-v4",
        excerpt: "Tất cả những gì bạn cần biết về phiên bản mới nhất của framework CSS phổ biến nhất thế giới.",
        category: "Development",
        date: "22/12/2025",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
        author: {
            name: "Xuan Hieu",
            avatar: "https://github.com/shadcn.png"
        }
    },
    {
        id: "6",
        title: "Digital Nomad: Sống và làm việc từ xa",
        url: "/blog/digital-nomad-lifestyle",
        excerpt: "Chia sẻ kinh nghiệm thực tế về lối sống Digital Nomad tại Việt Nam.",
        category: "Lifestyle",
        date: "21/12/2025",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
        author: {
            name: "Xuan Hieu",
            avatar: "https://github.com/shadcn.png"
        }
    }
]

export default function BlogPage() {
    return (
        <div className="container py-10 md:py-16">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
                <p className="text-xl text-muted-foreground">
                    Chia sẻ kiến thức về lập trình, thiết kế và cuộc sống.
                </p>
            </div>
            <Separator className="my-8" />
            <PostGrid posts={allPosts} />
        </div>
    )
}
