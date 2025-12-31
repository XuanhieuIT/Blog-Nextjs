"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Link2, Linkedin, Twitter, Check } from "lucide-react"
import { useState } from "react"

export function SocialShare() {
    const [copied, setCopied] = useState(false)

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    const handleShare = (platform: string) => {
        let url = ''
        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                break
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
                break
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
                break
        }
        if (url) window.open(url, '_blank', 'width=600,height=400')
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <div className="rounded-2xl border bg-card p-4">
            <h3 className="font-semibold text-sm mb-4 uppercase text-muted-foreground">Chia sẻ bài viết</h3>
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-lg hover:text-blue-600 hover:border-blue-600 transition-colors"
                    onClick={() => handleShare('facebook')}
                    title="Chia sẻ lên Facebook"
                >
                    <Facebook className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-lg hover:text-sky-500 hover:border-sky-500 transition-colors"
                    onClick={() => handleShare('twitter')}
                    title="Chia sẻ lên Twitter"
                >
                    <Twitter className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-lg hover:text-blue-700 hover:border-blue-700 transition-colors"
                    onClick={() => handleShare('linkedin')}
                    title="Chia sẻ lên LinkedIn"
                >
                    <Linkedin className="h-4 w-4" />
                </Button>

                <div className="relative">
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "h-10 w-10 rounded-lg transition-all",
                            copied ? "border-emerald-500 text-emerald-500 bg-emerald-50" : "hover:text-primary hover:border-primary"
                        )}
                        onClick={copyToClipboard}
                        title="Sao chép liên kết"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                    </Button>
                    {copied && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap animate-in fade-in zoom-in duration-200">
                            Đã sao chép!
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}

