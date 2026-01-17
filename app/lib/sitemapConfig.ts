import { join } from "path";
import { siteConfig } from "./siteConfig";

// Site URL from siteConfig
export const siteUrl = siteConfig.siteUrl;

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

// Content type defaults for sitemap entries
export const contentTypeDefaults: Record<string, { changeFrequency: ChangeFrequency; priority: number }> = {
  page: {
    changeFrequency: "monthly",
    priority: 0.8,
  },
  post: {
    changeFrequency: "weekly",
    priority: 0.6,
  },
  home: {
    changeFrequency: "weekly",
    priority: 1.0,
  },
};

// Static routes for sitemap
export const staticRoutes: { path: string; sourceFile: string; type: string }[] = [
  {
    path: "/",
    sourceFile: "app/page.tsx",
    type: "home",
  },
];

// Resolve source path for file stats
export function resolveSourcePath(relativePath: string): string {
  return join(process.cwd(), relativePath);
}
