import axios from 'axios';

const baseURL = import.meta.env.VITE_BE_ENDPOINT;

const getMeeting = async () => {
  try {
    const response = await axios.get(`${baseURL}/meeting`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getMeetingById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/meeting/${id}`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getMeetingParticipants = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/meeting/${id}`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data.participants;
  } catch (error) {
    console.log(error);
  }
};

const countMeeting = async () => {
  try {
    const response = await axios(`${baseURL}/meeting/count`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const createMeeting = async (
  name,
  subject,
  description,
  link,
  code,
  size,
  emotionDisplay
) => {
  const body = {
    name: name,
    subject: subject,
    description: description,
    link: link,
    code: code,
    configuration: {
      size: size,
      emotionDisplay: emotionDisplay,
    },
  };

  try {
    const response = await axios.post(`${baseURL}/meeting`, body, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateMeeting = async (
  id,
  name,
  subject,
  description,
  link,
  code,
  size,
  emotionDisplay
) => {
  const body = {
    name: name,
    subject: subject,
    description: description,
    link: link,
    code: code,
    configuration: {
      size: size,
      emotionDisplay: emotionDisplay,
    },
  };

  try {
    const response = await axios.patch(`${baseURL}/meeting/${id}`, body, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const setMeetingStatus = async (id, statusStart, statusEnd) => {
  const body = {
    isStart: statusStart,
    isEnded: statusEnd,
    startedAt: new Date(Date.now()).toISOString(),
  };

  try {
    const response = await axios.patch(`${baseURL}/meeting/${id}`, body, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const startRecognition = async (code) => {
  try {
    const response = await axios.patch(
      `${baseURL}/meeting/start/${code}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const stopRecognition = async (code) => {
  try {
    const response = await axios.patch(
      `${baseURL}/meeting/stop/${code}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const removeMeeting = async (id) => {
  try {
    await axios.delete(`${baseURL}/meeting/${id}`, {
      headers: {
        Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getMeeting,
  getMeetingById,
  getMeetingParticipants,
  countMeeting,
  createMeeting,
  updateMeeting,
  setMeetingStatus,
  startRecognition,
  stopRecognition,
  removeMeeting,
};
