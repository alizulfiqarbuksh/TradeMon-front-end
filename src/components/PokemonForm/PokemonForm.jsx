import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as pokemonService from '../../services/pokemonService'
import TestImageUpload from '../TestImageUpload/TestImageUpload'

import styles from './PokemonForm.module.css'

function PokemonForm({ user, updatePokemonList, updateOnePokemon }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    level: 0,
    shiny: false,
    image: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isEdit) {
      setLoading(false)
      return
    }

    const fetchPokemon = async () => {
      try {
        const pokemon = await pokemonService.details(id)
        setFormData(pokemon)
        setLoading(false)
      } catch (err) {
        console.log(err)
        navigate('/pokemon/mycards', { replace: true })
      }
    }

    fetchPokemon()
  }, [id, isEdit, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = { ...formData, owner: user._id }

    try {
      if (isEdit) {
        const updated = await pokemonService.update(id, payload)
        updateOnePokemon(updated)
        navigate('/pokemon/mycards')
      } else {
        const created = await pokemonService.create(payload)
        updatePokemonList(created)
        navigate('/pokemon/mycards')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  if (!user) return <p>Please sign in</p>
  if (loading) return <p>Loading...</p>

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
