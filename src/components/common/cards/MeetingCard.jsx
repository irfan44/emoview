import { Card } from 'antd';
import { FaRegCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CardTitle from '../typography/CardTitle.jsx';
import Subtitle from '../typography/Subtitle.jsx';

const MeetingCard = ({ data, page }) => {
  return (
    <Link to={`/${page}/${data.meetCode}/${data.emoviewCode}`}>
      <Card hoverable bodyStyle={{ padding: '16px 24px' }}>
        <div className="space-y-4">
          <div>
            <CardTitle>{data.name}</CardTitle>
            <Subtitle>{data.subject}</Subtitle>
          </div>
          <div className="flex items-center space-x-2">
            <FaRegCalendar size={12} />
            {data.isStart ? (
              <span>{new Date(data.startedAt).toLocaleString('en-GB')}</span>
            ) : (
              <span>Not Started</span>
            )}
          </div>
          <div>
            <p className="m-0">Details {'>'}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MeetingCard;
