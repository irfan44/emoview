import { Link } from 'react-router-dom';
import { Card } from 'antd';
import CardTitle from '../typography/CardTitle.jsx';
import Subtitle from '../typography/Subtitle.jsx';

const ClassCard = ({ data, currentMenu, meetCode }) => {
  const setSubtitle = () => {
    switch (data.countOfMeetings) {
      case 0:
        return `No Meeting`;
      case 1:
        return `${data.countOfMeetings}  Meeting`;
      default:
        return `${data.countOfMeetings}  Meetings`;
    }
  };

  return (
    <Link to={`/${currentMenu}/${meetCode}`}>
      <Card hoverable bodyStyle={{ padding: '16px 24px' }}>
        <div className="space-y-4">
          <div>
            <CardTitle>{data.name}</CardTitle>
            <Subtitle>{setSubtitle()}</Subtitle>
          </div>
          <div>
            <p className="m-0">Details {'>'}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ClassCard;
