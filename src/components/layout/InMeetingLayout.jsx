import { Button, theme } from 'antd';
import { useEffect, useState } from 'react';
import { TbLayoutDashboard } from 'react-icons/tb';
import { VscChromeClose } from 'react-icons/vsc';
import Style from '../../styles/floatingWin.module.css';
import CardTitle from '../common/typography/CardTitle';

const { useToken } = theme;

const InMeetingLayout = ({ children, changeLayout }) => {
  const [isElectron, setIsElectron] = useState(false);

  const { token } = useToken();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('electron/') > -1) {
      setIsElectron(true);
    } else {
      setIsElectron(false);
    }
  }, []);

  return (
    <div
      className={Style.floatingWindow}
      style={{ backgroundColor: token.colorBgLayout, borderRadius: '8px' }}
    >
      <div className="flex items-center justify-between pl-3 border-0 border-b-[0.5px] border-[#d9d9d9] border-solid">
        <CardTitle>Floating Display</CardTitle>
        <div className="flex items-center">
          <div>
            <Button type="text" onClick={changeLayout}>
              <TbLayoutDashboard className="text-lg" />
            </Button>
          </div>
          <div id="titlebar-close">
            {isElectron && (
              <Button
                type="text"
                size="large"
                onClick={async () => await window.electronAPI.closeFloating()}
              >
                <VscChromeClose />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="p-3 min-h-full w-full">{children}</div>
    </div>
  );
};

export default InMeetingLayout;
