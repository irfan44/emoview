import { useEffect, useState } from 'react';
import { Button, Dropdown, Layout, Menu, theme } from 'antd';
import { HiChevronDown, HiMenu, HiOutlineLogout, HiX } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import menuItems from '../../data/menuItems';
import emoviewLogo from '../../assets/icon.png';
import Style from '../../styles/header.module.css';

const { Content, Header, Sider } = Layout;

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
      label: (
        <a
          className="flex items-center space-x-2"
          onClick={() => window.electronAPI.logOut()}
        >
          <HiOutlineLogout />
          <span>Logout</span>
        </a>
      ),
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
          borderBottom: '1px solid #e6e6e6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            aria-label="Menu"
            onClick={() => setCollapsed(!collapsed)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {collapsed ? (
              <HiMenu style={{ fontSize: '18px' }} />
            ) : (
              <HiX style={{ fontSize: '18px' }} />
            )}
          </Button>
          <img
            src={emoviewLogo}
            alt="Emoview"
            width="30"
            height="30"
            style={{ marginLeft: '16px' }}
          />
          <span className="font-bold text-xl ml-2">Emoview</span>
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
              <a
                className="text-black/[.60] hover:text-black"
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={user.picture}
                    alt="Profile Picture"
                    style={{ borderRadius: '50%' }}
                    height="30"
                    width="30"
                    referrerPolicy="no-referrer"
                  />
                  <span>{user.nickname}</span>
                  <span>
                    <HiChevronDown style={{ paddingTop: '4px' }} />
                  </span>
                </div>
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
            borderRight: '1px solid #d9d9d9',
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
