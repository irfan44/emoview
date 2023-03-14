import { Progress } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import DisplayData from '../inMeetingDisplay/DisplayData';

const PositiveNegative = ({ recognitionStream, recognitionsSummary }) => {
  const [summary, setSummary] = useState();
  const [clicked, setClicked] = useState();

  useEffect(() => {
    setSummary(recognitionsSummary);
  }, [recognitionsSummary]);

  return (
    <div className="space-y-2">
      <div className="flex space-x-4 justify-around">
        {summary && (
          <button
            className="flex flex-col text-center border-0 p-2 cursor-pointer hover:bg-white/[.60] rounded" //Change pointer & add hover effect
            onClick={() =>
              clicked === 'positive' ? setClicked('') : setClicked('positive')
            }
          >
            <Progress
              type="dashboard"
              percent={summary.datas[0]}
              format={(percent) => `${percent}%`}
              width={52}
            />
            <p className="mb-0 mt-2 text-sm">Positive</p>
          </button>
        )}
        {/* <div className="p-2" onClick={() => setClicked('')}> */}
        <button
          className="flex flex-col text-center border-0 p-2 cursor-pointer"
          onClick={() => setClicked('')}
        >
          <DisplayData
            emotionDisplay="dashboard"
            data={recognitionStream.neutral}
            title="Neutral"
          />
        </button>
        {/* </div> */}
        {summary && (
          <button
            className="flex flex-col text-center border-0 p-2 cursor-pointer hover:bg-white/[.60] rounded"
            onClick={() =>
              clicked === 'negative' ? setClicked('') : setClicked('negative')
            }
          >
            <Progress
              type="dashboard"
              percent={summary.datas[1]}
              format={(percent) => `${percent}%`}
              width={52}
            />
            <p className="mb-0 mt-2 text-sm">Negative</p>
          </button>
        )}
      </div>
      {clicked === 'positive' && (
        <div className="flex justify-around bg-white/[.60] p-2 rounded-xl">
          <DisplayData
            emotionDisplay="dashboard"
            data={recognitionStream.happy}
            title="Happy"
          />
          <DisplayData
            emotionDisplay="dashboard"
            data={recognitionStream.surprised}
            title="Suprise"
          />
        </div>
      )}
      {clicked === 'negative' && (
        <div className="grid grid-cols-4 bg-white/[.60] p-2 rounded-xl">
          <DisplayData
            emotionDisplay="dashboard"
            data={recognitionStream.sad}
            title="Sad"
          />
          <DisplayData
            emotionDisplay="dashboard"
            data={recognitionStream.angry}
            title="Angry"
          />
          <DisplayData
            emotionDisplay="dashboard"
            data={recognitionStream.fearful}
            title="Fearful"
          />
          <DisplayData
            emotionDisplay="dashboard"
            data={recognitionStream.disgusted}
            title="Disgust"
          />
        </div>
      )}
    </div>
  );
};

export default PositiveNegative;
