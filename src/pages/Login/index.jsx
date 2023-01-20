import { Col, Row, Space, Typography } from 'antd';
import placholderImage from '../../assets/placeholder.png';
import LoginButton from '../../components/auth/LoginButton';

const { Paragraph, Title } = Typography;

const Login = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: '100vh',
        minWidth: '100vh',
        backgroundColor: '#f4f7fb',
      }}
    >
      <Col
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={placholderImage} alt="placeholder" height="500" />
        </div>
      </Col>
      <Col
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Space
          size="large"
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Title>Login</Title>
          <LoginButton />
          <div>
            <Paragraph style={{ fontWeight: 'bold' }}>Notes :</Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur. In faucibus mi quam
              aliquam egestas. Arcu ut mi mollis metus ornare. In enim sit mi
              eget eu commodo vitae id. Quis odio imperdiet duis amet hendrerit
              in dolor.
            </Paragraph>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default Login;
