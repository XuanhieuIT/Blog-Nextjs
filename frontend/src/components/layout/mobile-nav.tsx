"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setOpen(false)}
                >
                    <span className="font-bold">Modern Blog</span>
                </Link>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                        <Link href="/" onClick={() => setOpen(false)}>
                            Trang chủ
                        </Link>
                        <Link href="/blog" onClick={() => setOpen(false)}>
                            Bài viết
                        </Link>
                        <Link href="/about" onClick={() => setOpen(false)}>
                            Giới thiệu
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
