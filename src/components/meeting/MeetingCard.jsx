import { Col, Dropdown, Row, Space } from 'antd';
import { Card, Typography } from 'antd';
import { FaRegCalendar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import convertTimezone from '../../helpers/convertTimezone';

const { Text, Title, Paragraph } = Typography;

const MeetingCard = ({ data }) => {
  const startedAt = convertTimezone(data.startedAt).format('D MMM YYYY, H:mm');

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meeting-details`);
    sessionStorage.setItem('meeting-details:id', data._id);
  };

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      onClick={() => handleClick()}
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
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginBottom: "8px", width: "80%" }}>
          <Title level={5} ellipsis style={{ marginBottom: 0 }}>
            {data.name}
          </Title>
          <Text type="secondary">{data.subject}</Text>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>Hover me</Space>
            </a>
          </Dropdown>
        </div>
      </div> */}
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
  );
};

export default MeetingCard;
