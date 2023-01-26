import { Card } from 'antd';

const LoadingMeetingList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div>
        <Card loading />
      </div>
      <div>
        <Card loading />
      </div>
      <div>
        <Card loading />
      </div>
    </div>
  );
};

export default LoadingMeetingList;
