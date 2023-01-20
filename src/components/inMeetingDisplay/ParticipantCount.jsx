import { Space, Typography } from 'antd';
import { FaUser } from 'react-icons/fa';

const { Text } = Typography;

const ParticipantCount = ({ countParticipants }) => {
  return (
    <Space>
      <FaUser />
      <Text>{countParticipants}</Text>
    </Space>
  );
};

export default ParticipantCount;
