import { Spin } from 'antd';

const PageLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: '240px',
        textAlign: 'center',
      }}
    >
      <Spin />
    </div>
  );
};

export default PageLoading;
