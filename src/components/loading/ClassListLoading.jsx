import { Card } from 'antd';

const ClassListLoading = () => {
  return (
    <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
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

export default ClassListLoading;
