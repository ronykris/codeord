import axios from 'axios'

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.hiro.so/ordinals/v1/inscriptions?recursive=true&limit=1',
  headers: { 
    'Accept': 'application/json'
  }
};

const getOrdinals = async() => {
    const ords = await axios.request(config)
    console.log(ords.data)
}

getOrdinals()

