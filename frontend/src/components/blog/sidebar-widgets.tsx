"use client"

import * as React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter, Send, MessageSquare, ChevronUp, Clock, ShieldCheck, Loader2 } from "lucide-react"
import { useState } from "react"
import { createComment } from "@/lib/wpgraphql"

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}

export function AuthorBioWidget({ author }: { author: any }) {
    return (
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground uppercase mb-4 tracking-wider">Giới thiệu</h3>
            <div className="flex flex-col items-center text-center space-y-3">
                <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
                    <AvatarImage src={author.avatar} />
                    <AvatarFallback>TB</AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="font-bold text-lg text-foreground">{author.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Fullstack Developer</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Trong bối cảnh kinh tế số tại Việt Nam với số lượng người dùng Internet đã đạt 68,72 triệu người...
                </p>
                <div className="flex gap-3 mt-2">
                    <Link href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors">
                        <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors">
                        <Facebook className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors">
                        <Instagram className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export function ExperienceWidget() {
    const experiences = [
        { role: "Thiết kế sản phẩm", year: "2022 - Hiện tại" },
        { role: "Thiết kế sản phẩm", year: "2020 - 2021" },
        { role: "Thiết kế UX/UI", year: "2017 - 2020" }
    ]

    return (
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground uppercase mb-4 tracking-wider">Kinh nghiệm làm việc</h3>
            <div className="space-y-6">
                {experiences.map((item, i) => (
                    <div key={i} className="relative pl-4 border-l-2 border-muted hover:border-primary/50 transition-colors">
                        <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-muted-foreground/30" />
                        <h5 className="font-bold text-sm text-foreground">{item.role}</h5>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">{item.year}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function TechStackWidget() {
    const stack = [
        { name: "WordPress", icon: "https://s.w.org/style/images/about/WordPress-logotype-wmark.png", desc: "wordpress.org" },
        { name: "Next.js", icon: "https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png", desc: "nextjs.org" },
        { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", desc: "react.dev" },
        { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", desc: "tailwindcss.com" }
    ]

    return (
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-sm text-muted-foreground uppercase mb-4 tracking-wider">Cộng nghệ</h3>
            <div className="space-y-4">
                {stack.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-pointer">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center p-2 group-hover:bg-primary/10 transition-colors">
                            <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="overflow-hidden">
                            <h5 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{item.name}</h5>
                            <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function CommentsWidget({ comments = [], postId }: { comments?: any[], postId: number }) {
    const [content, setContent] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [authorEmail, setAuthorEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)



    let commentsList = comments || []
    console.log("CommentsWidget received:", commentsList);
    const totalComments = commentsList.length

    // Organize comments into threads
    // Root comments are those with no parent
    const rootComments = commentsList.filter(({ node }: any) => !node.parent)
    const replies = commentsList.filter(({ node }: any) => node.parent)

    const getRepliesForParent = (parentId: number) => {
        return replies.filter(({ node }: any) => String(node.parent?.node?.databaseId) === String(parentId))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting comment for Post ID:", postId);

        if (!content || !authorName || !authorEmail) {
            setSubmitStatus({ type: 'error', message: 'Vui lòng điền đầy đủ thông tin!' })
            return
        }

        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            console.log("Calling createComment API...");
            const result = await createComment(postId, content, authorName, authorEmail)
            console.log("API Result:", result);

            if (result?.success) {
                setSubmitStatus({ type: 'success', message: 'Cảm ơn bạn! Bình luận đang chờ kiểm duyệt.' })
                setContent("")
                setAuthorName("")
                setAuthorEmail("")
            } else {
                setSubmitStatus({ type: 'error', message: 'Có lỗi xảy ra, vui lòng thử lại sau.' })
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Không thể gửi bình luận. Vui lòng kiểm tra lại.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mt-12 space-y-8">
            <div className="bg-[#f8f9fa] rounded-3xl p-6 border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Hỏi và đáp</h3>
                </div>

                {/* Q&A Input Section */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border shadow-sm flex gap-6 items-start">
                    {/* Mascot */}
                    <div className="hidden md:flex flex-col items-center shrink-0 w-24">
                        <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm overflow-hidden text-red-600">
                            <img src="https://admin.hieuit.top/wp-content/uploads/2025/12/Screenshot_3.png" alt="Mascot" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h4 className="font-bold text-lg">Hãy đặt câu hỏi cho chúng tôi</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Xuân Hiếu IT sẽ phản hồi trong vòng 1 giờ. Nếu Quý khách gửi câu hỏi sau 22h, chúng tôi sẽ trả lời vào sáng hôm sau.
                                Thông tin có thể thay đổi theo thời gian!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Viết câu hỏi của bạn tại đây (tối thiểu 10 ký tự)"
                                className="w-full min-h-[100px] p-4 rounded-xl border-2 border-muted focus:border-red-500 focus:outline-none transition-colors text-sm resize-none"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    placeholder="Họ và tên (Bắt buộc)"
                                    className="p-3 rounded-lg border-2 border-muted focus:border-red-500 focus:outline-none transition-colors text-sm"
                                />
                                <input
                                    type="email"
                                    value={authorEmail}
                                    onChange={(e) => setAuthorEmail(e.target.value)}
                                    placeholder="Email (Để nhận phản hồi qua mail)"
                                    className="p-3 rounded-lg border-2 border-muted focus:border-red-500 focus:outline-none transition-colors text-sm"
                                />
                            </div>

                            {submitStatus && (
                                <p className={cn(
                                    "text-sm font-medium p-3 rounded-lg",
                                    submitStatus.type === 'success' ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-200"
                                )}>
                                    {submitStatus.message}
                                </p>
                            )}

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#d70018] hover:bg-[#b00014] text-white rounded-lg px-8 h-12 gap-2 font-bold shadow-md transform active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>Đang gửi... <Loader2 className="w-4 h-4 animate-spin" /></>
                                    ) : (
                                        <>Gửi câu hỏi <Send className="w-4 h-4" /></>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Question List */}
                <div className="mt-8 space-y-6">
                    {rootComments.length > 0 ? (
                        rootComments.map(({ node: comment }: any) => {
                            const childReplies = getRepliesForParent(comment.databaseId)
                            return (
                                <div key={comment.id} className="bg-white rounded-2xl p-6 border shadow-sm space-y-4 border-zinc-100">
                                    {/* Main Question */}
                                    <div className="flex gap-3">
                                        <Avatar className="h-9 w-9 bg-zinc-700 text-white shrink-0">
                                            <AvatarFallback className="bg-zinc-700 text-white font-bold">{comment.author?.node?.name?.charAt(0) || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-bold text-[15px]">{comment.author?.node?.name || 'Vô danh'}</h5>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(comment.date).toLocaleDateString("vi-VN")}
                                                </span>
                                            </div>
                                            <div className="text-sm text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: comment.content }} />
                                            <div className="flex items-center gap-4 pt-1">
                                                <button className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    Phản hồi
                                                </button>
                                                {childReplies.length > 0 && (
                                                    <button className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors">
                                                        Thu gọn phản hồi <ChevronUp className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Replies */}
                                    {childReplies.length > 0 && (
                                        <div className="ml-8 mt-4 space-y-4 border-l-2 border-muted pl-6">
                                            {childReplies.map(({ node: reply }: any) => {
                                                const isStaff = reply.author?.node?.name?.toLowerCase().includes('admin') ||
                                                    reply.author?.node?.name?.includes('Quản Trị Viên');

                                                return (
                                                    <div key={reply.id} className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-7 w-7 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold overflow-hidden border">
                                                                <img src="https://admin.hieuit.top/wp-content/uploads/2025/12/Screenshot_1.png" alt="staff" className="w-full h-full object-cover" />
                                                            </div>
                                                            <h6 className="font-bold text-[14px]">
                                                                {reply.author?.node?.name || 'Quản Trị Viên'}
                                                            </h6>
                                                            {isStaff && (
                                                                <Badge className="bg-red-600 text-white text-[9px] px-1 h-4 rounded uppercase font-bold border-none hover:bg-red-600">QTV</Badge>
                                                            )}
                                                            <span className="text-[11px] text-muted-foreground">
                                                                {new Date(reply.date).toLocaleDateString("vi-VN")}
                                                            </span>
                                                        </div>
                                                        <div className="text-[13px] text-foreground/80 leading-relaxed pl-1" dangerouslySetInnerHTML={{ __html: reply.content }} />
                                                        <button className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 mt-2 hover:underline">
                                                            <MessageSquare className="w-3 h-3" />
                                                            Phản hồi
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center border shadow-sm">
                            <p className="text-muted-foreground text-sm">Chưa có câu hỏi nào. Hãy đặt câu hỏi đầu tiên!</p>
                        </div>
                    )}
                </div>

                {totalComments > 3 && (
                    <div className="mt-8 flex justify-center">
                        <Button variant="outline" className="rounded-xl px-12 h-11 font-bold text-sm bg-white hover:bg-zinc-50 border shadow-sm flex items-center gap-2 transition-all">
                            Xem thêm {totalComments - 3} bình luận <ChevronUp className="w-4 h-4 rotate-180" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
