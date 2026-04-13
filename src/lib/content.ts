import type { CollectionEntry } from "astro:content";

export type DealEntry = CollectionEntry<"deals">;
export type VendorEntry = CollectionEntry<"vendors">;
export type GuideEntry = CollectionEntry<"guides">;

export function sortDealsByDate(deals: DealEntry[]) {
	return [...deals].sort(
		(a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
	);
}

export function sortGuidesByDate(guides: GuideEntry[]) {
	return [...guides].sort(
		(a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
	);
}

export function featuredDeals(deals: DealEntry[], limit = 3) {
	return sortDealsByDate(deals)
		.filter((deal) => deal.data.featured && !deal.data.draft)
		.slice(0, limit);
}

export function latestDeals(deals: DealEntry[], limit = 6) {
	return sortDealsByDate(deals)
		.filter((deal) => !deal.data.draft)
		.slice(0, limit);
}

export function expiringDeals(deals: DealEntry[], limit = 4) {
	return deals
		.filter((deal) => !deal.data.draft && deal.data.expiresAt)
		.sort((a, b) => a.data.expiresAt!.valueOf() - b.data.expiresAt!.valueOf())
		.slice(0, limit);
}

export function featuredGuides(guides: GuideEntry[], limit = 3) {
	return sortGuidesByDate(guides).filter((guide) => guide.data.featured).slice(0, limit);
}

export function featuredVendors(vendors: VendorEntry[], limit = 6) {
	return [...vendors]
		.filter((vendor) => vendor.data.featured)
		.sort((a, b) => b.data.rating - a.data.rating)
		.slice(0, limit);
}

export function isExpired(deal: DealEntry) {
	return Boolean(deal.data.expiresAt && deal.data.expiresAt.valueOf() < Date.now());
}

export function billingCycleLabel(cycle: DealEntry["data"]["billingCycle"]) {
	switch (cycle) {
		case "monthly":
			return "/月";
		case "quarterly":
			return "/季";
		case "semi-annual":
			return "/半年";
		case "yearly":
			return "/年";
		case "one-time":
			return " 一次性";
	}
}

export function renewalLabel(type: DealEntry["data"]["renewalType"]) {
	switch (type) {
		case "same-price":
			return "续费同价";
		case "higher":
			return "续费涨价";
		default:
			return "续费待确认";
	}
}

export function vendorDealCount(vendorId: string, deals: DealEntry[]) {
	return deals.filter((deal) => deal.data.vendor === vendorId && !deal.data.draft).length;
}

export function collectDealTags(deals: DealEntry[]) {
	const counter = new Map<string, number>();
	for (const deal of deals) {
		for (const tag of deal.data.tags) {
			counter.set(tag, (counter.get(tag) ?? 0) + 1);
		}
	}

	return [...counter.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, 8);
}
