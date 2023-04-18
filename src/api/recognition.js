import axios from 'axios';
import isElectron from '../utils/isElectron.js';

const baseURL = import.meta.env.VITE_BE_ENDPOINT;

const getRecognition = async (id, limit) => {
  try {
    const response = await axios.get(
      `${baseURL}/recognition/${id}?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${
            !isElectron()
              ? localStorage.getItem('accessToken')
              : await window.electronAPI.getAccessToken()
          }`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getRecognitionById = async (emoviewCode, userId, limit) => {
  try {
    const response = await axios.get(
      `${baseURL}/recognition/${emoviewCode}/${userId}?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${
            !isElectron()
              ? localStorage.getItem('accessToken')
              : await window.electronAPI.getAccessToken()
          }`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getRecognitionByIds = async (emoviewCode, userIds, limit) => {
  try {
    const body = { ids: userIds };
    const response = await axios.post(
      `${baseURL}/recognition/reports/${emoviewCode}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${
            !isElectron()
              ? localStorage.getItem('accessToken')
              : await window.electronAPI.getAccessToken()
          }`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getOverview = async () => {
  try {
    const response = await axios.get(`${baseURL}/recognition/overview`, {
      headers: {
        Authorization: `Bearer ${
          !isElectron()
            ? localStorage.getItem('accessToken')
            : await window.electronAPI.getAccessToken()
        }`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getSummary = async () => {
  try {
    const response = await axios.get(`${baseURL}/recognition/summary`, {
      headers: {
        Authorization: `Bearer ${
          !isElectron()
            ? localStorage.getItem('accessToken')
            : await window.electronAPI.getAccessToken()
        }`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getArchive = async (ids) => {
  const body = {
    ids: ids,
  };

  try {
    const response = await axios.post(`${baseURL}/recognition/archive`, body, {
      headers: {
        Authorization: `Bearer ${
          !isElectron()
            ? localStorage.getItem('accessToken')
            : await window.electronAPI.getAccessToken()
        }`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const createRecognition = async () => {
  try {
    const response = await axios.post(`${baseURL}/recognition/`, {
      headers: {
        Authorization: `Bearer ${
          !isElectron()
            ? localStorage.getItem('accessToken')
            : await window.electronAPI.getAccessToken()
        }`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const removeRecognition = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/recognition/${id}`, {
      headers: {
        Authorization: `Bearer ${
          !isElectron()
            ? localStorage.getItem('accessToken')
            : await window.electronAPI.getAccessToken()
        }`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getRecognition,
  getRecognitionById,
  getRecognitionByIds,
  getOverview,
  getSummary,
  getArchive,
  createRecognition,
  removeRecognition,
};
