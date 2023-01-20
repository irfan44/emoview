import { ConfigProvider } from 'antd';

const AntdConfig = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0066ff',
          colorBgLayout: '#f1f2f6',
        },
        components: {
          Menu: {
            colorItemBgSelected: '#0066ff',
            colorItemTextSelected: '#ffffff',
          },
          Progress: {
            colorFill: '$000000',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfig;
