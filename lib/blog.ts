import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/i18n/routing";
import { mdxComponents } from "@/components/blog/mdx-components";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function readSource(locale: Locale, slug: string) {
  try {
    return await fs.readFile(path.join(BLOG_DIR, locale, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
}

function readingMinutes(source: string) {
  const words = source.replace(/---[\s\S]*?---/, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const getPostSlugs = cache(async (locale: Locale) => {
  const files = await fs.readdir(path.join(BLOG_DIR, locale)).catch(() => [] as string[]);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
});

export const getPost = cache(async (locale: Locale, slug: string) => {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const source = await readSource(locale, slug);
  if (!source) return null;

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const meta: PostMeta = { ...frontmatter, slug, readingMinutes: readingMinutes(source) };
  return { meta, content };
});

export const getAllPosts = cache(async (locale: Locale) => {
  const slugs = await getPostSlugs(locale);
  const posts = await Promise.all(slugs.map((slug) => getPost(locale, slug)));
  return posts
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
});
