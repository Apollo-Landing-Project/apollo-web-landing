const REPORT_CATEGORY_LABELS = {
	"annual-report": {
		en: "Annual Report",
		id: "Laporan Tahunan",
		aliases: ["annual report", "laporan tahunan"],
	},
	"financial-statements": {
		en: "Financial Statements",
		id: "Laporan Keuangan",
		aliases: ["financial statements", "laporan keuangan"],
	},
	berita: {
		en: "News",
		id: "Berita",
		aliases: ["berita", "news"],
	},
} as const;

type ReportCategoryKey = keyof typeof REPORT_CATEGORY_LABELS;

const normalizeCategory = (value: string) =>
	value.trim().toLowerCase().replace(/\s+/g, " ");

export function getReportCategoryKey(category: string) {
	const normalized = normalizeCategory(category);

	for (const [key, config] of Object.entries(REPORT_CATEGORY_LABELS)) {
		if ((config.aliases as readonly string[]).includes(normalized)) {
			return key;
		}
	}

	return normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function getReportCategoryLabel(category: string, lang: "en" | "id") {
	const key = getReportCategoryKey(category) as ReportCategoryKey;
	return REPORT_CATEGORY_LABELS[key]?.[lang] || category;
}
