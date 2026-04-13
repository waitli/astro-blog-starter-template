import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const deals = defineCollection({
	loader: glob({ base: "./src/content/deals", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		expiresAt: z.coerce.date().optional(),
		vendor: z.string(),
		product: z.string(),
		productUrl: z.string().url(),
		region: z.array(z.string()).min(1),
		price: z.number(),
		currency: z.string().default("USD"),
		billingCycle: z.enum(["monthly", "quarterly", "semi-annual", "yearly", "one-time"]),
		originalPrice: z.number().optional(),
		discountCode: z.string().optional(),
		stack: z.array(z.string()).default([]),
		highlights: z.array(z.string()).default([]),
		bestFor: z.array(z.string()).default([]),
		avoidIf: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
		renewalType: z.enum(["same-price", "higher", "unknown"]).default("unknown"),
		sourceName: z.string(),
		sourceUrl: z.string().url(),
		sourceCheckedAt: z.coerce.date(),
		heroImage: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

const vendors = defineCollection({
	loader: glob({ base: "./src/content/vendors", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		website: z.string().url(),
		headquarters: z.string(),
		categories: z.array(z.string()).default([]),
		paymentMethods: z.array(z.string()).default([]),
		support: z.string(),
		rating: z.number().min(0).max(5),
		established: z.number().int(),
		heroImage: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

const guides = defineCollection({
	loader: glob({ base: "./src/content/guides", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		category: z.string(),
		tags: z.array(z.string()).default([]),
		heroImage: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { deals, vendors, guides };
