import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 
          className="text-6xl font-bold mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          404
        </h1>
        <h2 
          className="text-2xl font-semibold mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Strona nie znaleziona
        </h2>
        <p 
          className="mb-8"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 font-semibold btn-accent"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
