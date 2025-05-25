import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { title } from "@/components/primitives";
import { urlForImage } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/lib/queries";
import { Post } from "@/types";

export const revalidate = 60; // Revalidate this page every 60 seconds

async function getPostsData() {
  const posts = await client.fetch<Post[]>(allPostsQuery);

  return { posts };
}

export default async function NewsPage() {
  const { posts } = await getPostsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={title({ size: "lg", className: "mb-8" }).toString()}>
        News
      </h1>

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="mt-8 file:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg">
              {posts[0].mainImage && (
                <Image
                  fill
                  alt={posts[0].title}
                  className="object-cover"
                  src={urlForImage(posts[0].mainImage).url() || ""}
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                {posts[0].categories && posts[0].categories.length > 0 && (
                  <span className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {posts[0].categories[0].title}
                  </span>
                )}
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {posts[0].publishedAt &&
                    formatDistanceToNow(new Date(posts[0].publishedAt), {
                      addSuffix: true,
                    })}
                </span>
              </div>
              <h2
                className={title({ size: "sm", className: "mb-2" }).toString()}
              >
                {posts[0].title}
              </h2>
              {posts[0].excerpt && (
                <p className="text-gray-600 text-xs dark:text-gray-300 mb-2">
                  {posts[0].excerpt}
                </p>
              )}
              <div className="flex items-center mb-6">
                {posts[0].authorImage && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      fill
                      alt={posts[0].authorName || "Author"}
                      className="object-cover"
                      src={urlForImage(posts[0].authorImage).url() || ""}
                    />
                  </div>
                )}
                <span className="text-gray-700 dark:text-gray-300">
                  {posts[0].authorName || ""}
                </span>
              </div>
              <Link
                className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-3 rounded-lg inline-block transition hover:opacity-90 w-fit"
                href={`/news/${posts[0].slug.current}`}
              >
                Read Article
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the posts */}
      {posts.length > 1 && (
        <div>
          <h2 className={title({ size: "md", className: "mb-6" }).toString()}>
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Link
                key={post._id}
                className="group"
                href={`/news/${post.slug.current}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  {post.mainImage && (
                    <Image
                      fill
                      alt={post.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      src={urlForImage(post.mainImage).url() || ""}
                    />
                  )}
                </div>
                <div className="mb-2">
                  {post.categories && post.categories.length > 0 && (
                    <span className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold mr-2">
                      {post.categories[0].title}
                    </span>
                  )}
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {post.publishedAt &&
                      formatDistanceToNow(new Date(post.publishedAt), {
                        addSuffix: true,
                      })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:underline">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center">
                  {post.authorImage && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image
                        fill
                        alt={post.authorName || "Author"}
                        className="object-cover"
                        src={urlForImage(post.authorImage).url() || ""}
                      />
                    </div>
                  )}
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {post.authorName || ""}
                  </span>
                  {post.estimatedReadingTime && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-3">
                      {post.estimatedReadingTime} min read
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            No articles available at the moment. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
