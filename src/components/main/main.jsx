import { useEffect, useState } from "react";
import Card from "../card/card";
import { listaDePokemons, detallesDePokemons } from "../../Api";

export const Main = ({ pokemonFiltrado, resetFiltro }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const cargarPokemons = async () => {
    try {
      setLoading(true);
      setError(false);

      const lista = await listaDePokemons(150);
      if (!lista || lista.length === 0) throw new Error("Lista vacía");

      const detalles = await detallesDePokemons(lista);
      if (!detalles || detalles.length === 0) throw new Error("Detalles vacíos");

      setPokemons(detalles);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPokemons();
  }, []);

  const listaAMostrar = (() => {
    if (pokemonFiltrado === null) return []; // búsqueda sin resultados
    if (pokemonFiltrado) return [pokemonFiltrado]; // búsqueda con resultados
    return pokemons; // sin filtro (lista completa)
  })();

  const contenedorClases =
    loading || error || listaAMostrar.length === 0
      ? "flex flex-col items-center justify-center w-full py-20 gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";

  return (
    <main className="w-full mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className={contenedorClases}>
        {loading && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
            <span className="ml-4 text-gray-500 text-lg mt-4">
              Cargando Pokémones...
            </span>
          </>
        )}

        {error && (
          <>
            <img
              className="max-w-[120px] mb-4"
              src="/error.png"
              alt="Error"
            />
            <p className="text-center text-black sm:text-lg md:text-xl lg:text-2xl mb-4">
              Error al cargar los datos de los Pokémon 😢
              <br />
              Intenta recargar la lista.
            </p>
            <button
              onClick={() => {
                cargarPokemons();
                resetFiltro();
              }}
              className="px-4 py-2 bg-sky-300 text-white rounded hover:bg-indigo-300 cursor-pointer transition-colors"
            >
              Recargar 🔄
            </button>
          </>
        )}

        {!loading && !error && (
          listaAMostrar.length > 0 ? (
            listaAMostrar.map((pokemon) => (
              <>
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  types={pokemon.types.map((t) => t.type.name)}
                  stats={{
                    hp: pokemon.stats[0]?.base_stat || 0,
                    attack: pokemon.stats[1]?.base_stat || 0,
                    defense: pokemon.stats[2]?.base_stat || 0,
                  }}
                />
              </>
            ))
          ) : (
            <>
              <img
                className="max-w-[120px] mb-4 rounded"
                src="/pokemonNoEncontrado.webp"
                alt="Pokemon no encontrado"
              />
              <p className="text-center text-black sm:text-lg md:text-xl lg:text-2xl mb-4">
                Pokémon no encontrado 😢
                <br />
                Verifica el nombre o ID e intenta nuevamente.
              </p>
              <button
                onClick={() => {
                  cargarPokemons();
                  resetFiltro();
                }}
                className="px-4 py-2 bg-sky-300 text-white rounded hover:bg-indigo-300 cursor-pointer transition-colors"
              >
                Mostrar todos 🔄
              </button>
            </>
          )
        )}
      </div>
    </main>
  );
};
