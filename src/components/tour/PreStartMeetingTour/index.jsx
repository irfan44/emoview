import { Tour } from 'antd';
import { useEffect, useState } from 'react';

const PreStartMeetingTour = ({ startMeetingRef, dropdownRef, name }) => {
  const [isFirstOpen, setIsFirstOpen] = useState();

  const steps = [
    {
      title: `Welcome to ${name} meeting page!`,
      description:
        'This is your meeting page. Here is where you can see emotion data from your students',
      target: null,
    },
    {
      title: 'Start your meeting!',
      description:
        'Want to start your meeting to start getting emotion data? Click this button to start meeting',
      target: startMeetingRef.current,
    },
    {
      title: 'Need to edit or delete?',
      description: 'Hover on this button to edit or delete this meeting',
      target: dropdownRef.current,
    },
  ];

  const closeTour = () => {
    setIsFirstOpen(false);
    localStorage.setItem('preStartMeeting.tour', 'done');
  };

  useEffect(() => {
    const firstOpen = localStorage.getItem('preStartMeeting.tour');
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

export default PreStartMeetingTour;
