import Link from 'next/link';
import { ENERGIES } from '@/utils/jiugong';

export default function EnergiasPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            ← Voltar
          </Link>
        </div>
        
        <h1 className="mb-8 text-center text-3xl font-bold text-zinc-900">
          As 9 Energias do Jiu Gong Ming Li
        </h1>
        
        <p className="mb-8 text-center text-zinc-600">
          Cada número representa uma força única que governa como você se move no mundo.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(ENERGIES).map((energy) => (
            <div
              key={energy.number}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 text-center">
                <span className="text-5xl font-black text-zinc-900">{energy.number}</span>
              </div>
              
              <h2 className="mb-3 text-center text-lg font-bold text-zinc-800">
                {energy.name}
              </h2>
              
              <div className="mb-3 text-center">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  {energy.element}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-bold text-zinc-900">Essência:</span>
                  <p className="text-zinc-600">{energy.essence}</p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3">
                  <span className="font-bold text-zinc-900">Sombra:</span>
                  <p className="text-zinc-600">{energy.shadow}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
