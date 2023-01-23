import { Card, Typography } from 'antd';
import { FaRegCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CardTitle from '../common/typography/CardTitle';
import Subtitle from '../common/typography/Subtitle';

const { Paragraph } = Typography;

const MeetingCard = ({ data }) => {
  return (
    <Link to={`/meeting/${data._id}`}>
      <Card
        hoverable
        style={{ height: '100%' }}
        headStyle={{ borderBottom: 0, paddingTop: '16px' }}
        bodyStyle={{
          paddingTop: '16px',
          paddingBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <CardTitle>{data.name}</CardTitle>
          <Subtitle>{data.subject}</Subtitle>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <Paragraph ellipsis={{ rows: 2 }}>{data.description}</Paragraph>
          <div className="flex items-center space-x-2">
            <FaRegCalendar size={12} />
            {data.isStart ? (
              <Subtitle>
                {new Date(data.startedAt).toLocaleString('en-GB')}
              </Subtitle>
            ) : (
              <Subtitle>Not Started</Subtitle>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MeetingCard;
