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
          <Title level={5} ellipsis style={{ marginBottom: 0 }}>
            {data.name}
          </Title>
          <Text type="secondary" ellipsis style={{ marginBottom: 0 }}>
            {data.subject}
          </Text>
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
          <Space align="center">
            <FaRegCalendar size={12} />
            {data.isStart ? (
              <Text>{new Date(data.startedAt).toLocaleString('en-GB')}</Text>
            ) : (
              <Text type="secondary">Not Started</Text>
            )}
          </Space>
        </div>
      </Card>
    </Link>
  );
};

export default MeetingCard;
