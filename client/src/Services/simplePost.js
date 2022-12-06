import axios from 'axios';

export const simplePost = async (url, values) => {
  try {
    const response = await axios.post(url,values)
    return response
  } catch (err) {
    console.log(err)
  }
}