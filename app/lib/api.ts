import { Post } from "../interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { siteUrl } from "./sitemapConfig";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    return fs.readdirSync(postsDirectory);
  } catch {
    return [];
  }
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const description = data.description || data.excerpt;
  const canonical = data.canonical || `${siteUrl}/posts/${realSlug}`;
  const lastmod = data.lastmod || data.date;

  return {
    ...data,
    slug: realSlug,
    content,
    description,
    canonical,
    lastmod,
  } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
