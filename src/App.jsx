import AntdConfig from './components/common/AntdConfig';
import MainApp from './pages';
import './styles/index.css';
import 'antd/dist/reset.css';

const App = () => {
  return (
    <AntdConfig>
      <MainApp />
    </AntdConfig>
  );
};

export default App;
