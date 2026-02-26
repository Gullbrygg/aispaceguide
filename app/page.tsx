import { PersonList } from './PersonList';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>SpacetimeDB Next.js App</h1>
      <PersonList />
    </main>
  );
}
