import Card from "../card/card"

export const Main = () => {
    return (
        <main className="w-full mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Card
                    id={25}
                    name="Pikachu"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                    types={["Eléctrico"]}
                    stats={{ hp: 35, attack: 55, defense: 40 }}
                />
                <Card
                    id={25}
                    name="Pikachu"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                    types={["Eléctrico"]}
                    stats={{ hp: 35, attack: 55, defense: 40 }}
                />
                <Card
                    id={25}
                    name="Pikachu"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                    types={["Eléctrico"]}
                    stats={{ hp: 35, attack: 55, defense: 40 }}
                />
                <Card
                    id={25}
                    name="Pikachu"
                    image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                    types={["Eléctrico"]}
                    stats={{ hp: 35, attack: 55, defense: 40 }}
                />
            </div>
        </main>
    )
}
