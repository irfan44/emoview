import { Tour } from 'antd';
import { useEffect, useState } from 'react';

const MeetingsTour = ({
  classDescriptionRef,
  addMeetingRef,
  refreshRef,
  dropdownRef,
  name,
}) => {
  const [isFirstOpen, setIsFirstOpen] = useState();

  const steps = [
    {
      title: `Welcome to ${name} meetings page!`,
      description:
        'This is your class meetings list page. You can see meetings that you added to this class. You can add multiple meetings to this class',
      target: null,
    },
    {
      title: 'Your class description!',
      description:
        'This is your class description & Google Meet link. You can copy this link by clicking on the icon',
      target: classDescriptionRef.current,
    },
    {
      title: 'Oops, you have not created a meeting! ',
      description: 'Click this button to add your meeting',
      target: addMeetingRef.current,
    },
    {
      title: 'Meetings not showing?',
      description: 'Click this button to refresh meetings data',
      target: refreshRef.current,
    },
    {
      title: 'Need to edit or delete?',
      description: 'Hover on this button to edit or delete this class',
      target: dropdownRef.current,
    },
  ];

  const closeTour = () => {
    setIsFirstOpen(false);
    localStorage.setItem('meetings.tour', 'done');
  };

  useEffect(() => {
    const firstOpen = localStorage.getItem('meetings.tour');
    if (firstOpen === null) {
      setIsFirstOpen(true);
    } else {
      setIsFirstOpen(false);
    }
  }, []);

  return (
    <Tour
      open={isFirstOpen}
      onClose={closeTour}
      steps={steps}
      arrow={false}
      placement={'bottomRight'}
    />
  );
};

export default MeetingsTour;
