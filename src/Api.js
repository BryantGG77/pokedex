//Limit y offset se encargan de limitar los registros por pagina, limit para la cantidad y
// offset para indicar desde que registro empieza, esto nos ayuda en la paginación
export const listaDePokemons = async (limit = 20, offset = 0) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error("Error al obtener la lista de Pokémon");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error en listaDePokemons:", error);
    return [];
  }
};

// Accede al endpoint que se encuentra en cada pokemon que nos entrega listaDePokemons para acceder
// al detalle de cada uno
export const detallesDePokemons = async (lista) => {
  try {
    // Creamos un array de promesas
    const promesas = lista.map(pokemon =>
      fetch(pokemon.url)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error al obtener detalles de ${pokemon.name}: ${res.status}`);
          }
          return res.json();
        })
    );

    // Esperamos que todas las promesas se resuelvan ya que desde listaDePokemons necesitamos
    // acceder a otro endpoint
    const data = await Promise.all(promesas);
    return data; // array con detalles completos
  } catch (error) {
    console.error("Error en la solicitud de detalles: ", error);
    return []; // devuelve array vacío si hay error
  }
};

export const filtrarPokemons = async (idOrName) => { //Recibe como parametro el ID o nombre para hacer la solicitud en el endpoint
  if (!idOrName) return null;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`);
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud de filtrar: ", error);
    return null;
  }
};


export const tiposDePokemons = async () => { // Se encarga de entregar los tipos para renderizarlos en el select del main

  try {
    const res = await fetch("https://pokeapi.co/api/v2/type");
    if (!res.ok) {
      throw new Error("Error al obtener los tipos de Pokémon");
    }

    const data = await res.json();
    return data.results || [];
  } catch {
    console.error("Error en la solicitud de tipos:", error);
    return [];
  }
}

//recibe 3 parametros, tipo que es el valor del select, limit se usa para limitar la cantidad de
// registros que se mostraran por pagina o offset se usa para gestionar la paginación LOCAL
export const obtenerPokemonsPorTipo = async (tipo, limit = 20, offset = 0) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    if (!res.ok) throw new Error("Error al obtener Pokémon por tipo");

    const data = await res.json();
    const pokemonsTipo = data.pokemon.slice(offset, offset + limit);
    return pokemonsTipo.map(p => p.pokemon); // [{ name, url }]
  } catch (error) {
    console.error("Error en la solicitud de Pokémon por tipo:", error);
    return [];
  }
};