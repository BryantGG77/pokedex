import { Browser } from "../browser/browser";

export const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center gap-4 w-full py-8 px-3 sm:px-4 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-center overflow-hidden">

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-500 break-words">
        Pokédex
      </h1>

      <p className="text-gray-700 sm:text-lg md:text-xl lg:text-2xl max-w-md sm:max-w-xl">
        Descubre y explora todos los Pokémon de la primera generación
      </p>

      <Browser />
    </header>
  );
};

