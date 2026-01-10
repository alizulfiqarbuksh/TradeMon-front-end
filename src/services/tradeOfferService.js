import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tradeOffer`;

const getToken = () => localStorage.getItem('token');

const show = async () => {
  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data.tradeOffers;
};


const create = async (tradeOffer) => {
    try {
        
        const response = await axios.post(`${BASE_URL}`, tradeOffer, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
        return response.data.trade
    } catch (error) {
        console.log(error)
    }
}


const respond = async (id, action) => {
  const response = await axios.put(
    `${BASE_URL}/${id}/respond`,
    { action },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return response.data.trade;
};

export {
  show, 
  create,
  respond,
}