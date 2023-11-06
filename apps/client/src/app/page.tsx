import { ThemeToggle } from '~/components/ThemeToggle';

export default function Home() {
  return (
    <div>
      <p>Client</p>
      <div>
        Mode: <ThemeToggle />
      </div>
    </div>
  );
}
