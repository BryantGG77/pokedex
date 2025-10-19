import { Browser } from "../browser/browser";

export const Header = ({ filtro }) => {
  return (
    <header className="flex flex-col justify-center items-center gap-4 w-full py-10 px-4 bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-300
 text-center">
      <img className="max-w-[300px]" src="src/assets/logo.png" alt="PokéDex logo" />

      <p className="text-black lg:text-2xl md:text-xl sm:text-lg">
        Descubre y explora todos los Pokémon de la primera generación
      </p>
      <Browser filtro={filtro} />
    </header>
  );
};

