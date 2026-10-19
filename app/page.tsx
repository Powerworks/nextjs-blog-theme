import Link from 'next/link';
import { getPosts } from '../lib/mdx';
import { getGlobalData } from '../lib/global-data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  const posts = await getPosts();
  const globalData = getGlobalData();

  if (!posts.length) {
    notFound();
  }

  return (
    <Layout>
      <header>
        <Header name={globalData.name} />
      </header>
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white/10 dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 transition border border-gray-800/10 dark:border-white/10 border-b-0 last:border-b hover:border-b"
            >
              <Link
                as={`/posts/${post.slug}`}
                href={`/posts/[slug]`}
                passHref
              >
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                  {post.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}
