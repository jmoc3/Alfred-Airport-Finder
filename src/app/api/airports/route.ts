import { NextRequest, NextResponse } from 'next/server';
import { AirportsService } from '@/src/services/airports.service';

// Revalida el caché cada hora (3600 segundos)
export const revalidate = 3600;
// Fuerza a Next.js a cachear esta ruta como estática aunque use parámetros
export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || undefined;

    const data = await AirportsService.getAirports(query);

    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
