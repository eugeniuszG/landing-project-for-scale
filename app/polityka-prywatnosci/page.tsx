import { Metadata } from 'next';
import { siteConfig } from '../lib/siteConfig';

export const metadata: Metadata = {
  title: 'Polityka Prywatności',
  description: 'Polityka prywatności i informacje o plikach cookies.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 
        className="text-3xl md:text-4xl font-bold mb-8"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Polityka Prywatności
      </h1>
      
      <div 
        className="prose prose-lg max-w-none"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
        </p>

        <section className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            1. Administrator danych
          </h2>
          <p>
            Administratorem danych osobowych jest {siteConfig.businessName} z siedzibą 
            przy {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}.
          </p>
          <p className="mt-2">
            Kontakt: {siteConfig.email}, tel. {siteConfig.phone}
          </p>
        </section>

        <section className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            2. Jakie dane zbieramy
          </h2>
          <p>Zbieramy następujące dane:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Dane kontaktowe (imię, nazwisko, email, telefon) — gdy wypełniasz formularz</li>
            <li>Dane techniczne (adres IP, typ przeglądarki) — automatycznie</li>
            <li>Pliki cookies — za Twoją zgodą</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            3. Cel przetwarzania danych
          </h2>
          <p>Twoje dane przetwarzamy w celu:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Odpowiedzi na Twoje zapytania</li>
            <li>Realizacji usług</li>
            <li>Analizy ruchu na stronie (anonimowo)</li>
            <li>Poprawy jakości usług</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            4. Pliki cookies
          </h2>
          <p>
            Strona używa plików cookies w celu zapewnienia prawidłowego działania 
            oraz analizy ruchu. Możesz zarządzać cookies w ustawieniach przeglądarki.
          </p>
          <p className="mt-2">Używamy:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Cookies niezbędne</strong> — do działania strony</li>
            <li><strong>Cookies analityczne</strong> — Vercel Analytics (anonimowe)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            5. Twoje prawa (RODO)
          </h2>
          <p>Masz prawo do:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Dostępu do swoich danych</li>
            <li>Sprostowania danych</li>
            <li>Usunięcia danych (&ldquo;prawo do bycia zapomnianym&rdquo;)</li>
            <li>Ograniczenia przetwarzania</li>
            <li>Przenoszenia danych</li>
            <li>Sprzeciwu wobec przetwarzania</li>
            <li>Wniesienia skargi do UODO</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            6. Okres przechowywania
          </h2>
          <p>
            Dane przechowujemy przez okres niezbędny do realizacji celów, 
            dla których zostały zebrane, lub do czasu wycofania zgody.
          </p>
        </section>

        <section className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            7. Kontakt
          </h2>
          <p>
            W sprawach związanych z ochroną danych osobowych skontaktuj się z nami: {siteConfig.email}
          </p>
        </section>
      </div>
    </div>
  );
}
