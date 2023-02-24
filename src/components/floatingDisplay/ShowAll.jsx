import DisplayData from '../inMeetingDisplay/DisplayData';

const ShowAll = ({ recognitionStream }) => {
  return (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-4 gap-2">
        <DisplayData
          emotionDisplay="dashboard"
          data={recognitionStream.neutral}
          title="Neutral"
        />
        <DisplayData
          emotionDisplay="dashboard"
          data={recognitionStream.happy}
          title="Happy"
        />
        <DisplayData
          emotionDisplay="dashboard"
          data={recognitionStream.sad}
          title="Sad"
        />
        <DisplayData
          emotionDisplay="dashboard"
          data={recognitionStream.fearful}
          title="Fearful"
        />
      </div>
      <div className="flex space-x-4 justify-center">
        <DisplayData
          emotionDisplay="dashboard"
          data={recognitionStream.disgusted}
          title="Disgust"
        />
        <DisplayData
          emotionDisplay="dashboard"
          data={recognitionStream.surprised}
          title="Suprise"
        />
        <DisplayData
          emotionDisplay="dashboard"
          data={recognitionStream.angry}
          title="Angry"
        />
      </div>
    </div>
  );
};

export default ShowAll;
