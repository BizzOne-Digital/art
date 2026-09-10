export type PageSection = {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  body?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
};

export type PageContent = {
  slug: string;
  name: string;
  sections: PageSection[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  featured: boolean;
  active: boolean;
  externalUrl?: string;
  ctaLabel?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
};

export type Order = {
  id: string;
  type: "product_inquiry" | "booking" | "contact";
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
  productName?: string;
  service?: string;
  preferredDate?: string;
  status: "new" | "reviewed" | "closed";
  createdAt: string;
};

export type SiteSettings = {
  siteName: string;
  email: string;
  phone: string;
  headline: string;
  tagline: string;
  disclaimer?: string;
  heroExternalUrl?: string;
  heroExternalLabel?: string;
  musicUrl?: string;
  videoUrl?: string;
};

export type TrainingProgram = {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
};

export type SiteData = {
  pages: PageContent[];
  products: Product[];
  gallery: GalleryItem[];
  faqs: FAQ[];
  pricing: PricingPlan[];
  services: Service[];
  programs: TrainingProgram[];
  orders: Order[];
  settings: SiteSettings;
};
