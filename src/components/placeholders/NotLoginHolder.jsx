import { Typography } from 'antd';
import loginImage from '../../assets/login.webp';

const { Title } = Typography;

const NotLoginHolder = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: '120px',
        textAlign: 'center',
      }}
    >
      <div>
        <img src={loginImage} width="300" />
        <Title level={5} style={{ marginTop: '16px' }}>
          You need to login first!
        </Title>
      </div>
    </div>
  );
};

export default NotLoginHolder;
