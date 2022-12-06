import axios from 'axios';

export const simpleGet = async (url) => {
  try {
    const response = await axios.get(url)
    return response
  } catch (err) {
    console.log(err)
  }
}