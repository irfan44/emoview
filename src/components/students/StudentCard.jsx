import { Card } from 'antd';
import { Link } from 'react-router-dom';
import CardTitle from '../common/typography/CardTitle';
import Subtitle from '../common/typography/Subtitle';

const StudentCard = ({ data }) => {
  return (
    <Link to={`/students/${data._id}`}>
      <Card hoverable bodyStyle={{ padding: '16px 24px' }}>
        <div className="space-y-2">
          <img
            src={data.picture}
            alt={data.userId}
            style={{ borderRadius: '50%' }}
            height="36"
            referrerPolicy="no-referrer"
          />
          <div>
            <CardTitle>{data.fullname}</CardTitle>
            <Subtitle>{data.email}</Subtitle>
          </div>
          <div>
            <span>View Emotion {'>'}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StudentCard;
