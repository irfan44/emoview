import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../components/layout/BaseLayout';
import Dashboard from '../pages/Dashboard';
import Meetings from '../pages/Meetings';
import MeetingDetails from '../pages/MeetingDetails';
import InMeetingDisplay from '../pages/InMeetingDisplay';
import UserEmotionDetails from '../pages/UserEmotionDetails';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <BaseLayout>
        <Dashboard />
      </BaseLayout>
    ),
  },
  {
    path: '/meetings',
    element: (
      <BaseLayout>
        <Meetings />
      </BaseLayout>
    ),
  },
  {
    path: '/meeting/:id',
    element: (
      <BaseLayout>
        <MeetingDetails />
      </BaseLayout>
    ),
  },
  {
    path: '/meeting/:meetingId/:userId',
    element: (
      <BaseLayout>
        <UserEmotionDetails />
      </BaseLayout>
    ),
  },
  {
    path: '/in-meeting-display',
    element: <InMeetingDisplay />,
  },
]);

export default Routes;
