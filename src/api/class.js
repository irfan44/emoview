import axios from 'axios';

const baseURL = import.meta.env.VITE_BE_ENDPOINT;

const getClassList = async () => {
  try {
    const response = await axios.get(`${baseURL}/class`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getClassDetailByMeetCode = async ({ meetCode }) => {
  try {
    const response = await axios.get(`${baseURL}/class/${meetCode}`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const createClass = async ({ meetCode, name, description, link }) => {
  const body = {
    meetCode: meetCode,
    name: name,
    description: description,
    link: link,
  };

  try {
    const response = await axios.post(`${baseURL}/class`, body, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateClass = async ({ meetCode, name, description }) => {
  const body = {
    name: name,
    description: description,
  };

  try {
    const response = await axios.patch(`${baseURL}/class/${meetCode}`, body, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const removeClass = async (id) => {
  try {
    await axios.delete(`${baseURL}/class/${id}`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getClassList,
  getClassDetailByMeetCode,
  createClass,
  updateClass,
  removeClass,
};
