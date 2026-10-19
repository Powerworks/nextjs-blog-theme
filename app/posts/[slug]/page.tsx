import Link from 'next/link';
import { getGlobalData } from '../../../lib/global-data';
import {
  getPostBySlug,
  getPosts,
  postFilePaths,
} from '../../../lib/mdx';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Layout, { GradientBackground } from '../../../components/Layout';
import ArrowIcon from '../../../components/ArrowIcon';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const paths = await postFilePaths();
  return paths.map((path) => ({ slug: path.replace(/\.mdx?$/, '') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  const globalData = getGlobalData();
  if (!post) return {};
  return {
    title: `${post.frontMatter.title} - ${globalData.name}`,
    description: post.frontMatter.description || undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > -1 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex > -1 ? allPosts[currentIndex + 1] : null;
  const globalData = getGlobalData();

  return (
    <Layout>
      <header>
        <Header name={globalData.name} />
      </header>
      <article className="px-6 md:px-0">
        <Header name={globalData.name} />
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {post.frontMatter.title}
          </h1>
          {post.frontMatter.description && (
            <p className="text-xl mb-4">{post.frontMatter.description}</p>
          )}
        </header>
        <main>
          <article
            className="prose dark:prose-dark max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </main>
        <div className="grid md:grid-cols-2 lg:-mx-24 mt-12">
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}`} passHref>
              <a
                className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white/10 dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 transition border border-gray-800/10 dark:border-white/10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col"
              >
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Previous
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {prevPost.title}
                </h4>
                <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
              </a>
            </Link>
          )}
          {nextPost && (
            <Link href={`/posts/${nextPost.slug}`} passHref>
              <a
                className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white/10 dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 transition border border-gray-800/10 dark:border-white/10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col"
              >
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Next
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {nextPost.title}
                </h4>
                <ArrowIcon className="mt-auto mx-auto md:ml-0" />
              </a>
            </Link>
          )}
        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}
