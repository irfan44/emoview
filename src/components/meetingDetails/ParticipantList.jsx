import EmptyHolder from '../placeholders/EmptyHolder';
import ParticipantCard from './ParticipantCard';

const ParticipantList = ({ id, meetingParticipants }) => {
  return (
    <>
      {meetingParticipants ? (
        <div className="grid grid-cols-4 gap-4">
          {meetingParticipants.map((data) => {
            return (
              <div key={data.userId}>
                <ParticipantCard id={id} data={data} />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyHolder title="No participants joined" />
      )}
    </>
  );
};

export default ParticipantList;
