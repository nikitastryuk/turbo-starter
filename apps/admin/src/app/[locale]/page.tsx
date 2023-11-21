import { Button } from '@llmaid/system';

import { signOut } from './auth/authActions';

export default function Home() {
  return (
    <div>
      <p>Client</p>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
