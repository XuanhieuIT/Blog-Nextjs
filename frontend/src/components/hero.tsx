import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-muted/40">
            <div className="container relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                    🎉 <span className="ml-2">Chào mừng đến với Modern Blog</span>
                </div>
                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl text-balance">
                    Khám phá thế giới công nghệ <br className="hidden sm:inline" />
                    và xu hướng mới nhất
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
                    Nơi cập nhật tin tức, bài viết chuyên sâu và hướng dẫn chi tiết về lập trình, thiết kế và công nghệ hiện đại.
                </p>
                <div className="mt-10 flex gap-4">
                    <Button size="lg" asChild>
                        <Link href="/blog">Đọc bài viết <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/about">Giới thiệu</Link>
                    </Button>
                </div>
            </div>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
        </section>
    )
}
