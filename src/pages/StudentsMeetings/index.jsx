import { useEffect, useState } from 'react';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import MeetingListLoading from '../../components/loading/MeetingListLoading.jsx';
import MeetingList from '../../components/meeting/MeetingList.jsx';
import { useParams } from 'react-router-dom';
import { getClassDetailByMeetCode } from '../../api/class.js';
import { getClassMeetings } from '../../api/meeting.js';
import PageLoading from '../../components/loading/PageLoading.jsx';

const StudentsMeetings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classDetails, setClassDetails] = useState();
  const [meetings, setMeetings] = useState([]);

  const { meetCode } = useParams();

  const fetchClassDetails = async () => {
    setIsLoading(true);
    const data = await getClassDetailByMeetCode({ meetCode });
    setClassDetails(data);
    setIsLoading(false);
  };

  const fetchMeetings = async () => {
    setIsLoading(true);
    const data = await getClassMeetings({ meetCode });
    setMeetings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchClassDetails();
    fetchMeetings();
  }, []);

  return (
    <>
      {classDetails && (
        <PageLayout
          backToMenu
          prevMenu="Student Reports"
          prevLink="students"
          currentMenu={classDetails[0].name}
        >
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
              <Title>{classDetails[0].name}</Title>
              <Subtitle>{classDetails[0].description}</Subtitle>
            </div>
          </div>
          {isLoading ? (
            <MeetingListLoading />
          ) : (
            <div className="mt-6">
              <MeetingList meetings={meetings} page={`students/class`} />
            </div>
          )}
        </PageLayout>
      )}
      {isLoading && <PageLoading />}
    </>
  );
};

export default StudentsMeetings;
