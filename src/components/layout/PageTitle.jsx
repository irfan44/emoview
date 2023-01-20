import { Typography } from 'antd';

const { Title } = Typography;

const PageTitle = ({ children }) => {
  return (
    <Title level={3} style={{ marginTop: '8px', marginBottom: '16px' }}>
      {children}
    </Title>
  );
};

export default PageTitle;
