import { useEffect, useState } from 'react';
import { Button, Dropdown, Layout, Menu, Spin, theme } from 'antd';
import { HiChevronDown, HiMenu, HiOutlineLogout, HiX } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import menuItems from '../../data/menuItems';
import emoviewLogo from '../../assets/icon.png';
import Style from '../../styles/header.module.css';
import GetExtension from '../extension/GetExtension';
import EmptyHolder from '../placeholders/EmptyHolder';
import ArchiveModal from '../meeting/ArchiveModal';
import LoginButton from '../auth/LoginButton.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileDropdown from '../auth/ProfileDropdown.jsx';
import PageLoading from '../loading/PageLoading.jsx';
import isElectron from '../../utils/isElectron.js';

const { Content, Header, Sider } = Layout;

const { useToken } = theme;

const BaseLayout = ({ children }) => {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  const [collapsed, setCollapsed] = useState(true);
  const [userProfile, setUserProfile] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useLocation();
  const selectedLocation = router.pathname;

  const { token } = useToken();

  const items = [
    {
      key: '1',
      label: <ArchiveModal />,
    },
    {
      key: '2',
      label: <GetExtension />,
    },
    {
      key: '3',
      label: (
        <a
          className="flex items-center space-x-2"
          onClick={() => handleLogout()}
        >
          <HiOutlineLogout />
          <span className="text-red-700">Logout</span>
        </a>
      ),
    },
  ];

  const handleLogout = () => {
    if (!isElectron()) {
      logout({
        logoutParams: {
          returnTo: import.meta.env.VITE_APP_ROOT_URL,
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    } else {
      window.electronAPI.logOut();
    }
  };

  const getProfile = async () => {
    if (!isElectron()) {
      if (isAuthenticated) {
        setUserProfile(user);
        const { [`https://customclaim.com/role`]: role } = user;
        setRole(role[0]);
      }
    } else {
      const profile = await window.electronAPI.getProfile();
      setUserProfile(profile);
      const { [`https://customclaim.com/role`]: role } = profile;
      setRole(role[0]);
    }
  };

  const setContent = (children) => {
    if (!isElectron()) {
      return isLoading ? (
        <PageLoading />
      ) : role === 'teacher' ? (
        children
      ) : !isAuthenticated ? (
        <EmptyHolder title="Welcome! Please login first" />
      ) : (
        <EmptyHolder title="Welcome! Please contact administrator to change your role to teacher" />
      );
    } else {
      return role === 'teacher' ? (
        children
      ) : (
        <EmptyHolder title="Welcome! Please contact administrator to change your role to teacher" />
      );
    }
  };

  useEffect(() => {
    getProfile();
  }, [isAuthenticated]);

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
        <div className="flex items-center mr-36">
          {userProfile && !isLoading ? (
            <ProfileDropdown user={userProfile} items={items} />
          ) : !isElectron() ? (
            <LoginButton isLoading={isLoading} />
          ) : (
            <></>
          )}
        </div>
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
        <Content>{setContent(children)}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
