import { promises as fs } from "fs";
import path from "path";
import { seedData } from "./seed";
import type {
  FAQ,
  GalleryItem,
  Order,
  PageContent,
  PricingPlan,
  Product,
  Service,
  SiteData,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site.json");

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(seedData, null, 2), "utf-8");
  }
}

export async function getSiteData(): Promise<SiteData> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as SiteData;
}

export async function saveSiteData(data: SiteData): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function updateSiteData(
  updater: (data: SiteData) => SiteData | Promise<SiteData>
): Promise<SiteData> {
  const data = await getSiteData();
  const next = await updater(data);
  await saveSiteData(next);
  return next;
}

export async function getPage(slug: string): Promise<PageContent | undefined> {
  const data = await getSiteData();
  return data.pages.find((p) => p.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  const data = await getSiteData();
  return data.products.filter((p) => p.active);
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await getSiteData();
  return data.products;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const data = await getSiteData();
  return data.gallery;
}

export async function getFaqs(): Promise<FAQ[]> {
  const data = await getSiteData();
  return [...data.faqs].sort((a, b) => a.order - b.order);
}

export async function getPricing(): Promise<PricingPlan[]> {
  const data = await getSiteData();
  return data.pricing;
}

export async function getServices(): Promise<Service[]> {
  const data = await getSiteData();
  return data.services;
}

export async function getOrders(): Promise<Order[]> {
  const data = await getSiteData();
  return [...data.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
