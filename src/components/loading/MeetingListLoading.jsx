import { Card } from 'antd';

const MeetingListLoading = () => {
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
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

export default MeetingListLoading;
