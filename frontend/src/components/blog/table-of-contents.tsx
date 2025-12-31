"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
    className?: string
}

export function TableOfContents({ className, headings = [] }: TableOfContentsProps & { headings?: any[] }) {
    const [isOpen, setIsOpen] = React.useState(true)

    if (headings.length === 0) return null

    return (
        <div className={cn("rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden my-8", className)}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2 font-semibold">
                    <List className="h-5 w-5" />
                    <span>Mục lục ({headings.length})</span>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>

            {isOpen && (
                <div className="p-4 pt-0">
                    <ul className="space-y-2 text-sm mt-4">
                        {headings.map((heading, index) => (
                            <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? '16px' : '0' }}>
                                <a
                                    href={`#${heading.id}`}
                                    className="text-muted-foreground hover:text-primary transition-colors block py-1 line-clamp-1"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {index + 1}. {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
