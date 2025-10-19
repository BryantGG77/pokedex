import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { filtrarPokemons } from "../../Api";

export const Browser = ({ filtro }) => {

    const [valor, setValor] = useState("");

    const actualizadorInput = (e) => {
        setValor(e.target.value)
    }

    const manejadorEnvioForm = async (e) => {
        e.preventDefault();
        const data = await filtrarPokemons(valor);
        filtro(data); // data será null si no encontró Pokémon
    };




    return (
        <form onSubmit={manejadorEnvioForm} className="flex gap-2 px-3 py-2 mt-4 bg-white hover:bg-gray-50 rounded-full shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md items-center transition-colors">
            <button type="submit">
                <CiSearch className="text-gray-700 cursor-pointer text-lg sm:text-xl" />
            </button>

            <input
                className="text-gray-700 placeholder-gray-400 flex-1 outline-none text-xs sm:text-sm md:text-base bg-transparent"
                type="text"
                placeholder="Buscar Pokémon..."
                value={valor}
                onChange={actualizadorInput}
            />
        </form>
    )
}
