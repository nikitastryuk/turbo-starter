import { Button } from '@llmaid/system';

import { DataTable } from '~/components/DataTable/DataTable';

import type { User } from './auth/_components/columns';
import { columns } from './auth/_components/columns';
import { signOut } from './auth/authActions';

function getData(): User[] {
  const roles = ['admin', 'manager', 'user'] as const;
  const users = Array.from({ length: 7 }, (_, i) => ({
    id: (i + 1).toString(),
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)]!,
  }));

  return users;
}

export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
      <DataTable columns={columns} data={getData()} />
    </div>
  );
}
