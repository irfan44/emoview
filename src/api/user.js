import axios from 'axios';

const baseURL = import.meta.env.VITE_BE_ENDPOINT;

const createUser = async (
  nickname,
  name,
  sub,
  email,
  picture,
  userId,
  role
) => {
  console.log(userId, role);
  try {
    const body = {
      name: nickname,
      fullname: name,
      authId: sub,
      email: email,
      picture: picture,
      userId: userId,
      role: role[0],
    };
    const response = await axios.post(`${baseURL}/user`, body, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { createUser };
