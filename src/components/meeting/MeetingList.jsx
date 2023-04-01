import EmptyHolder from '../placeholders/EmptyHolder';
import MeetingCard from '../common/cards/MeetingCard.jsx';

const MeetingList = ({ meetings, page }) => {
  const checkMeetings = () => {
    if (!meetings) {
      return false;
    } else if (meetings.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {checkMeetings() ? (
        <div className="grid grid-cols-3 gap-4">
          {meetings.map((data) => {
            return (
              <div key={data._id}>
                <MeetingCard data={data} page={page} />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyHolder title="Your meetings list is empty!" />
      )}
    </>
  );
};

export default MeetingList;
