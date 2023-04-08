import PageLayout from '../../components/layout/PageLayout.jsx';
import ClassList from '../../components/class/ClassList.jsx';
import { useEffect, useRef, useState } from 'react';
import { getClassList } from '../../api/class.js';
import Title from '../../components/common/typography/Title.jsx';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import { Button } from 'antd';
import AddClass from '../../components/class/AddClass.jsx';
import ClassListLoading from '../../components/loading/ClassListLoading.jsx';
import ClassesTour from '../../components/tour/ClassesTour/index.jsx';

const Classes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState();

  const addClassRef = useRef(null);
  const refreshRef = useRef(null);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const data = await getClassList();
      setClasses(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <PageLayout currentMenu="Classes">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px',
          marginBottom: '24px',
        }}
      >
        <div>
          <Title>Classes</Title>
          <Subtitle>List of all your classes</Subtitle>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            {/*<AddMeeting fetchData={fetchMeetings} />*/}
            <AddClass addClassRef={addClassRef} fetchData={fetchClasses} />
            <Button ref={refreshRef} onClick={() => fetchClasses()}>
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <ClassListLoading />
        ) : (
          <ClassList classList={classes} currentMenu={'classes'} />
        )}
      </div>
      <ClassesTour addClassRef={addClassRef} refreshRef={refreshRef} />
    </PageLayout>
  );
};

export default Classes;
