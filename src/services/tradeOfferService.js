import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tradeOffer`;

const show = async () => {
  const response = await axios.get(BASE_URL)
  return response.data.tradeOffers
}

const details = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data.trade
}

const create = async (tradeOffer) => {
    try {
        
        const response = await axios.post(`${BASE_URL}`, tradeOffer)
        return response.data.trade
    } catch (error) {
        console.log(error)
    }
}

const deleteOne = async(id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return response.data.trade
}

const update = async(tradeOffer, id) => {
    const response = await axios.put(`${BASE_URL}/${id}`, tradeOffer)
    console.log(response)
    return response.data.trade
}

export {
  show,
  details,
  create,
  deleteOne,
  update,
}