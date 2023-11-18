import { Button } from '@llmaid/system';

import { ClientComponent } from '~/components/ClientComponent';
import { ServerComponent } from '~/components/ServerComponent';
import { ThemeToggle } from '~/components/ThemeToggle';

import { signOut } from './auth/authActions';

export default function Home() {
  return (
    <div>
      <p>Client</p>
      <div>
        Mode: <ThemeToggle />
      </div>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
      -------------------
      <ServerComponent />
      <ClientComponent />
    </div>
  );
}
