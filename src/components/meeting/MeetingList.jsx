import EmptyHolder from '../placeholders/EmptyHolder';
import MeetingCard from './MeetingCard';

const MeetingList = ({ meetings }) => {
  return (
    <>
      {meetings ? (
        <div className="grid grid-cols-3 gap-4 mt-6">
          {meetings.map((data) => {
            return (
              <div key={data._id}>
                <MeetingCard data={data} />
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
