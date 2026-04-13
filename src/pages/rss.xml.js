import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
	const deals = await getCollection("deals");
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: deals.map((deal) => ({
			title: deal.data.title,
			description: deal.data.description,
			pubDate: deal.data.publishedAt,
			link: `/deals/${deal.id}/`,
		})),
	});
}
