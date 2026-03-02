import { MetadataRoute } from 'next';

const BASE_URL = 'https://apolloglobalinteractive.com';
const API_BASE_URL = process.env.API_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

interface ReportItem {
    id: string;
    news_id?: string;
    published_at?: string;
}

interface InvestorApiResponse {
    status?: string;
    data?: {
        report?: {
            reportItems?: ReportItem[];
        };
    };
}

async function getInvestorData(): Promise<ReportItem[]> {
    if (!API_BASE_URL || !API_TOKEN) {
        console.warn('API_BASE_URL or API_TOKEN is missing in environment variables.');
        return [];
    }

    try {
        const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");
        const url = `${cleanBaseUrl}/client/investor?lang=en`;

        const res = await fetch(url, {
            headers: {
                'Cookie': `token=${API_TOKEN}`,
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            console.error(`Failed to fetch sitemap data: ${res.status} ${res.statusText}`);
            return [];
        }

        const json: InvestorApiResponse = await res.json();

        if (json && json.data && json.data.report && json.data.report.reportItems) {
            return json.data.report.reportItems;
        }

        return [];
    } catch (error) {
        console.error('Error fetching dynamic sitemap data:', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const investorReports = await getInvestorData();
    const currentDate = new Date().toISOString();

    // Static Routes
    const routes = [
        '',
        '/about',
        '/services',
        '/investor-relation',
    ];

    const staticEntries: MetadataRoute.Sitemap = routes.flatMap((route) => {
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

    const investorEntries: MetadataRoute.Sitemap = investorReports
        .filter(item => item.news_id)
        .flatMap((item) => {
            const slug = item.news_id;
            const lastMod = item.published_at ? new Date(item.published_at).toISOString() : currentDate;

            return ['id', 'en'].map((lang) => {
                const url = `${BASE_URL}/${lang}/investor-relation/${slug}`;

                return {
                    url: url,
                    lastModified: lastMod,
                    changeFrequency: 'monthly' as const,
                    priority: 0.6,
                    alternates: {
                        languages: {
                            id: `${BASE_URL}/id/investor-relation/${slug}`,
                            en: `${BASE_URL}/en/investor-relation/${slug}`,
                        },
                    },
                };
            });
        });

    return [...staticEntries, ...investorEntries];
}
