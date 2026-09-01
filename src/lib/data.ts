import { connectDB } from "./mongodb";
import {
  FaqModel,
  GalleryModel,
  OrderModel,
  PageModel,
  PricingModel,
  ProductModel,
  ProgramModel,
  ServiceModel,
  SettingsModel,
} from "./models";
import type {
  FAQ,
  GalleryItem,
  Order,
  PageContent,
  PricingPlan,
  Product,
  Service,
  SiteData,
  SiteSettings,
  TrainingProgram,
} from "./types";

function lean<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

const defaultSettings: SiteSettings = {
  siteName: "Elite Body Fitness Pros",
  email: "art@elitebodyfitnesspros.com",
  phone: "19162233228",
  headline: "Unleash The Strongest Version of You",
  tagline:
    "At Elite Body Fitness Pros, we deliver personalized, science-based training that fits your schedule and transforms your results.",
  disclaimer:
    "Consult your physician before beginning this or any exercise program. This information is not intended as a substitute for medical advice. Use of information provided on this site is solely at your own risk.",
  heroExternalUrl: "http://www.powerfulteees.etsy.com/",
  heroExternalLabel: "Visit Our Shop",
  musicUrl: "https://open.spotify.com/track/2siqSsVoviIIkwb9D4A9wj",
  videoUrl:
    "https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-40941-large.mp4",
};

function mapSettings(doc: Record<string, unknown> | null): SiteSettings {
  if (!doc) return defaultSettings;
  return {
    siteName: String(doc.siteName || defaultSettings.siteName),
    email: String(doc.email || defaultSettings.email),
    phone: String(doc.phone || defaultSettings.phone),
    headline: String(doc.headline || defaultSettings.headline),
    tagline: String(doc.tagline || defaultSettings.tagline),
    disclaimer: String(doc.disclaimer || defaultSettings.disclaimer),
    heroExternalUrl: String(
      doc.heroExternalUrl || defaultSettings.heroExternalUrl
    ),
    heroExternalLabel: String(
      doc.heroExternalLabel || defaultSettings.heroExternalLabel
    ),
    musicUrl: String(doc.musicUrl || defaultSettings.musicUrl),
    videoUrl: String(doc.videoUrl || defaultSettings.videoUrl),
  };
}

export async function getSiteData(): Promise<SiteData> {
  await connectDB();

  const [
    pages,
    products,
    gallery,
    faqs,
    pricing,
    services,
    programs,
    orders,
    settingsDoc,
  ] = await Promise.all([
    PageModel.find().sort({ name: 1 }).lean(),
    ProductModel.find().sort({ createdAt: -1 }).lean(),
    GalleryModel.find().lean(),
    FaqModel.find().sort({ order: 1 }).lean(),
    PricingModel.find().lean(),
    ServiceModel.find().lean(),
    ProgramModel.find().lean(),
    OrderModel.find().sort({ createdAt: -1 }).lean(),
    SettingsModel.findOne({ key: "site" }).lean(),
  ]);

  return {
    pages: lean<PageContent[]>(pages),
    products: lean<Product[]>(products),
    gallery: sortGalleryItems(lean<GalleryItem[]>(gallery)),
    faqs: lean<FAQ[]>(faqs),
    pricing: lean<PricingPlan[]>(pricing),
    services: lean<Service[]>(services),
    programs: lean<TrainingProgram[]>(programs),
    orders: lean<Order[]>(orders),
    settings: mapSettings(settingsDoc as Record<string, unknown> | null),
  };
}

export async function getPage(slug: string): Promise<PageContent | undefined> {
  try {
    await connectDB();
    const page = await PageModel.findOne({ slug }).lean();
    return page ? lean<PageContent>(page) : undefined;
  } catch (err) {
    console.error(`getPage(${slug}) failed:`, err);
    return undefined;
  }
}

export async function getPages(): Promise<PageContent[]> {
  await connectDB();
  const pages = await PageModel.find().sort({ name: 1 }).lean();
  return lean<PageContent[]>(pages);
}

export async function savePage(page: PageContent): Promise<PageContent> {
  await connectDB();
  const updated = await PageModel.findOneAndUpdate(
    { slug: page.slug },
    {
      $set: {
        name: page.name,
        sections: page.sections,
      },
    },
    { upsert: true, new: true }
  ).lean();
  return lean<PageContent>(updated);
}

const FEATURED_PRODUCT_ORDER = ["Apparel", "Resistance Bands", "Accessories"];

function sortFeaturedProducts(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const ai = FEATURED_PRODUCT_ORDER.indexOf(a.name);
    const bi = FEATURED_PRODUCT_ORDER.indexOf(b.name);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export async function getProducts(): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find({ active: true })
    .sort({ createdAt: -1 })
    .lean();
  return sortFeaturedProducts(lean<Product[]>(products));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find({ active: true, featured: true })
    .lean();
  return sortFeaturedProducts(lean<Product[]>(products));
}

export async function getAllProducts(): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return lean<Product[]>(products);
}

