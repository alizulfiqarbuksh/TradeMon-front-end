import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pokemon`;

const show = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data.pokemons
    
  } catch (error) {
    console.log(error)
  }
}


const myPokemons = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${BASE_URL}/my-pokemons`,{headers: {Authorization: `Bearer ${token}`}})
    return response.data.pokemons
    
  } catch (error) {
    console.log(error)
  }
}

const details = async (id) => {
  try {

    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data.pokemon
    
  } catch (error) {
    console.log(error)
  }
}

const create = async (pokemon) => {
  try {

    const response = await axios.post(BASE_URL, pokemon)
    return response.data.pokemon
    
  } catch (error) {
    console.log(error)
  }
}

const deleteOne = async (id) => {
  try{
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${BASE_URL}/${id}`,{headers: {Authorization: `Bearer ${token}`}})
  return response.data.pokemon
} catch(error){
   console.log(error)
}
  
}

const update = async (id, pokemon) => {
  try{
  const response = await axios.put(`${BASE_URL}/${id}`, pokemon)
  return response.data.pokemon
}catch(error){
  console.log(error)
}
  
}

export {
  show,
  details,
  create,
  deleteOne,
  update,
  myPokemons
}