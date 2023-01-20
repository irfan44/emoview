import { Space, Switch, Typography } from 'antd';

const { Text } = Typography;

const RecognitionSwitch = ({
  isStart,
  isEnded,
  recognitionStatus,
  handleSwitch,
}) => {
  return (
    <>
      {!isEnded && isStart && (
        <Space>
          <Text>Recognition : </Text>
          {recognitionStatus && (
            <Switch
              defaultChecked
              checkedChildren="Start"
              unCheckedChildren="Stop"
              onChange={handleSwitch}
            />
          )}
          {!recognitionStatus && (
            <Switch
              checkedChildren="Start"
              unCheckedChildren="Stop"
              onChange={handleSwitch}
            />
          )}
        </Space>
      )}
    </>
  );
};

export default RecognitionSwitch;
