import EmptyHolder from '../placeholders/EmptyHolder';
import StudentCard from './StudentCard';

const StudentsList = ({ students }) => {
  return (
    <>
      {students ? (
        <div className="grid grid-cols-4 gap-4">
          {students.map((data) => {
            return (
              <div key={data.userId}>
                <StudentCard data={data} />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyHolder title="No students joined" />
      )}
    </>
  );
};

export default StudentsList;
