import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pokemon`;

const show = async () => {
  const response = await axios.get(BASE_URL)
  return response.data.pokemons
}

export {
  show,
}