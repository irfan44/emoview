import loginImage from '../../assets/login.webp';
import SectionTitle from '../common/typography/SectionTitle';

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
      <div className="space-y-4">
        <img src={loginImage} width="300" />
        <SectionTitle>You need to login first!</SectionTitle>
      </div>
    </div>
  );
};

export default NotLoginHolder;
