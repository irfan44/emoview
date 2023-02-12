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
import CardTitle from '../common/typography/CardTitle';

const DominantEmotion = ({ emotion }) => {
  const emoji = () => {
    switch (emotion) {
      case 'neutral':
        return (
          <>
            <FaRegMeh size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>Neutral</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Current</p>
            </div>
          </>
        );
      case 'happy':
        return (
          <>
            <FaRegLaughSquint size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>Happy</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Current</p>
            </div>
          </>
        );
      case 'sad':
        return (
          <>
            <FaRegSadCry size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>Sad</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Current</p>
            </div>
          </>
        );
      case 'angry':
        return (
          <>
            <FaRegAngry size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>Angry</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Current</p>
            </div>
          </>
        );
      case 'fearful':
        return (
          <>
            <FaRegMehBlank size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>Fearful</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Current</p>
            </div>
          </>
        );
      case 'disgusted':
        return (
          <>
            <FaRegTired size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>Disgusted</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Current</p>
            </div>
          </>
        );
      case 'surprised':
        return (
          <>
            <FaRegSurprise size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>Surprised</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Current</p>
            </div>
          </>
        );

      default:
        return (
          <>
            <FaRegDizzy size={28} style={{ marginTop: '8px' }} />
            <div>
              <CardTitle>-</CardTitle>
              <p className="m-0 text-sm text-black/[.60]">Overall</p>
            </div>
          </>
        );
    }
  };
  return <div className="flex items-center space-x-2">{emoji()}</div>;
};

export default DominantEmotion;
