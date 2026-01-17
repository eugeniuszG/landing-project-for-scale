export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div 
          className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"
          style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
        />
        <p 
          className="text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Ładowanie...
        </p>
      </div>
    </div>
  );
}
