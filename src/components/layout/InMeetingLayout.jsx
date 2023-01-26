import { Button, theme } from 'antd';
import { VscChromeClose } from 'react-icons/vsc';
import Style from '../../styles/floatingWin.module.css';
import CardTitle from '../common/typography/CardTitle';

const { useToken } = theme;

const InMeetingLayout = ({ children }) => {
  const { token } = useToken();

  return (
    <div
      className={Style.floatingWindow}
      style={{ backgroundColor: token.colorBgLayout, borderRadius: '8px' }}
    >
      <div className="flex items-center justify-between pl-3 border-0 border-b-[0.5px] border-[#d9d9d9] border-solid">
        <CardTitle>In Meeting Display</CardTitle>
        <div className="flex items-center">
          <div id="titlebar-close">
            <Button
              type="text"
              size="large"
              onClick={async () => await window.electronAPI.closeFloating()}
            >
              <VscChromeClose />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-3 min-h-full w-full">{children}</div>
    </div>
  );
};

export default InMeetingLayout;
