import { Button } from '@llmaid/system';

import { signOut } from './auth/authActions';

export default function Home() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <p className="mb-3 text-center">Client</p>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
