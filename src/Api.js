
export const listaDePokemons = async (limit) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();
  return data.results; // devuelve array de {name, url}
};

export const detallesDePokemons = async (lista) => {
  const promesas = lista.map(pokemon => fetch(pokemon.url).then(res => res.json()));
  
 
  const data = await Promise.all(promesas);
  return data; // devuelve array con los detalles de cada una de los pokemons
};
