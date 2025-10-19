
export const listaDePokemons = async (limit) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Error al obtener la lista de Pokémon: Error ${res.status}`)
    }
    const data = await res.json();
    return data.results; // devuelve array de {name, url}
  }
  catch (error) {
    console.log(error);
    return []; // devuelve array vacio si hay algun error, evita ruptura de la web
  }
};

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
    console.error(error);
    return []; // devuelve array vacío si hay error
  }
};

export const filtrarPokemons = async (idOrName) => {
  // validar que haya un valor
  if (!idOrName) return null;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`);

    if (!res.ok) {
      
      return null;
    }

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    return null; // para no romper la app
  }
};
