import { ClientComponent } from '~/components/ClientComponent';
// import { ServerComponent } from '~/components/ServerComponent';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function Home() {
  return (
    <div>
      <p>Client</p>
      <div>
        Mode: <ThemeToggle />
      </div>
      {/* <ServerComponent /> */}
      <ClientComponent />
    </div>
  );
}
