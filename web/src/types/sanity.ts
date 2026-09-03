import type { PortableTextBlock } from "next-sanity";

export interface SanityImageObject {
  _type?: string;
  asset?: {
    _ref: string;
    _type?: string;
  };
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

export type SanityImage = SanityImageObject | string | null | undefined;
export type SanityBody = PortableTextBlock[] | unknown[];

export interface AuthorRef {
  _id?: string;
  name: string;
  slug?: { current: string };
  role?: string;
  creci?: string;
  bio?: SanityBody;
  image?: SanityImage;
  instagram?: string;
  instagramUrl?: string;
  linkedin?: string;
  linkedinUrl?: string;
  whatsapp?: string;
  email?: string;
  postCount?: number;
}

export interface CityRef {
  _id: string;
  name: string;
  slug?: { current: string };
  state?: string;
  image?: SanityImage;
  description?: string;
  postCount?: number;
}

export interface CategoryRef {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  image?: SanityImage;
  postCount?: number;
}

export interface PostItem {
  _id: string;
  title: string;
  slug?: { current: string };
  featured?: boolean;
  views?: number;
  publishedAt?: string;
  updatedAt?: string;
  excerpt?: string;
  tags?: string[];
  mainImage?: SanityImageObject;
  seoImage?: SanityImageObject;
  metaTitle?: string;
  metaDescription?: string;
  body?: SanityBody;
  highlight1Title?: string;
  highlight1Description?: string;
  highlight2Title?: string;
  highlight2Description?: string;
  highlight3Title?: string;
  highlight3Description?: string;
  calloutStyle?: string;
  calloutTitle?: string;
  calloutContent?: string;
  faqTitle?: string;
  faqItems?: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoCaption?: string;
  galleryTitle?: string;
  galleryImages?: SanityImageObject[];
  author?: AuthorRef;
  city?: CityRef;
  categories?: CategoryRef[];
}

export interface ReelItem {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: SanityImageObject;
  videoFileUrl?: string;
  videoUrl?: string;
  propertyTitle?: string;
  propertyUrl?: string;
  instagramUrl?: string;
  publishedAt?: string;
}

export interface LaunchItem {
  _id: string;
  title: string;
  image?: SanityImageObject;
  alt?: string;
  href?: string;
  order?: number;
}


