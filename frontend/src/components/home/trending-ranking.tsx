"use client"

export function TrendingRanking() {
    const posts = [
        {
            title: "Digital Marketing tổng thể là gì? Giải pháp Marketing cho doanh nghiệp top 1 Việt Nam",
            author: "ThompBui",
            color: "text-zinc-200"
        },
        {
            title: "Định nghĩa, Nền tảng WordPress và Lựa chọn Đối tác Dabilux Design",
            author: "ThompBui",
            color: "text-zinc-200"
        },
        {
            title: "Thiết Kế Website Cho Doanh Nghiệp: Tổng Quan, Tiêu Chí & Quy Trình",
            author: "ThompBui",
            color: "text-zinc-200"
        }
    ]

    return (
        <section className="space-y-6 py-6 pb-12">
            <div className="flex items-center border-l-4 border-foreground pl-4">
                <h2 className="text-xl font-bold">Bài nổi bật</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                    <div key={idx} className="flex gap-4 items-start group cursor-pointer">
                        <span className={`text-6xl font-black leading-none opacity-40 select-none ${post.color} group-hover:text-primary/20 transition-colors`}>
                            #{idx + 1}
                        </span>
                        <div className="pt-2 space-y-2">
                            <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{post.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
