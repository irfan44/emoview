import axios from 'axios';

const baseURL = import.meta.env.VITE_BE_ENDPOINT;

const getMeetingById = async (id, accessToken) => {
  try {
    const response = await axios.get(`${baseURL}/meeting/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getRecognition = async (id, limit, accessToken) => {
  try {
    const response = await axios.get(
      `${baseURL}/recognition/${id}?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { getMeetingById, getRecognition };
