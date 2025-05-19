import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";

import { title } from "@/components/primitives";
import { urlForImage } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/lib/queries";
import { Post } from "@/types";

export const revalidate = 60;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"] { slug }`);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

async function getPostData(slug: string) {
  const post = await client.fetch<Post>(postBySlugQuery, { slug });

  return { post };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Ensure we're properly awaiting and accessing params
  const slug = params.slug;
  const { post } = await getPostData(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className={title({ size: "lg", className: "mb-4" }).toString()}>
          Post Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-3 rounded-lg inline-block transition hover:opacity-90"
          href="/news"
        >
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            className="text-gray-500 dark:text-gray-400 hover:underline"
            href="/news"
          >
            ← Back to News
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-4">
          {post.categories &&
            post.categories.map((category) => (
              <span
                key={category._id}
                className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {category.title}
              </span>
            ))}
        </div>

        {/* Post Title */}
        <h1 className={title({ size: "lg", className: "mb-6" }).toString()}>
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center mt-8 mb-8">
          {post.authorImage && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                fill
                alt={post.authorName || "Author"}
                className="object-cover"
                src={urlForImage(post.authorImage).url() || ""}
              />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {post.authorName || ""}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {post.publishedAt &&
                format(new Date(post.publishedAt), "MMMM d, yyyy")}
              {post.estimatedReadingTime &&
                ` · ${post.estimatedReadingTime} min read`}
            </div>
          </div>
        </div>

        {/* Main Image */}
        {post.mainImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-8">
            <Image
              fill
              priority
              alt={post.title}
              className="object-cover"
              src={urlForImage(post.mainImage).url() || ""}
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.body && (
            <PortableText
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg my-8">
                      <Image
                        fill
                        alt={value.alt || "Blog image"}
                        className="object-cover"
                        src={urlForImage(value).url() || ""}
                      />
                    </div>
                  ),
                },
              }}
              value={post.body}
            />
          )}
        </div>

        {/* Author Bio */}
        {post.authorBio && (
          <div className="mt-16 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center mb-4">
              {post.authorImage && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    fill
                    alt={post.authorName || "Author"}
                    className="object-cover"
                    src={urlForImage(post.authorImage).url() || ""}
                  />
                </div>
              )}
              <div>
                <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  About {post.authorName || ""}
                </div>
              </div>
            </div>
            <div className="prose dark:prose-invert">
              <PortableText value={post.authorBio} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
