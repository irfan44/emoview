import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

const convertTimezone = (datetime) => {
  const convertedDateTime = dayjs.utc(datetime).tz('Asia/Jakarta');
  return convertedDateTime;
};

export default convertTimezone;
