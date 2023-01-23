import { Space, Typography } from 'antd';
import {
  FaRegAngry,
  FaRegDizzy,
  FaRegLaughSquint,
  FaRegMeh,
  FaRegMehBlank,
  FaRegSadCry,
  FaRegSurprise,
  FaRegTired,
} from 'react-icons/fa';

const { Text, Title } = Typography;

const DominantEmotion = ({ emotion }) => {
  const emoji = () => {
    switch (emotion) {
      case 'neutral':
        return (
          <>
            <FaRegMeh size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Neutral
              </Title>
              <Text type="secondary">Emotion</Text>
            </div>
          </>
        );
      case 'happy':
        return (
          <>
            <FaRegLaughSquint size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Happy
              </Title>
              <Text type="secondary">Current</Text>
            </div>
          </>
        );
      case 'sad':
        return (
          <>
            <FaRegSadCry size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Sad
              </Title>
              <Text type="secondary">Current</Text>
            </div>
          </>
        );
      case 'angry':
        return (
          <>
            <FaRegAngry size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Angry
              </Title>
              <Text type="secondary">Current</Text>
            </div>
          </>
        );
      case 'fearful':
        return (
          <>
            <FaRegMehBlank size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Fearful
              </Title>
              <Text type="secondary">Current</Text>
            </div>
          </>
        );
      case 'disgusted':
        return (
          <>
            <FaRegTired size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Disgusted
              </Title>
              <Text type="secondary">Current</Text>
            </div>
          </>
        );
      case 'surprised':
        return (
          <>
            <FaRegSurprise size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Surprised
              </Title>
              <Text type="secondary">Current</Text>
            </div>
          </>
        );

      default:
        return (
          <>
            <FaRegDizzy size={28} style={{ marginTop: '8px' }} />
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                -
              </Title>
              <Text type="secondary">Overall</Text>
            </div>
          </>
        );
    }
  };
  return <div className="flex items-center space-x-2">{emoji()}</div>;
};

export default DominantEmotion;
