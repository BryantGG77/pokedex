import './App.css'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { Main } from './components/main/main'
import { useState } from 'react'
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton'

function App() {
  // Maneja el pokemon filtrado que viene como parametro desde el header
  // con el valor del input
  const [pokemonFiltrado, setPokemonFiltrado] = useState();

  const filtro = (data) => {
    setPokemonFiltrado(data || null);
  };

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
