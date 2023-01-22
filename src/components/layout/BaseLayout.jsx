import { useEffect, useState } from 'react';
import { Button, Dropdown, Layout, Menu, Space, theme, Typography } from 'antd';
import { HiChevronDown, HiMenu, HiX } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import menuItems from '../../data/menuItems';
import emoviewLogo from '../../assets/icon.png';
import Style from '../../styles/header.module.css';

const { Content, Header, Sider } = Layout;
const { Text } = Typography;

const { useToken } = theme;

const BaseLayout = ({ children }) => {
  const [user, setUser] = useState();
  const [collapsed, setCollapsed] = useState(true);

  const router = useLocation();
  const selectedLocation = router.pathname;

  const { token } = useToken();

  const items = [
    {
      key: '1',
      label: <a onClick={() => window.electronAPI.logOut()}>Logout</a>,
    },
  ];

  const getProfile = async () => {
    setUser(await window.electronAPI.getProfile());
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className={Style.header}
        style={{
          backgroundColor: token.colorBgLayout,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '12px',
          height: '64px',
          borderBottom: '0.5px solid #d9d9d9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {collapsed ? (
              <HiMenu style={{ fontSize: '18px' }} />
            ) : (
              <HiX style={{ fontSize: '18px' }} />
            )}
          </Button>
          <img src={emoviewLogo} width="30" style={{ marginLeft: '16px' }} />
          <Text
            style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '8px' }}
          >
            Emoview
          </Text>
        </div>
        {user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '132px',
            }}
          >
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space size="small" align="center">
                  <img
                    src={user.picture}
                    style={{ borderRadius: '50%' }}
                    height="30"
                    referrerPolicy="no-referrer"
                  />
                  <Text>{user.nickname}</Text>
                  <Text>
                    <HiChevronDown style={{ paddingTop: '4px' }} />
                  </Text>
                </Space>
              </a>
            </Dropdown>
          </div>
        )}
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          style={{
            paddingBottom: '4px',
            backgroundColor: token.colorBgLayout,
            borderRight: '0.5px solid #d9d9d9',
          }}
        >
          <Menu
            items={menuItems}
            defaultSelectedKeys={['1']}
            selectedKeys={[selectedLocation]}
            mode="inline"
            theme="light"
            style={{
              border: 0,
              backgroundColor: 'transparent',
            }}
          />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
