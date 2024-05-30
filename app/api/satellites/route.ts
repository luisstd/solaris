import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = 'https://celestrak.com/NORAD/elements/gp.php?GROUP=starlink&FORMAT=json';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch data from the third-party API');
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
