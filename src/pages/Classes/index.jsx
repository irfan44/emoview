import PageLayout from '../../components/layout/PageLayout.jsx';
import ClassList from '../../components/class/ClassList.jsx';
import { useEffect, useState } from 'react';
import { getClassList } from '../../api/class.js';
import LoadingMeetingList from '../../components/loading/MeetingList.jsx';
import Title from '../../components/common/typography/Title.jsx';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import { Button } from 'antd';
import AddClass from '../../components/class/AddClass.jsx';

const Classes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState();

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
            <AddClass fetchData={fetchClasses} />
            <Button onClick={() => fetchClasses()}>Refresh</Button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <LoadingMeetingList />
        ) : (
          <ClassList classList={classes} currentMenu={'classes'} />
        )}
      </div>
    </PageLayout>
  );
};

export default Classes;
