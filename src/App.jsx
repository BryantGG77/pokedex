import './App.css'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { Main } from './components/main/main'
import { useState } from 'react'
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton'

function App() {
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
