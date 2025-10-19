import { useEffect, useState } from "react";
import Card from "../card/card";
import { listaDePokemons, detallesDePokemons } from "../../Api";

export const Main = ({pokemonFiltrado}) => {

  const [pokemons, setPokemons] = useState([]);

  // Manejador de renderizado de loading y error en el front
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listaAMostrar = pokemonFiltrado ? [pokemonFiltrado] : pokemons;

  const cargarPokemons = async () => {
    try {
      setLoading(true);
      setError(false);

      // Obtener lista básica
      const lista = await listaDePokemons(150);
      if (!lista || lista.length === 0) throw new Error("Lista vacía");

      // Obtener detalles de cada Pokémon
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

  // Clases del contenedor según estado
  const contenedorClases =
    loading || error
      ? "flex flex-col items-center justify-center w-full py-20 gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";

  return (
    <main className="w-full mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className={contenedorClases}>
        {loading && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
            <span className="ml-4 text-gray-500 text-lg mt-4">Cargando Pokémones...</span>
          </>
        )}

        {error && (
          <>
            <img
              className="max-w-[120px] mb-4"
              src="\src\assets\error.png"
              alt="Error"
            />
            <p className="text-center text-gray-500 mb-4">
              Error al cargar los datos de los Pokémon 😢
              <br />
              Intenta recargar la lista.
            </p>
            <button
              onClick={cargarPokemons}
              className="px-4 py-2 bg-indigo-500 text-gray-500 rounded hover:bg-indigo-600 transition-colors"
            >
              Recargar 🔄
            </button>
          </>
        )}

        {!loading && !error && listaAMostrar.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            alt={pokemon.name}
            types={pokemon.types.map((t) => t.type.name)}
            stats={{ // Si el la PokeAPI no hay stats, esta logica garantiza que no rompa la APP
              hp: pokemon.stats[0]?.base_stat || 0,
              attack: pokemon.stats[1]?.base_stat || 0,
              defense: pokemon.stats[2]?.base_stat || 0,
            }}
          />
        ))}
      </div>
    </main>
  );
};
