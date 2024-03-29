import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { countMeeting, getMeeting } from '../../api/meeting';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import SectionTitle from '../../components/common/typography/SectionTitle';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import PageLayout from '../../components/layout/PageLayout';
import LoadingMeetingList from '../../components/loading/MeetingListLoading.jsx';
import MeetingList from '../../components/meeting/MeetingList';
import DashboardTour from '../../components/tour/DashboardTour/index.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import isElectron from '../../utils/isElectron.js';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState();
  const [meetings, setMeetings] = useState([]);
  const [userProfile, setUserProfile] = useState();

  const fetchCountMeeting = async () => {
    try {
      const data = await countMeeting();
      setCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetings = async () => {
    try {
      setIsLoading(true);
      const data = await getMeeting();
      const recentMeeting = data ? data.slice(0, 6) : null;
      setMeetings(recentMeeting);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    if (!isElectron()) {
      if (isAuthenticated) {
        setUserProfile(user);
      }
    } else {
      const profile = await window.electronAPI.getProfile();
      setUserProfile(profile);
    }
  };

  useEffect(() => {
    getProfile();
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCountMeeting();
    fetchMeetings();
  }, []);

  return (
    <PageLayout currentMenu="Home">
      <Title>Home</Title>
      {userProfile && <Subtitle>Welcome, {userProfile.name}</Subtitle>}
      <div className="grid grid-cols-6 xl:grid-cols-7 gap-4 my-6">
        <div>
          {isLoading ? (
            <Card loading>
              <p className="mb-4 font-bold text-4xl">0</p>
              <Subtitle>Total Meeting</Subtitle>
            </Card>
          ) : (
            <Card>
              {count ? (
                <p className="mb-4 font-bold text-4xl">{count}</p>
              ) : (
                <p className="mb-4 font-bold text-4xl">0</p>
              )}
              <Subtitle>Total Meeting</Subtitle>
            </Card>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 mb-6">
        <div>
          <SectionTitle level={4} style={{ marginBottom: 0 }}>
            Latest Meetings
          </SectionTitle>
          <Subtitle>List of your latest meetings</Subtitle>
        </div>
        <div>
          <Link to={'/class'}>
            <div className="flex items-center space-x-2 text-black/[.60] px-[4px] rounded-md -ml-1 hover:text-black hover:bg-black/[.06]">
              <span className="text-sm">View from Class</span>
              <span>
                <FaChevronRight className="mt-1" />
              </span>
            </div>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <LoadingMeetingList />
      ) : (
        <MeetingList meetings={meetings} page={'class'} />
      )}
      <DashboardTour />
    </PageLayout>
  );
};

export default Dashboard;
