import { MetadataRoute } from "next";
import fs from "fs";
import { getAllPosts } from "./lib/api";
import {
  contentTypeDefaults,
  resolveSourcePath,
  siteUrl,
  staticRoutes,
} from "./lib/sitemapConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: post.canonical || `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.lastmod || post.date),
    ...contentTypeDefaults.post,
  }));

  const staticUrls = staticRoutes.map(({ path, sourceFile, type }) => {
    let lastModified = new Date();

    try {
      const stats = fs.statSync(resolveSourcePath(sourceFile));
      lastModified = stats.mtime;
    } catch (error) {
      console.warn(`Unable to read metadata for sitemap route ${path}:`, error);
    }

    return {
      url: `${siteUrl}${path}`,
      lastModified,
      ...contentTypeDefaults[type],
    };
  });

  return [...staticUrls, ...postUrls];
}
