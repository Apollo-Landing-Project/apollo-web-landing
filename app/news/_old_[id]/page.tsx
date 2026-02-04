import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Facebook, Linkedin, Share2, Twitter } from "lucide-react";

// Mock Data (Ideally this comes from a shared data file or API)
const newsItems = [
    {
        id: 1,
        image: "/assets/news/news-1.png",
        date: "October 23, 2025",
        title: "Summary of Minutes of EGMS 2026",
        description: "We've been enhancing production to support growing demand product.",
        content: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>Key Highlights</h3>
            <ul>
                <li>Strategic expansion into new markets</li>
                <li>Increased production capacity by 40%</li>
                <li>Launch of sustainable initiative program</li>
            </ul>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        date: "October 24, 2025",
        title: "Expansion into South East Asia Region",
        description: "New dealerships opening in Malaysia and Thailand to serve our growing customer base.",
        content: "Full content placeholder..."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
        date: "October 25, 2025",
        title: "Q3 Financial Results Announcement",
        description: "Strong growth in the automotive sector drives record-breaking quarterly revenue.",
        content: "Full content placeholder..."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop",
        date: "October 26, 2025",
        title: "Launch of New Sustainable Initiatives",
        description: "Implementing eco-friendly practices across all our manufacturing plants.",
        content: "Full content placeholder..."
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        date: "October 27, 2025",
        title: "Strategic Partnership with Tech Giants",
        description: "Collaborating to bring next-gen AI solutions to our fleet management systems.",
        content: "Full content placeholder..."
    },
];

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const newsId = parseInt(id);

    // Find news item or default to first if not found (for demo safety)
    const news = newsItems.find(item => item.id === newsId) || newsItems[0];

    // Get related news (exclude current)
    const relatedNews = newsItems.filter(item => item.id !== newsId).slice(0, 3);

    return (
        <main className="w-full pb-20 px-4 md:px-10">
            {/* Breadcrumb / Back */}
            <div className="py-6 md:py-10">
                <Link href="/#news" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#5a80b9] transition-colors">
                    <div className="bg-gray-100 p-2 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm md:text-base">Back to News</span>
                </Link>
            </div>

            {/* Article Header */}
            <div className="max-w-4xl mx-auto flex flex-col gap-6 mb-10">
                <div className="flex items-center gap-4 text-sm md:text-base text-[#5a80b9] font-medium">
                    <span className="bg-[#f2f7ff] px-4 py-1.5 rounded-full border border-[#5a80b9]/10">Updates</span>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{news.date}</span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold leading-[1.2] text-[#323441]">
                    {news.title}
                </h1>
            </div>

            {/* Featured Image */}
            <div className="w-full relative aspect-video md:aspect-[21/9] rounded-[32px] overflow-hidden shadow-sm mb-12 md:mb-16">
                <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Article Content Layout */}
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Social Share Sidebar (Desktop) */}
                <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 sticky top-32 h-fit">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Share</span>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#5a80b9] hover:text-white hover:border-[#5a80b9] transition-all">
                        <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#5a80b9] hover:text-white hover:border-[#5a80b9] transition-all">
                        <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#5a80b9] hover:text-white hover:border-[#5a80b9] transition-all">
                        <Facebook className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#5a80b9] hover:text-white hover:border-[#5a80b9] transition-all">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="col-span-1 lg:col-span-8">
                    <div className="prose prose-lg prose-blue max-w-none text-[#323441]/80 leading-relaxed space-y-6">
                        {/* We render standard description paragraphs + content placeholders */}
                        <p className="text-xl font-medium text-[#323441] leading-relaxed">
                            {news.description}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: news.content || "" }} />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>

                    {/* Mobile Share */}
                    <div className="flex lg:hidden items-center gap-4 mt-10 border-t border-gray-100 pt-6">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Share Article</span>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#5a80b9] hover:text-white transition-all">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Spacer */}
                <div className="col-span-1 lg:col-span-2"></div>
            </div>

            {/* Related News */}
            <div className="mt-20 border-t border-gray-100 pt-16">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#323441]">Other News</h2>
                    <Link href="/news" className="text-[#5a80b9] font-medium hover:underline">View All</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedNews.map((item) => (
                        <Link href={`/news/${item.id}`} key={item.id} className="group flex flex-col gap-4">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-500">{item.date}</span>
                                <h3 className="text-lg font-bold text-[#323441] leading-snug group-hover:text-[#5a80b9] transition-colors">{item.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
