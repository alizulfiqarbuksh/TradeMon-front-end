import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as pokemonService from '../../services/pokemonService'
import TestImageUpload from '../TestImageUpload/TestImageUpload'

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
        navigate('/pokemon')
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

        <TestImageUpload onUpload={(url) => setFormData((formData) => ({ ...formData, image: url }))} />
        
        <button type="submit">Submit</button>

      </form>

      {formData.image && ( <img src={formData.image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} /> )}

    </div>
  )
}

export default PokemonForm
