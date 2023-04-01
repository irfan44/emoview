import { Button, Dropdown, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import LoadingMeetingList from '../../components/loading/MeetingList.jsx';
import MeetingList from '../../components/meeting/MeetingList.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetailByMeetCode, removeClass } from '../../api/class.js';
import { getClassMeetings } from '../../api/meeting.js';

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
          prevMenu="Students"
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
            <LoadingMeetingList />
          ) : (
            <div className="mt-6">
              <MeetingList meetings={meetings} page={`students/class`} />
            </div>
          )}
        </PageLayout>
      )}
    </>
  );
};

export default StudentsMeetings;
