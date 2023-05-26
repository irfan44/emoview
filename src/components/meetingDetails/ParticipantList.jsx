import EmptyHolder from '../placeholders/EmptyHolder';
import StudentCard from '../common/cards/StudentCard.jsx';

const ParticipantList = ({ meetingParticipants, currentMenu, pageId }) => {
  return (
    <>
      {meetingParticipants.length > 0 ? (
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
          {meetingParticipants.map((data) => {
            return (
              <div key={data.userId}>
                <StudentCard
                  data={data}
                  currentMenu={currentMenu}
                  pageId={pageId}
                  studentId={data.userId}
                />
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
