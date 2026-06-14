import { dbFetch } from "./fetcher";
import { buildReportDownloadUrl } from "./report-download";

export interface InvestorNewsItemApi {
  id: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  has_report?: boolean;
  report_id?: string;
  download_url?: string;
}

export interface InvestorNewsListApiResponse {
  status?: string;
  data?: {
    newsSection?: {
      badge?: string | null;
      title?: string;
      desc?: string;
    };
    news?: InvestorNewsItemApi[];
  };
}

export interface InvestorNewsSectionData {
  badge: string;
  title: string;
  desc: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    publishedAt: string;
    href: string;
    has_report?: boolean;
    report_id?: string;
    download_url?: string;
  }>;
}

export function formatNewsDate(dateString: string, lang: string) {
  if (!dateString) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export function getDefaultNewsSection(lang: string): InvestorNewsSectionData {
  const isId = lang === "id";

  return {
    badge: isId ? "Berita" : "News",
    title: isId ? "Berita" : "News",
    desc: isId
      ? "Ikuti pembaruan terbaru, pengumuman resmi, dan sorotan perusahaan kami."
      : "Follow our latest updates, official announcements, and company highlights.",
    items: [],
  };
}

export async function fetchInvestorNews(
  lang: string,
): Promise<InvestorNewsSectionData> {
  const isId = lang === "id";
  const staticHeader = {
    badge: isId ? "Berita" : "News",
    title: isId ? "Berita Terbaru" : "Latest News",
    desc: isId ? "" : "",
  };

  try {
    const res = await dbFetch<InvestorNewsListApiResponse>(
      `client/news?lang=${lang}`,
      {
        next: { tags: ["investor_relation", "news"], revalidate: false },
      },
    );

    return {
      ...staticHeader,
      items: (res?.data?.news || []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        publishedAt: formatNewsDate(item.publishedAt, lang),
        href: `/${lang}/investor-relation/${item.id}`,
        has_report: item.has_report,
        report_id: item.report_id,
        download_url: item.report_id ? buildReportDownloadUrl(item.report_id) : item.download_url,
      })),
    };
  } catch (error) {
    console.error(`[SSR] Investor news fetch failed for '${lang}'.`, error);
    return {
      ...staticHeader,
      items: [],
    };
  }
}
