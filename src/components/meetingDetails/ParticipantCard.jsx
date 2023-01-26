import { Card } from 'antd';
import { Link } from 'react-router-dom';
import CardTitle from '../common/typography/CardTitle';
import Subtitle from '../common/typography/Subtitle';

const ParticipantCard = ({ id, data }) => {
  return (
    <Link to={`/meeting/${id}/${data.userId}`}>
      <Card
        hoverable
        style={{ cursor: 'pointer', width: '100%', height: '100%' }}
        bodyStyle={{ padding: '20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '12px' }}>
            <img
              src={data.picture}
              alt={data.userId}
              style={{ borderRadius: '50%' }}
              height="36"
              referrerPolicy="no-referrer"
            />
          </div>
          <div style={{ width: '80%' }}>
            <CardTitle>{data.fullname}</CardTitle>
            <Subtitle>{data.email}</Subtitle>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ParticipantCard;
