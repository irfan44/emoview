import emptyImage from '../../assets/empty.webp';
import SectionTitle from '../common/typography/SectionTitle';

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
      <div className="space-y-4">
        <img src={emptyImage} width="300" />
        <SectionTitle>{title}</SectionTitle>
      </div>
    </div>
  );
};

export default EmptyHolder;
