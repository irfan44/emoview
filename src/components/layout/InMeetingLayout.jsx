import { Button, Typography, theme } from 'antd';
import { VscChromeClose } from 'react-icons/vsc';
import Style from '../../styles/floatingWin.module.css';
// import { ipcRenderer } from "electron";

const { Title } = Typography;
const { useToken } = theme;

const InMeetingLayout = ({ children }) => {
  const { token } = useToken();

  return (
    <div
      className={Style.floatingWindow}
      style={{ backgroundColor: token.colorBgLayout, borderRadius: '8px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '12px',
          borderBottom: '0.5px solid #d9d9d9',
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          In Meeting Display
        </Title>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
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
      <div style={{ padding: '12px', minHeight: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default InMeetingLayout;
