import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { createUser } from '../../api/user';

const Callback = () => {
  const { getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  const setToken = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${import.meta.env.VITE_AUTH0_APP_DOMAIN}/api/v2/`,
      scope: 'read:current_user',
    });
    localStorage.setItem('accessToken', accessToken);

    const userinfo = await axios.get(
      `https://${import.meta.env.VITE_AUTH0_APP_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const {
      nickname,
      name,
      sub,
      email,
      picture,
      [`https://customclaim.com/id`]: userId,
      [`https://customclaim.com/role`]: role,
    } = userinfo.data;

    const user = { nickname, name, sub, email, picture, userId, role };
    const stringifyUser = JSON.stringify(user);
    localStorage.setItem('user', stringifyUser); // TODO: Add save user to BE
  };

  useEffect(() => {
    setToken() && navigate('/');
  }, []);

  return <></>;
};

export default Callback;
