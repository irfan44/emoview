import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = ({ isLoading }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <Button loading={isLoading} type="primary" onClick={() => handleLogin()}>
      Login
    </Button>
  );
};

export default LoginButton;
