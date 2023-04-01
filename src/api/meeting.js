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

const getClassMeetings = async ({ meetCode }) => {
  try {
    const response = await axios.get(`${baseURL}/meeting/class/${meetCode}`, {
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

const getMeetingByEmoviewCode = async ({ emoviewCode }) => {
  try {
    const response = await axios.get(
      `${baseURL}/meeting/class/meeting/${emoviewCode}`,
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

const getMeetingParticipants = async ({ emoviewCode }) => {
  try {
    const response = await axios.get(
      `${baseURL}/meeting/class/meeting/${emoviewCode}`,
      {
        headers: {
          Authorization: `Bearer ${await window.electronAPI.getAccessToken()}`,
        },
      }
    );
    return response.data.data[0].participants;
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

const createMeeting = async ({
  name,
  subject,
  description,
  link,
  meetCode,
  countOfMeetings,
}) => {
  const body = {
    name: name,
    subject: subject,
    description: description,
    link: link,
    meetCode: meetCode,
    countOfMeetings: countOfMeetings + 1,
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

const updateMeeting = async ({ emoviewCode, name, description }) => {
  const body = {
    name: name,
    description: description,
  };

  try {
    const response = await axios.patch(
      `${baseURL}/meeting/class/meeting/${emoviewCode}`,
      body,
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

const setMeetingStatus = async ({ emoviewCode, statusStart, statusEnd }) => {
  const body = {
    isStart: statusStart,
    isEnded: statusEnd,
    startedAt: new Date(Date.now()).toISOString(),
  };

  try {
    const response = await axios.patch(
      `${baseURL}/meeting/class/meeting/${emoviewCode}`,
      body,
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

const startRecognition = async (emoviewCode) => {
  try {
    const response = await axios.patch(
      `${baseURL}/meeting/start/${emoviewCode}`,
      { status: 'started' },
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
      `${baseURL}/meeting/start/${code}`,
      { status: 'stopped' },
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

const removeMeeting = async ({ emoviewCode }) => {
  try {
    await axios.delete(`${baseURL}/meeting/class/meeting/${emoviewCode}`, {
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
  getClassMeetings,
  getMeetingByEmoviewCode,
  getMeetingParticipants,
  countMeeting,
  createMeeting,
  updateMeeting,
  setMeetingStatus,
  startRecognition,
  stopRecognition,
  removeMeeting,
};
