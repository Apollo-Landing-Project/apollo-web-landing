type ReportItemWithId = {
	id: string;
	file_url?: string | null;
};

function getApiBaseUrl() {
	const baseUrl = process.env.API_BASE_URL;
	return baseUrl ? baseUrl.replace(/\/$/, "") : null;
}

export function buildReportDownloadUrl(reportId: string) {
	const baseUrl = getApiBaseUrl();
	return baseUrl ? `${baseUrl}/client/download/${reportId}` : `/api/client/download/${reportId}`;
}

export function enrichReportItemDownload<T extends ReportItemWithId>(report: T) {
	return {
		...report,
		download_url: buildReportDownloadUrl(report.id),
	};
}

export function enrichInvestorReportDownloads<
	T extends {
		report?: {
			reportItems?: ReportItemWithId[];
		};
	},
>(data: T): T {
	if (!data.report?.reportItems) {
		return data;
	}

	return {
		...data,
		report: {
			...data.report,
			reportItems: data.report.reportItems.map(enrichReportItemDownload),
		},
	};
}
