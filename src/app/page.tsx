import { db } from '@/db';
import Link from 'next/link';

// export const dynamic = 'force-dynamic';

// =========== Ways to control caching ===========

// =========== Time Based ===========
// every 3 seconds the next request to this route will trigger a rerender
// export const revalidate = 3;

// =========== On-Demand ===========
// Forcibly purge a cached response
// Dump cache for everything in a page
// import { revalidatePath } from "next/cache"
// When we think data that the '/snippets' route uses has changed...
// revalidatePath('/snippets');

// =========== Disable Caching ===========
// Don't do any caching at all

// ----------- Option # 1 -----------
// Disable all caching for a route
// export const revalidate = 0;

// ----------- Option # 2 -----------
// Disable all caching for a route
// export const revalidate = 'force-dynamic';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        className="flex justify-between items-center p-2 border rounded"
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
