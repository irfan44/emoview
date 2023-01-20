import { Col, Dropdown, Row, Space } from 'antd';
import { Card, Typography } from 'antd';
import { FaRegCalendar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import convertTimezone from '../../helpers/convertTimezone';

const { Text, Title, Paragraph } = Typography;

const MeetingCard = ({ data }) => {
  const startedAt = convertTimezone(data.startedAt).format('D MMM YYYY, H:mm');

  return (
    <Link to={`meeting/${data._id}`}>
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
            <Text>{startedAt}</Text>
          ) : (
            <Text type="secondary">Not Started</Text>
          )}
        </Space>
      </Card>
    </Link>
  );
};

export default MeetingCard;
