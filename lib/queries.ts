import { groq } from 'next-sanity';

/**
 * Query to get all blog posts
 */
export const allPostsQuery = groq`*[_type == "post"] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "excerpt": array::join(string::split(pt::text(body), "")[0..255], "") + "...",
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  "authorName": coalesce(author->name, ""),
  "authorImage": author->image,
  categories[]->{
    _id,
    title
  }
} | order(publishedAt desc)`;

/**
 * Query to get a single blog post by slug
 */
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  "authorName": coalesce(author->name, ""),
  "authorImage": author->image,
  "authorBio": author->bio,
  categories[]->{
    _id,
    title,
    slug
  }
}`;

/**
 * Query to get featured products for the homepage
 */
export const featuredProductsQuery = groq`*[_type == "product" && featured == true] {
  _id,
  name,
  slug,
  price,
  comparePrice,
  mainImage,
  inStock,
  categories[]->{
    _id,
    title,
    slug
  }
} | order(publishedAt desc) [0...4]`;

/**
 * Query to get all products
 */
export const allProductsQuery = groq`*[_type == "product"] {
  _id,
  name,
  slug,
  price,
  comparePrice,
  mainImage,
  inStock,
  categories[]->{
    _id,
    title,
    slug
  }
} | order(publishedAt desc)`;

/**
 * Query to get a single product by slug
 */
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  price,
  comparePrice,
  description,
  mainImage,
  images,
  inStock,
  variants,
  shopURL,
  categories[]->{
    _id,
    title,
    slug
  },
  collections[]->{
    _id,
    title,
    slug
  }
}`;

/**
 * Query to get all product categories
 */
export const categoriesQuery = groq`*[_type == "category"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  image,
  featured
}`;

/**
 * Query to get all products in a category
 */
export const productsByCategoryQuery = groq`*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)] {
  _id,
  name,
  slug,
  price,
  comparePrice,
  mainImage,
  inStock,
  categories[]->{
    _id,
    title,
    slug
  }
} | order(publishedAt desc)`;

/**
 * Query to get featured collections
 */
export const featuredCollectionsQuery = groq`*[_type == "collection" && featured == true] {
  _id,
  title,
  slug,
  description,
  mainImage,
  highlight,
  collectionType
} | order(startDate desc) [0...3]`;

/**
 * Query to get a collection by slug with its products
 */
export const collectionBySlugQuery = groq`*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  mainImage,
  startDate,
  endDate,
  highlight,
  collectionType,
  "products": products[]-> {
    _id,
    name,
    slug,
    price,
    comparePrice,
    mainImage,
    inStock
  }
}`;

/**
 * Query to get active drop settings
 */
export const activeDropSettingsQuery = groq`*[_type == "dropSettings" && active == true][0] {
  _id,
  title,
  active,
  "backgroundVideo": {
    "asset": {
      "_ref": backgroundVideo.asset._ref,
      "_type": backgroundVideo.asset._type,
      "url": backgroundVideo.asset->url,
      "originalFilename": backgroundVideo.asset->originalFilename,
      "extension": backgroundVideo.asset->extension,
      "mimeType": backgroundVideo.asset->mimeType,
      "_id": backgroundVideo.asset->_id
    }
  },
  dropDescription,
  startDate,
  endDate
}`;