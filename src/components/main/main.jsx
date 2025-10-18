import Card from "../card/card"
import { useEffect, useState } from "react"
import { listaDePokemons, detallesDePokemons } from "../../Api";



export const Main = () => {

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const cargarPokemons = async () => {
            const lista = await listaDePokemons(150);
            const detalles = await detallesDePokemons(lista);
            return setPokemons(detalles);
        };
        cargarPokemons();

    }, []);
    console.log(pokemons);

    return (
        <main className="w-full mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemons.map((pokemon) => (
                    <Card
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.sprites.front_default}
                        types={pokemon.types.map(t => t.type.name)}
                        stats={{
                            hp: pokemon.stats[0].base_stat,
                            attack: pokemon.stats[1].base_stat,
                            defense: pokemon.stats[2].base_stat
                        }}
                    />
                ))}
            </div>
        </main>
    )
}
