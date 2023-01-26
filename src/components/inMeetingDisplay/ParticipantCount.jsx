import { FaUser } from 'react-icons/fa';

const ParticipantCount = ({ countParticipants }) => {
  return (
    <div className="flex space-x-2">
      <FaUser />
      <span>{countParticipants}</span>
    </div>
  );
};

export default ParticipantCount;
