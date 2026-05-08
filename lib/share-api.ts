import {
	fallbackInvestorData,
	type ShareItem,
} from "@/lib/fallback-investor-data";

export interface SharesApiResponse {
	status?: string;
	message?: string;
	data?: ShareItem[] | { shares?: ShareItem[] };
	shares?: ShareItem[];
}

export const SHARES_ENDPOINT =
	"https://api.apolloglobalinteractive.com/api/shares";

function getSharesEndpoint() {
	if (typeof window !== "undefined") {
		return SHARES_ENDPOINT;
	}

	const baseUrl = process.env.API_BASE_URL?.replace(/\/$/, "");
	return baseUrl ? `${baseUrl}/shares` : SHARES_ENDPOINT;
}

const shareFallbackResponse: SharesApiResponse = {
	status: "success",
	message: "Fallback shares response",
	data: fallbackInvestorData.data.stakeholders.shares,
};

export function normalizeShareList(
	response: SharesApiResponse | ShareItem[] | null | undefined,
) {
	const rawShares = Array.isArray(response)
		? response
		: Array.isArray(response?.data)
			? response.data
			: Array.isArray(response?.data?.shares)
				? response.data.shares
				: Array.isArray(response?.shares)
					? response.shares
					: null;

	if (!rawShares) return null;

	return rawShares
		.map((share) => ({
			...share,
			value:
				typeof share.value === "number" ? String(share.value) : share.value || "0",
		}))
		.filter((share) => share.category);
}

export async function fetchShareList(
	options: RequestInit = {},
): Promise<ShareItem[]> {
	try {
		const headers = new Headers(options.headers);

		if (!headers.has("Accept")) {
			headers.set("Accept", "application/json");
		}

		if (options.body && !headers.has("Content-Type")) {
			headers.set("Content-Type", "application/json");
		}

		const response = await fetch(getSharesEndpoint(), {
			cache: "no-store",
			...options,
			headers,
		});

		if (!response.ok) {
			let message = `HTTP Error: ${response.status} ${response.statusText}`;

			try {
				const errorJson = (await response.json()) as { message?: string };
				if (errorJson?.message) {
					message = errorJson.message;
				}
			} catch {
				// Ignore non-JSON error bodies and keep the HTTP status message.
			}

			throw new Error(message);
		}

		const json = (await response.json()) as SharesApiResponse;
		const shares = normalizeShareList(json);

		if (!shares) {
			throw new Error("Shares API returned an invalid response shape.");
		}

		return shares;
	} catch (error) {
		console.error(
			"[Shares API] Failed fetching live shares. Using fallback.",
			error,
		);
		const shares = normalizeShareList(shareFallbackResponse);
		if (shares) return shares;
		return fallbackInvestorData.data.stakeholders.shares;
	}
}
