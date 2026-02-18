import { MetadataRoute } from 'next';

const BASE_URL = 'https://apolloglobalinteractive.com';
// Use process.env.API_BASE_URL if available, otherwise fallback (though API_BASE_URL should be in env)
// Based on .env: API_BASE_URL="https://api.apolloglobalinteractive.com/api/"
// The user prompt mentioned APOLLO_BASE_URL but .env has API_BASE_URL. We will use API_BASE_URL.
const API_BASE_URL = process.env.API_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

// Type definitions based on NewsPageApiData in app/[lang]/news/page.tsx
interface NewsItem {
    id: string;
    publishedAt: string;
}

interface CsrItem {
    id: string;
    publishedAt: string;
}

interface ApiResponse {
    status: string;
    message: string;
    data: {
        news: NewsItem[];
        csr: CsrItem[];
    };
}

async function getDynamicData(): Promise<{ news: NewsItem[], csr: CsrItem[] }> {
    if (!API_BASE_URL || !API_TOKEN) {
        console.warn('API_BASE_URL or API_TOKEN is missing in environment variables.');
        return { news: [], csr: [] };
    }

    try {
        // Fetching 'en' data to get the list of IDs. Assuming IDs are consistent across languages.
        // Using the same endpoint pattern as in app/[lang]/news/page.tsx: client/news?lang=en
        // We need to construct the full URL carefully.
        // API_BASE_URL ends with /api/ in .env, so we might need to adjust or use it as is if fetching from there.
        // In lib/fetcher.ts, it does: BASE_URL.replace(/\/$/, "") + '/' + endpoint.replace(/^\//, "")
        // So if API_BASE_URL is .../api/, endpoint client/news becomes .../api/client/news.

        const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");
        const url = `${cleanBaseUrl}/client/news?lang=en`;

        const res = await fetch(url, {
            headers: {
                'Cookie': `token=${API_TOKEN}`,
            },
            next: { revalidate: 3600 } // Revalidate every hour for sitemap
        });

        if (!res.ok) {
            console.error(`Failed to fetch sitemap data: ${res.status} ${res.statusText}`);
            return { news: [], csr: [] };
        }

        const json: ApiResponse = await res.json();

        if (json.status === 'success' && json.data) {
            return {
                news: json.data.news || [],
                csr: json.data.csr || []
            };
        }

        return { news: [], csr: [] };
    } catch (error) {
        console.error('Error fetching dynamic sitemap data:', error);
        return { news: [], csr: [] };
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { news, csr } = await getDynamicData();
    const currentDate = new Date().toISOString();

    // Static Routes
    const routes = [
        '',
        '/about',
        '/services',
        '/news',
        '/investor-relation',
    ];

    const staticEntries: MetadataRoute.Sitemap = routes.flatMap((route) => {
        // Clean route for ID (e.g., /services -> services)
        // const routeName = route === '' ? 'home' : route.substring(1);

        return ['id', 'en'].map((lang) => {
            const url = `${BASE_URL}/${lang}${route}`;

            return {
                url: url,
                lastModified: currentDate,
                changeFrequency: 'daily' as const,
                priority: route === '' ? 1.0 : 0.8,
                alternates: {
                    languages: {
                        id: `${BASE_URL}/id${route}`,
                        en: `${BASE_URL}/en${route}`,
                    },
                },
            };
        });
    });

    // Dynamic News Entries
    const newsEntries: MetadataRoute.Sitemap = news.flatMap((item) => {
        return ['id', 'en'].map((lang) => ({
            url: `${BASE_URL}/${lang}/news/${item.id}`,
            lastModified: item.publishedAt || currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
            alternates: {
                languages: {
                    id: `${BASE_URL}/id/news/${item.id}`,
                    en: `${BASE_URL}/en/news/${item.id}`,
                },
            },
        }));
    });

    // Dynamic CSR Entries
    const csrEntries: MetadataRoute.Sitemap = csr.flatMap((item) => {
        return ['id', 'en'].map((lang) => ({
            url: `${BASE_URL}/${lang}/csr/${item.id}`,
            lastModified: item.publishedAt || currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
            alternates: {
                languages: {
                    id: `${BASE_URL}/id/csr/${item.id}`,
                    en: `${BASE_URL}/en/csr/${item.id}`,
                },
            },
        }));
    });

    return [...staticEntries, ...newsEntries, ...csrEntries];
}
