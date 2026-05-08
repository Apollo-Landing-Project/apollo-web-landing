export interface ShareRecord {
	id: string;
	category: string;
	value: string | number;
}

export interface NormalizedShareRecord extends ShareRecord {
	normalizedCategory: string;
	numericValue: number;
}

export function normalizeShareCategory(category?: string) {
	return (category || "").trim().toUpperCase();
}

export function parseShareValue(value?: string | number | null) {
	if (typeof value === "number") {
		return Number.isFinite(value) ? value : 0;
	}

	if (!value) return 0;

	const normalized = value.replace(/[^\d.-]/g, "");
	const parsed = Number(normalized);

	return Number.isFinite(parsed) ? parsed : 0;
}

export function getShareSnapshot(shares: ShareRecord[] = []) {
	const data = shares
		.filter((share) => share.category)
		.map((share) => ({
			...share,
			normalizedCategory: normalizeShareCategory(share.category),
			numericValue: parseShareValue(share.value),
		}));

	return {
		data,
		totalValue: data.reduce((total, share) => total + share.numericValue, 0),
	};
}
