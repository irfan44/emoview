import { Tour } from 'antd';
import { useEffect, useState } from 'react';

const MeetingDetailsTour = ({
  meetingCodeRef,
  recognitionSwitchRef,
  refreshRef,
  floatingDisplayRef,
  endRecognitionRef,
}) => {
  const [isFirstOpen, setIsFirstOpen] = useState();

  const steps = [
    {
      title: 'Share your meeting PIN!',
      description:
        'Copy this code & share it to your student to fill in Emoview for Students so their emotion can be shown here',
      target: meetingCodeRef.current,
    },
    {
      title: 'Recognition switch!',
      description:
        'Click on this switch to enable real-time emotion recognition',
      target: recognitionSwitchRef.current,
    },
    {
      title: 'Emotion data not showing?',
      description: 'Click this button to refresh emotion data',
      target: refreshRef.current,
    },
    {
      title: 'Floating Display!',
      description:
        'Floating display enables you to see emotion data from a simple and adaptable interface. Click this button to open floating display',
      target: floatingDisplayRef.current,
    },
    {
      title: 'Finish meeting?',
      description:
        'Click this button to end this meeting. You cannot enable emotion recognition again if you ended this meeting',
      target: endRecognitionRef.current,
    },
  ];

  const closeTour = () => {
    setIsFirstOpen(false);
    localStorage.setItem('meetingDetails.tour', 'done');
  };

  useEffect(() => {
    const firstOpen = localStorage.getItem('meetingDetails.tour');
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

export default MeetingDetailsTour;
