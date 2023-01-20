import { Progress, Space, Typography } from 'antd';

const { Text } = Typography;

const DisplayData = ({ emotionDisplay, data, title }) => {
  return (
    <Space direction="vertical" align="center">
      <Progress
        type={emotionDisplay}
        percent={Math.floor(data * 100)}
        width={56}
      />
      <Text>{title}</Text>
    </Space>
  );
};

export default DisplayData;
