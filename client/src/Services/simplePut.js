import axios from 'axios';

export const simplePut = async (url, values) => {
  try {
    const response = await axios.put(url,values)
    return response
  } catch (err) {
    console.log(err)
  }
}