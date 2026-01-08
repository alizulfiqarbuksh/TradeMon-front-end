import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import * as pokemonService from '../../services/pokemonService'
import TestImageUpload from '../TestImageUpload/TestImageUpload';

import styles from './PokemonForm.module.css'

function PokemonForm({user, updatePokemonList, pokemonToUpdate, updateOnePokemon}) {

  const [formData, setFormData] = useState( pokemonToUpdate ? pokemonToUpdate
    :
    {
            name: "",
            type: "",
            level: 0,
            shiny: false,
            owner: "",
            image: "",
  })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {...formData, owner: user._id}
    console.log(payload)

    if (pokemonToUpdate) {

      try {

        const updatedPokemon = await pokemonService.update(pokemonToUpdate._id, payload)

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
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          {pokemonToUpdate ? 'Update Pokémon' : 'Add New Pokémon'}
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>

          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label className={styles.label}>Type</label>
          <input
            className={styles.input}
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />

          <label className={styles.label}>Level</label>
          <input
            className={styles.input}
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
          />

          <div className={styles.checkboxRow}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="shiny"
              checked={formData.shiny}
              onChange={handleChange}
            />
            <label className={styles.label}>Shiny</label>
          </div>

          <TestImageUpload
            onUpload={(url) =>
              setFormData(prev => ({ ...prev, image: url }))
            }
          />

          <button type="submit" className={styles.button}>
            {pokemonToUpdate ? 'Update Card' : 'Create Card'}
          </button>

        </form>

        {formData.image && (
          <div className={styles.preview}>
            <img src={formData.image} alt="Preview" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonForm