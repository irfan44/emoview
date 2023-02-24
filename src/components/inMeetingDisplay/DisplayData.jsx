import { Progress } from 'antd';

const DisplayData = ({ emotionDisplay, data, title }) => {
  return (
    <div className="flex flex-col text-center">
      <Progress
        type={emotionDisplay}
        percent={Math.floor(data * 100)}
        width={52}
      />
      <p className="mb-0 mt-2 text-sm">{title}</p>
    </div>
  );
};

export default DisplayData;