export async function createProduct(product: Product): Promise<Product> {
  await connectDB();
  const created = await ProductModel.create(product);
  return lean<Product>(created);
}

export async function updateProduct(product: Product): Promise<Product> {
  await connectDB();
  const updated = await ProductModel.findOneAndUpdate(
    { id: product.id },
    { $set: product },
    { new: true }
  ).lean();
  return lean<Product>(updated);
}

export async function deleteProduct(id: string): Promise<void> {
  await connectDB();
  await ProductModel.deleteOne({ id });
}

const GALLERY_ORDER = [
  "Strength Session",
  "Cardio Burn",
  "Mobility Work",
  "Heavy Lift Focus",
];

function sortGalleryItems(items: GalleryItem[]): GalleryItem[] {
  return items
    .filter((item) => item.title !== "Pull Day")
    .sort((a, b) => {
      const ai = GALLERY_ORDER.indexOf(a.title);
      const bi = GALLERY_ORDER.indexOf(b.title);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
}

export async function getGallery(): Promise<GalleryItem[]> {
  await connectDB();
  const items = await GalleryModel.find().lean();
  return sortGalleryItems(lean<GalleryItem[]>(items));
}

export async function createGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  await connectDB();
  const created = await GalleryModel.create(item);
  return lean<GalleryItem>(created);
}

export async function updateGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  await connectDB();
  const updated = await GalleryModel.findOneAndUpdate(
    { id: item.id },
    { $set: item },
    { new: true }
  ).lean();
  return lean<GalleryItem>(updated);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await connectDB();
  await GalleryModel.deleteOne({ id });
}

export async function getFaqs(): Promise<FAQ[]> {
  await connectDB();
  const faqs = await FaqModel.find().sort({ order: 1 }).lean();
  return lean<FAQ[]>(faqs);
}

export async function createFaq(faq: FAQ): Promise<FAQ> {
  await connectDB();
  const created = await FaqModel.create(faq);
  return lean<FAQ>(created);
}

export async function updateFaq(faq: FAQ): Promise<FAQ> {
  await connectDB();
  const updated = await FaqModel.findOneAndUpdate(
    { id: faq.id },
    { $set: faq },
    { new: true }
  ).lean();
  return lean<FAQ>(updated);
}

export async function deleteFaq(id: string): Promise<void> {
  await connectDB();
  await FaqModel.deleteOne({ id });
}

export async function getPricing(): Promise<PricingPlan[]> {
  await connectDB();
  const pricing = await PricingModel.find().lean();
  return lean<PricingPlan[]>(pricing);
}

export async function replacePricing(pricing: PricingPlan[]): Promise<PricingPlan[]> {
  await connectDB();
  await PricingModel.deleteMany({});
  if (pricing.length) await PricingModel.insertMany(pricing);
  return getPricing();
}

export async function getServices(): Promise<Service[]> {
  await connectDB();
  const services = await ServiceModel.find().lean();
  return lean<Service[]>(services);
}

export async function getPrograms(): Promise<TrainingProgram[]> {
  await connectDB();
  const programs = await ProgramModel.find().lean();
  if (programs.length) return lean<TrainingProgram[]>(programs);
  return [
    {
      id: "prog-1",
      title: "Strength Foundations",
      description:
        "Placeholder — client will provide final training program details.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
      level: "Beginner",
    },
    {
      id: "prog-2",
      title: "Athletic Performance",
      description:
        "Placeholder — client will provide final training program details.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      level: "Intermediate",
    },
    {
      id: "prog-3",
      title: "Elite Transformation",
      description:
        "Placeholder — client will provide final training program details.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80",
      level: "Advanced",
    },
  ];
}

export async function replaceServices(services: Service[]): Promise<Service[]> {
  await connectDB();
  await ServiceModel.deleteMany({});
  if (services.length) await ServiceModel.insertMany(services);
  return getServices();
}

export async function getOrders(): Promise<Order[]> {
  await connectDB();
  const orders = await OrderModel.find().sort({ createdAt: -1 }).lean();
  return lean<Order[]>(orders);
}

export async function createOrder(order: Order): Promise<Order> {
  await connectDB();
  const created = await OrderModel.create(order);
  return lean<Order>(created);
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<void> {
  await connectDB();
  await OrderModel.updateOne({ id }, { $set: { status } });
}

export async function deleteOrder(id: string): Promise<void> {
  await connectDB();
  await OrderModel.deleteOne({ id });
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    await connectDB();
    const settings = await SettingsModel.findOne({ key: "site" }).lean();
    return mapSettings(settings as Record<string, unknown> | null);
  } catch (err) {
    console.error("getSettings failed, using defaults:", err);
    return defaultSettings;
  }
}

export async function updateSettings(
  settings: Partial<SiteSettings>
): Promise<SiteSettings> {
  await connectDB();
  const updated = await SettingsModel.findOneAndUpdate(
    { key: "site" },
    { $set: settings },
    { upsert: true, new: true }
  ).lean();
  return mapSettings(updated as Record<string, unknown> | null);
}
