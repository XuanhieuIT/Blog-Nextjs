import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { RightSidebar } from "@/components/layout/right-sidebar"
import { getAllCategories, getAllPostsForHome } from "@/lib/wpgraphql"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [allCategories, allPostsData] = await Promise.all([
        getAllCategories(),
        getAllPostsForHome(false)
    ]);

    const categories = allCategories?.edges || [];
    const posts = allPostsData?.edges || [];
    const sidebarPosts = posts.slice(0, 8);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Left Sidebar - Fixed */}
            <Sidebar categories={categories} />

            <div className="flex-1 flex flex-col min-w-0">
                <TopBar />

                {/* Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Main Content - Scrollable */}
                    <main className="flex-1 overflow-y-auto p-6 lg:p-8 min-w-0 scroll-smooth">
                        <div className="mx-auto max-w-5xl w-full">
                            {children}
                        </div>
                    </main>

                    {/* Right Sidebar - Fixed to the right */}
                    <aside className="hidden 2xl:block w-[320px] border-l bg-background overflow-y-auto p-5 h-full shrink-0">
                        <RightSidebar posts={sidebarPosts} categories={categories} />
                    </aside>
                    <aside className="hidden xl:block 2xl:hidden w-[280px] border-l bg-background overflow-y-auto p-4 h-full shrink-0 text-sm">
                        <RightSidebar posts={sidebarPosts} categories={categories} />
                    </aside>
                </div>
            </div>
        </div>
    )
}
