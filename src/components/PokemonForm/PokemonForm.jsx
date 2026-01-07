import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import * as pokemonService from '../../services/pokemonService'

function PokemonForm({user, updatePokemonList, pokemonToUpdate, updateOnePokemon}) {

  const [formData, setFormData] = useState( pokemonToUpdate ? pokemonToUpdate
    :
    {
            name: "",
            type: "",
            level: 0,
            shiny: false,
            owner: "",
  })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {...formData, owner: user._id}
    console.log(payload)

    if (pokemonToUpdate) {

      try {

        const updatedPokemon = await pokemonService.update(pokemonToUpdate._id, formData)

        if (updatedPokemon) {
          updateOnePokemon(updatedPokemon)
          navigate('/pokemon/mycards')
        }
        else {
          console.log("something went wrong")
        }
        
      } catch (error) {
        console.log(error)
      }

    }
    else {
        try {

        const pokemon = await pokemonService.create(payload)

        if (pokemon) {
          updatePokemonList(pokemon)
          navigate('/pokemon')
        } else {
          console.log("something went wrong")
        }
        
      } catch (error) {
        console.log(error)
      }
    }

  }

  const handleChange = (event) => {
    const {name, value, checked, type} = event.target
    setFormData({...formData, [name]: type === 'checkbox' ? checked : value})
    console.log(formData)
  }

  return (
    <div>
      <h1>Add new card</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name: </label>
        <input type="text" id='name' name='name' onChange={handleChange} value={formData.name} />

        <label htmlFor="type">Type: </label>
        <input type="text" id='type' name='type' onChange={handleChange} value={formData.type} />

        <label htmlFor="level">Level: </label>
        <input type="number" name="level" id="level" onChange={handleChange} value={formData.level} />

        <label htmlFor="shiny">Shiny: </label>
        <input type="checkbox" name="shiny" id="shiny" onChange={handleChange} checked={formData.shiny} />
        
        <button type="submit">Submit</button>

      </form>

    </div>
  )
}

export default PokemonForm