import { Tooltip } from 'antd';
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
        <div className="flex items-center space-x-2">
          <span>Recognition</span>
          {recognitionStatus && (
            <Tooltip title="Enable/disable emotion recognition" placement="top">
              <Switch defaultChecked onChange={handleSwitch} />
            </Tooltip>
          )}
          {!recognitionStatus && (
            <Tooltip title="Enable/disable emotion recognition" placement="top">
              <Switch onChange={handleSwitch} />
            </Tooltip>
          )}
        </div>
      )}
    </>
  );
};

export default RecognitionSwitch;
