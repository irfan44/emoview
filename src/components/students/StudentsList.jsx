import EmptyHolder from '../placeholders/EmptyHolder';
import StudentCard from '../common/cards/StudentCard.jsx';

const StudentsList = ({ students, currentMenu }) => {
  return (
    <>
      {students ? (
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
          {students.map((data) => {
            return (
              <div key={data.userId}>
                <StudentCard
                  data={data}
                  currentMenu={currentMenu}
                  studentId={data.userId}
                />
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
