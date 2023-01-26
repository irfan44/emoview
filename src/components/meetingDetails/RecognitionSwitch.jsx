import { Switch } from 'antd';
import Subtitle from '../common/typography/Subtitle';

const RecognitionSwitch = ({
  isStart,
  isEnded,
  recognitionStatus,
  handleSwitch,
}) => {
  return (
    <>
      {!isEnded && isStart && (
        <div className="flex space-x-2">
          <Subtitle>Recognition : </Subtitle>
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
        </div>
      )}
    </>
  );
};

export default RecognitionSwitch;
