// app/(dashboard)/store/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useLives } from "@/lib/lives";
import { PETS, type Pet } from "@/lib/pets";

export default function StorePage() {
  const { lives, buyLives } = useLives();
  const [coins, setCoins] = useState(0);
  const [ownedPets, setOwnedPets] = useState<string[]>(() => JSON.parse(localStorage.getItem("ownedPets") || "[]"));
  const [activePet, setActivePet] = useState<string | null>(localStorage.getItem("activePet"));

  useEffect(() => {
    document.documentElement.setAttribute("data-bg", "skills");
    setCoins(Number(localStorage.getItem("coins") || 0));
  }, []);

  const buyPet = (pet: Pet) => {
    if (coins < pet.price) return alert("No tienes suficientes monedas");
    const newCoins = coins - pet.price;
    setCoins(newCoins);
    localStorage.setItem("coins", String(newCoins));
    const next = Array.from(new Set([...ownedPets, pet.id]));
    setOwnedPets(next);
    localStorage.setItem("ownedPets", JSON.stringify(next));
  };

  const equipPet = (id: string) => {
    if (!ownedPets.includes(id)) return;
    setActivePet(id);
    localStorage.setItem("activePet", id);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Tienda</h2>
      <div className="mb-6 flex items-center gap-4">
        <span className="px-3 py-2 rounded-xl bg-white/10">Monedas: {coins}</span>
        <span className="px-3 py-2 rounded-xl bg-white/10">Vidas: {lives}</span>
        <button className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30" onClick={()=>buyLives(1)}>
          Comprar +1 vida (20 monedas)
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Mascotas</h3>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {PETS.map(p => (
          <div key={p.id} className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl">
            <div className="h-28 rounded-xl overflow-hidden mb-2 bg-white/10 flex items-center justify-center">
              <span className="text-5xl">{p.emoji}</span>
            </div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm opacity-80 mb-3">Precio: {p.price} monedas</div>
            {ownedPets.includes(p.id) ? (
              <button className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30"
                      onClick={()=>equipPet(p.id)}>
                {activePet === p.id ? "Equipado ✓" : "Equipar"}
              </button>
            ) : (
              <button className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30"
                      onClick={()=>buyPet(p)}>
                Comprar
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
