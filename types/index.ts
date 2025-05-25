import { SVGProps } from "react";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@portabletext/types";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// Author
export interface Author {
  _id: string;
  _type: "author";
  name: string;
  image?: SanityImageObject;
  bio?: PortableTextBlock[];
}

// Post
export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImageObject;
  publishedAt?: string;
  body?: PortableTextBlock[];
  excerpt?: string;
  estimatedReadingTime?: number;
  authorName?: string;
  authorImage?: SanityImageObject;
  authorBio?: PortableTextBlock[];
  categories?: Category[];
}

// Category
export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: SanitySlug;
  description?: string;
  image?: SanityImageObject;
  order?: number;
  featured?: boolean;
}

// Collection
export interface Collection {
  _id: string;
  _type: "collection";
  title: string;
  slug: SanitySlug;
  description?: string;
  mainImage?: SanityImageObject;
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  highlight?: boolean;
  collectionType?: "seasonal" | "limited" | "permanent" | "collaboration";
}

// Product Variant
export interface ProductVariant {
  name: string;
  options: string[];
}

// Product
export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: SanitySlug;
  price: number;
  comparePrice?: number;
  description?: string;
  mainImage: SanityImageObject;
  images?: SanityImageObject[];
  categories: Category[];
  inStock: boolean;
  featured?: boolean;
  publishedAt?: string;
  variants?: ProductVariant[];
  shopURL?: string;
  dropExclusive?: boolean;
}
