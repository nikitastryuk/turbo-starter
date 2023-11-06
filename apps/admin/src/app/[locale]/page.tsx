import { ClientComponent } from '~/components/ClientComponent';
// import { ServerComponent } from '~/components/ServerComponent';
import { ThemeToggle } from '~/components/ThemeToggle';
import { I18nProviderClient } from '~/locales/client';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div>
      <p>Admin</p>
      <div>
        Mode: <ThemeToggle />
      </div>
      {/* <ServerComponent /> */}
      <I18nProviderClient locale={locale}>
        <ClientComponent />
      </I18nProviderClient>
    </div>
  );
}
