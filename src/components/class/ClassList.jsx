import EmptyHolder from '../placeholders/EmptyHolder.jsx';
import ClassCard from '../common/cards/ClassCard.jsx';

const ClassList = ({ classList, currentMenu }) => {
  return (
    <>
      {classList ? (
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
          {classList.map((data) => {
            return (
              <div key={data._id}>
                <ClassCard
                  data={data}
                  currentMenu={currentMenu}
                  meetCode={data.meetCode}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyHolder title="No class created" />
      )}
    </>
  );
};

export default ClassList;
