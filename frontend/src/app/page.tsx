import DashboardLayout from "@/components/layout/dashboard-layout"
import { FeaturedSlider } from "@/components/home/featured-slider"
import { FastNews } from "@/components/home/fast-news"
import { RightSidebar } from "@/components/layout/right-sidebar"
import { VideoSection } from "@/components/home/video-section"
import { CategoryFeeds } from "@/components/home/category-feeds"
import { LifePerspectives } from "@/components/home/life-perspectives"
import { TrendingRanking } from "@/components/home/trending-ranking"
import { getAllPostsForHome, getPostsByTag, getCategoryPosts, getPopularCategoriesWithPosts } from "@/lib/wpgraphql"

export default async function Home() {
  const allPosts = await getAllPostsForHome(false);
  const posts = (allPosts?.edges || []).map(({ node }: any) => node);

  // Parallel data fetching for performance
  // Now using generic "Popular Categories" instead of hardcoded slugs to ensure data shows up.
  const [videoData, perspectivePosts, popularFeeds] = await Promise.all([
    getCategoryPosts('video', 5),
    getPostsByTag('goc-nhin'),
    getPopularCategoriesWithPosts(3)
  ]);

  // Fallback for LifePerspectives if no 'goc-nhin' tag exists: use recent posts 10-14
  const finalPerspectivePosts = (perspectivePosts && perspectivePosts.length > 0)
    ? perspectivePosts
    : posts.slice(10, 15);

  // Slice posts for different sections if needed
  const sliderPosts = posts.slice(0, 3);
  const newsPosts = posts.slice(3, 10);


  return (
    <DashboardLayout>
      <div className="space-y-10 min-w-0">
        <FeaturedSlider posts={sliderPosts} />
        <FastNews posts={newsPosts} />

        <VideoSection posts={videoData?.posts} />

        <LifePerspectives posts={finalPerspectivePosts} />
        <TrendingRanking />

        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-foreground pl-4">
            Hướng dẫn xây dựng website với Next.js và WordPress
          </h2>
          <CategoryFeeds feeds={popularFeeds} />
        </div>
      </div>
    </DashboardLayout>
  );
}
