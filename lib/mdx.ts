import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

export const POSTS_PATH = join(process.cwd(), 'posts');

export interface PostMeta {
  title: string;
  description?: string;
  date?: string;
  slug: string;
}

export interface ProcessedPost {
  frontMatter: PostMeta;
  body: string;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeShiki, { theme: 'github-dark' })
  .use(rehypeStringify);

export async function getPostBySlug(slug: string): Promise<ProcessedPost> {
  const filePath = join(POSTS_PATH, `${slug}.mdx`);
  const source = await readFile(filePath, 'utf8');
  const { content, data } = matter(source);

  const processed = await processor.process(content);

  return {
    frontMatter: {
      title: (data.title as string) || slug,
      description: (data.description as string) || undefined,
      date: (data.date as string) || undefined,
      slug,
    },
    body: processed.toString(),
  };
}

export async function getPosts(): Promise<PostMeta[]> {
  const files = (await readdir(POSTS_PATH)).filter((f) => /\.mdx?$/.test(f));

  const posts = await Promise.all(
    files.map(async (file) => {
      const source = await readFile(join(POSTS_PATH, file), 'utf8');
      const { data } = matter(source);
      const slug = file.replace(/\.mdx?$/, '');
      return {
        title: (data.title as string) || slug,
        description: (data.description as string) || undefined,
        date: (data.date as string) || undefined,
        slug,
      };
    })
  );

  return posts.sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}

export async function postFilePaths(): Promise<string[]> {
  const files = await readdir(POSTS_PATH);
  return files.filter((f) => /\.mdx?$/.test(f));
}
