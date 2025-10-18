import { CiSearch } from "react-icons/ci";

export const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center gap-4 w-full py-8 px-3 sm:px-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-center overflow-hidden">

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-500 break-words">
        Pokédex
      </h1>

      <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-md sm:max-w-xl">
        Descubre y explora todos los Pokémon de la primera generación
      </p>

      <div className="flex gap-2 px-3 py-2 mt-4 bg-white hover:bg-gray-50 rounded-full shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md items-center transition-colors">
        <CiSearch className="text-gray-700 cursor-pointer text-lg sm:text-xl" />
        <input
          className="text-gray-700 placeholder-gray-400 flex-1 outline-none text-xs sm:text-sm md:text-base bg-transparent"
          type="text"
          placeholder="Buscar Pokémon..."
        />
      </div>
    </header>
  );
};

