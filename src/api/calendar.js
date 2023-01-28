import axios from 'axios';

let accessToken = sessionStorage.getItem('calendar:accessToken');

const createEvent = async (name, subject, description, date) => {
  const body = {
    summary: `${name} | ${subject}`,
    description: description,
    end: {
      dateTime: `${date}:00+07:00`,
    },
    start: {
      dateTime: `${date}:00+07:00`,
    },
    conferenceData: {
      createRequest: {
        requestId: 'emoview1234',
      },
    },
  };

  try {
    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { createEvent };
