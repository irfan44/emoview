import { ConfigProvider } from 'antd';

const AntdConfig = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0066ff',
          colorBgLayout: '#f1f2f6',
          fontFamily: 'Public Sans',
        },
        components: {
          Menu: {
            colorItemBgSelected: '#0066ff',
            colorItemTextSelected: '#ffffff',
            borderRadius: '8px',
          },
          Button: {
            borderRadius: '8px',
          },
          Card: {
            borderRadius: '8px',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfig;
