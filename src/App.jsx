import './App.css'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { Main } from './components/main/main'
import { useState } from 'react'
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton'

function App() {
  // 🔹 Estado global para almacenar el Pokémon filtrado
  const [pokemonFiltrado, setPokemonFiltrado] = useState();

  // 🔹 Recibe el resultado del filtrado desde Browser
  const filtro = (data) => {
    setPokemonFiltrado(data || null);
  };

  // 🔹 Restablece el filtro (para volver a mostrar todas las cards cuando no haya resultado)
  const resetFiltro = () => {
    setPokemonFiltrado(undefined);
  };

  return (
    <>
      <Header filtro={filtro} />
      <Main pokemonFiltrado={pokemonFiltrado} resetFiltro={resetFiltro} />
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App
