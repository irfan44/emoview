import { Tour } from 'antd';
import { useEffect, useState } from 'react';

const ClassesTour = ({ addClassRef, refreshRef }) => {
  const [isFirstOpen, setIsFirstOpen] = useState();

  const steps = [
    {
      title: 'Welcome to Classes page!',
      description:
        'A class consist of one or more meetings which are recurring. A class is enables you to use one Google Meet link in multiple meetings.',
      target: null,
    },
    {
      title: 'Oops, you have not created a class! ',
      description: 'Click this button to add your class',
      target: addClassRef.current,
    },
    {
      title: 'Class not showing?',
      description: 'Click this button to refresh classes data',
      target: refreshRef.current,
    },
  ];

  const closeTour = () => {
    setIsFirstOpen(false);
    localStorage.setItem('classes.tour', 'done');
  };

  useEffect(() => {
    const firstOpen = localStorage.getItem('classes.tour');
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

export default ClassesTour;
