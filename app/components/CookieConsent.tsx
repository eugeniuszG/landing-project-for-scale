'use client';

import CookieConsent from 'react-cookie-consent';

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akceptuję"
      declineButtonText="Odrzuć"
      enableDeclineButton
      cookieName="cookie-consent"
      expires={365}
      style={{
        background: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)',
        borderTop: '1px solid var(--color-border)',
        padding: '16px 24px',
        alignItems: 'center',
        fontSize: '14px',
      }}
      buttonStyle={{
        background: 'var(--color-accent)',
        color: 'var(--color-text-on-accent)',
        borderRadius: 'var(--radius)',
        padding: '10px 20px',
        fontWeight: '600',
        fontSize: '14px',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: '10px 20px',
        fontWeight: '500',
        fontSize: '14px',
      }}
      contentStyle={{
        flex: '1 0 300px',
        margin: '0',
      }}
    >
      Ta strona używa plików cookies w celu zapewnienia najlepszej jakości usług. 
      Korzystając ze strony wyrażasz zgodę na ich użycie.{' '}
      <a 
        href="/polityka-prywatnosci" 
        style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
      >
        Polityka prywatności
      </a>
    </CookieConsent>
  );
}
