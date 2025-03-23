import Notifier from '@/app/notifier/page';
import Link from 'next/link';


export default async function Home() {
  return (
    <>
    <h1 className="text-5x1 font-semibold tracking-tight text-balance sm:text-7xl">Components</h1>
    <ul>
      <li>
        <Link href="/counter">Counter</Link>
      </li>
      <li>
        <Link href="/notifier">Notifier</Link>
      </li>
      <li>
        <Link href="/tasks">Tasks</Link>
      </li>
    </ul>
    </>
  );
}