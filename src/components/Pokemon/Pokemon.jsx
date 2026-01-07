import React, { useEffect, useState } from 'react'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'

function Pokemon({pokemons}) {

  const navigate = useNavigate()

  return (
    <div>
      <h1>All Pokemons</h1>

      {pokemons.map((pokemon) => 
        <div key={pokemon._id}>
          <div>{pokemon.image && ( <img src={pokemon.image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} /> )}</div>
          <h3>Name: {pokemon.name}</h3>
          <p>Name: {pokemon.name}</p>
          <button onClick={() => navigate(`/pokemon/${pokemon._id}`)} >Details</button>
        </div>
      )}
    </div>
  )
}

export default Pokemon