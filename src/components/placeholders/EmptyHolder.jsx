import { Typography } from 'antd';
import emptyImage from '../../assets/empty.webp';

const { Title } = Typography;

const EmptyHolder = ({ title }) => {
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
        <img src={emptyImage} width="300" />
        <Title level={5} style={{ marginTop: '16px' }}>
          {title}
        </Title>
      </div>
    </div>
  );
};

export default EmptyHolder;
