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
            <Switch defaultChecked onChange={handleSwitch} />
          )}
          {!recognitionStatus && <Switch onChange={handleSwitch} />}
        </div>
      )}
    </>
  );
};

export default RecognitionSwitch;
