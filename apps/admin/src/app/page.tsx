import { ThemeToggle } from '~/components/ThemeToggle';

export default function Home() {
  return (
    <div>
      <p>Admin</p>
      <div>
        Mode: <ThemeToggle />
      </div>
    </div>
  );
}
