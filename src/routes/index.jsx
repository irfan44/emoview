import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../components/layout/BaseLayout';
import Dashboard from '../pages/Dashboard';
import Meetings from '../pages/Meetings';
import MeetingDetails from '../pages/MeetingDetails';
import InMeetingDisplay from '../pages/InMeetingDisplay';
import UserEmotionDetails from '../pages/UserEmotionDetails';
import Students from '../pages/Students';
import StudentDetails from '../pages/StudentDetails';
import StudentList from '../pages/StudentList';
import Classes from '../pages/Classes/index.jsx';
import ClassMeetings from '../pages/Meetings/index.jsx';
import StudentsMeetings from '../pages/StudentsMeetings/index.jsx';

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
    path: '/classes',
    element: (
      <BaseLayout>
        <Classes />
      </BaseLayout>
    ),
  },
  {
    path: '/classes/:meetCode',
    element: (
      <BaseLayout>
        <ClassMeetings />
      </BaseLayout>
    ),
  },
  {
    path: '/classes/:meetCode/:emoviewCode',
    element: (
      <BaseLayout>
        <MeetingDetails />
      </BaseLayout>
    ),
  },
  {
    path: '/classes/:meetCode/:emoviewCode/:userId',
    element: (
      <BaseLayout>
        <UserEmotionDetails />
      </BaseLayout>
    ),
  },
  {
    path: '/students',
    element: (
      <BaseLayout>
        <Students />
      </BaseLayout>
    ),
  },
  {
    path: '/students/class/:meetCode',
    element: (
      <BaseLayout>
        <StudentsMeetings />
      </BaseLayout>
    ),
  },
  {
    path: '/students/class/:meetCode/:emoviewCode',
    element: (
      <BaseLayout>
        <StudentList />
      </BaseLayout>
    ),
  },
  {
    path: '/students/:userId',
    element: (
      <BaseLayout>
        <StudentDetails />
      </BaseLayout>
    ),
  },
  {
    path: '/students/:userId/:emoviewCode',
    element: (
      <BaseLayout>
        <StudentDetails />
      </BaseLayout>
    ),
  },
  {
    path: '/in-meeting-display',
    element: <InMeetingDisplay />,
  },
  {
    path: '*',
    element: (
      <BaseLayout>
        <p>Anda nyasar</p>
      </BaseLayout>
    ),
  },
]);

export default Routes;
