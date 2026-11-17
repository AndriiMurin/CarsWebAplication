export default function AboutPage() {
  return (
    <section>
      <h1>O aplikacji</h1>

      <p>
        Cars Client to aplikacja internetowa do zarządzania
        samochodami.
      </p>

      <p>
        Frontend został przygotowany w React i TypeScript.
        Komunikacja z backendem ASP.NET Core odbywa się
        za pomocą biblioteki Axios.
      </p>

      <p>
        Aplikacja wykorzystuje Zustand do zarządzania stanem,
        JWT do uwierzytelniania oraz role User i Admin
        do kontroli dostępu.
      </p>
    </section>
  );
}
