import Link from "next/link";

type RelatedPost = {
  href: string;
  title: string;
  description: string;
};

type RelatedPostsSectionProps = {
  title?: string;
  intro?: string;
  posts: RelatedPost[];
};

export function RelatedPostsSection({
  title = "Polecane artykuły",
  intro,
  posts,
}: RelatedPostsSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {intro && <p className="mb-4 text-sm opacity-80">{intro}</p>}
      <div className="grid md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#960019] transition-colors"
          >
            <h3 className="font-semibold mb-2">→ {post.title}</h3>
            <p className="text-sm opacity-75">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
