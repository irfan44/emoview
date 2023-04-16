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
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserByUserId = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/user/userId/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserOverview = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/user/${userId}/overview`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserSummary = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/user/${userId}/summary`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserStudent = async () => {
  try {
    const response = await axios.get(`${baseURL}/user?role=student`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserSameMeeting = async ({ emoviewCode }) => {
  try {
    const response = await axios.get(
      `${baseURL}/user/same-meeting/${emoviewCode}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserStudentAtMeeting = async (meetingCode) => {
  try {
    const response = await axios.get(
      `${baseURL}/user?role=student&meetingId=${meetingCode}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createUser,
  getUserById,
  getUserByUserId,
  getUserOverview,
  getUserSummary,
  getUserStudent,
  getUserSameMeeting,
  getUserStudentAtMeeting,
};
