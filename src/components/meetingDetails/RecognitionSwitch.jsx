import { Tooltip } from 'antd';
import { Switch } from 'antd';

const RecognitionSwitch = ({
  recognitionSwitchRef,

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
              <Switch
                ref={recognitionSwitchRef}
                defaultChecked
                onChange={handleSwitch}
              />
            </Tooltip>
          )}
          {!recognitionStatus && (
            <Tooltip title="Enable/disable emotion recognition" placement="top">
              <Switch ref={recognitionSwitchRef} onChange={handleSwitch} />
            </Tooltip>
          )}
        </div>
      )}
    </>
  );
};

export default RecognitionSwitch;
