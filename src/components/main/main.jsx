import { useEffect, useState } from "react";
import Card from "../card/card";
import { listaDePokemons, detallesDePokemons, tiposDePokemons, obtenerPokemonsPorTipo } from "../../Api";

export const Main = ({ pokemonFiltrado, resetFiltro }) => {
  const [pokemons, setPokemons] = useState([]); // Maneja el listado de Pokemons
  
  const [loading, setLoading] = useState(true); // Estado que determina en qué momento se renderiza el mensaje cargando pokemons
  const [error, setError] = useState(false); // Estado que determina si hubo un error en la carga
  
  const [tipos, setTipos] = useState([]); // Estado que maneja los tipos de pokemons mapeados en el select
  const [tipoSeleccionado, setTipoSeleccionado] = useState(""); // Tipo seleccionado en el select

  const [page, setPage] = useState(0); // Página actual
  const [limit] = useState(20); // Número de pokemons por página

  // Cargar pokemons según el tipo y la página
  const cargarPokemons = async () => {
    try {
      // Estado del loading en true para renderizar el spinner de carga
      setLoading(true);
      setError(false);

      // Si hay un tipo seleccionado, filtramos desde la API
      if (tipoSeleccionado) {
        const pokemonsPorTipo = await obtenerPokemonsPorTipo(tipoSeleccionado, limit, page * limit);

        if (!pokemonsPorTipo || pokemonsPorTipo.length === 0)
          throw new Error("No se encontraron pokemons por tipo");

        const detalles = await detallesDePokemons(pokemonsPorTipo);
        setPokemons(detalles);
        return;
      }

      // Si no hay filtro por tipo, usamos la lista general paginada
      const lista = await listaDePokemons(limit, page * limit);
      const detalles = await detallesDePokemons(lista);
      setPokemons(detalles);

    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Llama a la funcion encargada de los tipos en Api.js
  const cargarTipos = async () => {
    const data = await tiposDePokemons();
    setTipos(data);
  };

  // Se cargan los pokemons cada que se cambie de pagina o el tipo de pokemon cambie en el select
  // nos permite mantener la información actualizada segun filtros y paginado
  useEffect(() => {
    cargarPokemons();
  }, [page, tipoSeleccionado]);


  // carga los tipos para renderizarlos en el select
  useEffect(() => {
    cargarTipos();
  }, []);

  //Valida si se encuentra algun pokemon filtrado en el campo de texto
  const listaAMostrar = (() => {
    if (pokemonFiltrado === null) return [];
    if (pokemonFiltrado) return [pokemonFiltrado];
    return pokemons;
  })();

  // Clases del contenedor según estado
  const contenedorClases =
    loading || error || listaAMostrar.length === 0
      ? "flex flex-col items-center justify-center w-full py-20 gap-4"
      : "grid px-10 place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";

  return (
    <main className="w-full mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Sección de FILTROS */}
      <section className="flex items-center max-sm:flex-col justify-center gap-3 mb-8">
        <span className="text-gray-700 font-medium">Tipos:</span>

        {tipos.length > 0 ? (
          <select
            className="px-4 py-2 rounded-md border border-indigo-300 text-indigo-700 font-medium capitalize shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-64 sm:w-72 md:w-80"
            value={tipoSeleccionado}
            onChange={(e) => {
              setTipoSeleccionado(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Todos</option>
            {tipos.map((tipo) => (
              <option key={tipo.name} value={tipo.name}>
                {tipo.name}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-gray-500">Cargando categorías...</p>
        )}

        {tipoSeleccionado && (
          <button
            onClick={() => {
              setTipoSeleccionado("");
              setPage(0);
            }}
            className="text-indigo-600 underline text-sm hover:text-indigo-800"
          >
            Quitar filtro
          </button>
        )}
      </section>

      {/* Sección de CARDS */}
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
            <img className="max-w-[120px] mb-4" src="/error.png" alt="Error" />
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
            <>
              {listaAMostrar.map((pokemon) => (
                <Card
                  key={pokemon.id}
                  title={`Las habilidades de ${pokemon.name} son: ${pokemon.abilities.map(a => a.ability.name).join(', ')}`}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                  types={pokemon.types.map((t) => t.type.name)}
                  stats={{
                    hp: pokemon.stats[0]?.base_stat || 0,
                    attack: pokemon.stats[1]?.base_stat || 0,
                    defense: pokemon.stats[2]?.base_stat || 0,
                  }}
                />
              ))}

              {pokemonFiltrado && (
                <div className="col-span-full">
                  <button
                    onClick={() => {
                      resetFiltro();
                      cargarPokemons();
                    }}
                    className="px-4 py-2 bg-sky-300 text-white rounded hover:bg-indigo-300 cursor-pointer transition-colors mb-6"
                  >
                    Mostrar todos 🔄
                  </button>
                </div>
              )}
            </>
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

      {/* Paginacion */}
      {!loading && !error && !pokemonFiltrado && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className={`px-4 py-2 rounded text-white font-medium transition-colors ${page === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`}
          >
            ← Anterior
          </button>

          <span className="text-gray-700 font-medium">Página {page + 1}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      )}
    </main>
  );
};
