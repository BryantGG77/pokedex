import './App.css'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { Main } from './components/main/main'
import { useState } from 'react'

function App() {

  const [pokemonFiltrado, setPokemonFiltrado] = useState(null);

  const filtro = (data) => {
    setPokemonFiltrado(data);
  };

  return (
    <>
      <Header filtro={filtro}/>
      <Main pokemonFiltrado={pokemonFiltrado}/>
      <Footer />
    </>
  )
}

export default App
