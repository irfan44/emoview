import EmptyHolder from '../placeholders/EmptyHolder';
import MeetingCard from './MeetingCard';

const MeetingList = ({ meetings, page }) => {
  return (
    <>
      {meetings ? (
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
