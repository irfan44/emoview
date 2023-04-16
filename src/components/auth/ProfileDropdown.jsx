import { HiChevronDown } from 'react-icons/hi';
import { Dropdown } from 'antd';

const ProfileDropdown = ({ items, user }) => {
  return (
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
  );
};

export default ProfileDropdown;
