import { Card, Space, Typography } from 'antd';
import { FaRegCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const { Text, Title, Paragraph } = Typography;

const MeetingCard = ({ data }) => {
  return (
    <Link to={`/meeting/${data._id}`}>
      <Card
        hoverable
        style={{ height: '100%' }}
        title={
          <div>
            <Title level={5} ellipsis style={{ marginBottom: 0 }}>
              {data.name}
            </Title>
            <Text type="secondary" ellipsis style={{ marginBottom: 0 }}>
              {data.subject}
            </Text>
          </div>
        }
        headStyle={{ borderBottom: 0, paddingTop: '16px' }}
        bodyStyle={{ paddingTop: '8px', paddingBottom: '16px' }}
      >
        <Paragraph ellipsis={{ rows: 2 }}>{data.description}</Paragraph>
        <Space align="center">
          <FaRegCalendar size={12} />
          {data.isStart ? (
            <Text>{new Date(data.startedAt).toLocaleString('en-GB')}</Text>
          ) : (
            <Text type="secondary">Not Started</Text>
          )}
        </Space>
      </Card>
    </Link>
  );
};

export default MeetingCard;
