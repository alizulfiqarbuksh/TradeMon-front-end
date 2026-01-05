import React, { useEffect, useState } from 'react'
import * as pokemonService from '../../services/pokemon'

function Pokemon() {

  const [pokemons, setPokemons] = useState([])

  useEffect(() => {

    const getPokemons = async () => {
      try {

        const pokemons = await pokemonService.show()
        setPokemons(pokemons)
      
    }
     catch (error) {
      console.log(error)
    }
    }

    getPokemons()

  }, [])

  return (
    <div>
      <h1>All Pokemons</h1>

      {pokemons.map((pokemon) => 
        <div key={pokemon._id}>
          <h3>Name: {pokemon.name}</h3>
        </div>
      )}
    </div>
  )
}

export default Pokemon