import { Card } from 'antd';
import { Link } from 'react-router-dom';
import CardTitle from '../typography/CardTitle.jsx';
import Subtitle from '../typography/Subtitle.jsx';

const StudentCard = ({ data, currentMenu, pageId, studentId }) => {
  const targetLink = () => {
    if (pageId) {
      return `/${currentMenu}/${pageId}/${studentId}`;
    }
    return `/${currentMenu}/${studentId}`;
  };

  console.log(targetLink());

  return (
    <Link to={targetLink()}>
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
