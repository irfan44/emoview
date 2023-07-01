import { Tour } from 'antd';
import { useEffect, useState } from 'react';
import teacherImage from '../../../assets/teacher.webp';
import emoviewFlow from '../../../assets/emoview-flow.webp';
import welcome from '../../../assets/welcome.webp';

const FirstStep = () => {
  return (
    <div className="space-y-4 my-4">
      <div className="flex justify-center">
        <img alt="Teacher illustration" src={teacherImage} width={242} />
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-xl m-0">
          Welcome to EmoSync for Teachers!
        </h3>
        <p>
          EmoSync for Teachers is a dashboard for teachers to see the emotions
          students feel in real time while teaching
        </p>
      </div>
    </div>
  );
};

const SecondStep = () => {
  return (
    <div className="space-y-4 my-4">
      <div className="flex justify-center py-6">
        <img alt="Emoview Flow" src={emoviewFlow} width={480} />
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-xl m-0">
          Get EmoSync for Students for your students!
        </h3>
        <p>
          Make sure your student have EmoSync for Students, a Chrome based
          browser extension, installed so their emotion data can be shown here
        </p>
        <p>
          Get EmoSync for Students from "Get EmoSync for Students" menu by
          hovering your profile name!
        </p>
      </div>
    </div>
  );
};

const ThridStep = () => {
  return (
    <div className="space-y-4 my-4">
      <div className="flex justify-center py-6">
        <img alt="Welcome" src={welcome} width={242} />
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-xl m-0">You're ready to explore!</h3>
        <p>
          Start exploring by clicking on the side menu. You can create classes
          and meetings, then enable recognition to see your students emotions
        </p>
      </div>
    </div>
  );
};

const DashboardTour = () => {
  const [isFirstOpen, setIsFirstOpen] = useState();

  const steps = [
    {
      title: ' ',
      description: <FirstStep />,
      target: null,
    },
    {
      title: ' ',
      description: <SecondStep />,
      target: null,
    },
    {
      title: ' ',
      description: <ThridStep />,
      target: null,
    },
  ];

  const closeTour = () => {
    setIsFirstOpen(false);
    localStorage.setItem('dashboard.tour', 'done');
  };

  useEffect(() => {
    const firstOpen = localStorage.getItem('dashboard.tour');
    if (firstOpen === null) {
      setIsFirstOpen(true);
    } else {
      setIsFirstOpen(false);
    }
  }, []);

  return <Tour open={isFirstOpen} onClose={closeTour} steps={steps} />;
};

export default DashboardTour;
