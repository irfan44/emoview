import { Button, Table } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getMeetingByEmoviewCode, getMeetingById } from '../../api/meeting.js';
import { getRecognitionByIds } from '../../api/recognition';
import { getUserSameMeeting, getUserStudentAtMeeting } from '../../api/user.js';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import { getClassDetailByMeetCode } from '../../api/class.js';
import PageLoading from '../../components/loading/PageLoading.jsx';
import exportFromJSON from 'export-from-json';
import ExportMeetingReport from '../../components/students/ExportMeetingReport.jsx';

const StudentList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meetingData, setMeetingData] = useState();
  const [studentAtMeeting, setStudentAtMeeting] = useState();
  const { emoviewCode } = useParams();

  const fetchMeetingById = async () => {
    try {
      setIsLoading(true);
      const data = await getMeetingByEmoviewCode({ emoviewCode });
      setMeetingData(data[0]);
      studentsAtMeeting(emoviewCode);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const studentsAtMeeting = async (emoviewCode) => {
    try {
      setIsLoading(true);
      const data = await getUserSameMeeting({ emoviewCode });
      setStudentAtMeeting(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (_, tags) => (
        <>
          <Link to={`/students/${tags._id}/${emoviewCode}`}>
            View Emotion {'>'}
          </Link>
        </>
      ),
    },
  ];

  // const handleFetchMeetingReport = async () => {
  //   try {
  //     let ids = [];
  //     meetingData.participants.map((value) => {
  //       ids.push(value.userId);
  //     });
  //     const data = await getRecognitionByIds(emoviewCode, ids, ' ');
  //     let datas = [];
  //     data.forEach((values) => {
  //       const transpose = (array) =>
  //         array[0].map((_, index) => array.map((row) => row[index]));
  //       const recognitionsOverview = [
  //         ...transpose(Object.values(values.recognitionsOverview)),
  //       ];
  //       const recognitionsSummary = [
  //         ...transpose(Object.values(values.recognitionsSummary)),
  //       ];
  //       let array = [];
  //       array.push(['User Id', values.userId]);
  //       recognitionsOverview.forEach((data) => {
  //         array.push(data);
  //       });
  //       recognitionsSummary.forEach((data) => {
  //         array.push(data);
  //       });
  //       const collectedValue = [...transpose(Object.values(array))];
  //       datas.push(collectedValue[1]);
  //     });
  //     function toObject(keys, values) {
  //       const obj = keys.reduce((accumulator, key, index) => {
  //         return { ...accumulator, [key]: values[index] };
  //       }, {});
  //
  //       return obj;
  //     }
  //     let abc = [];
  //     const labels = [
  //       'User',
  //       'Neutral',
  //       'Happy',
  //       'Sad',
  //       'Angry',
  //       'Fearful',
  //       'Disgusted',
  //       'Surprised',
  //       'Positive',
  //       'Negative',
  //     ];
  //     datas.forEach((value) => {
  //       abc.push(toObject(labels, value));
  //     });
  //     exportFromJSON({
  //       data: abc,
  //       fileName: `Students-Report_${meetingData.name}-Meeting`,
  //       exportType: exportFromJSON.types.xls,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchMeetingById();
  }, []);

  return (
    <>
      {meetingData && (
        <PageLayout backToPrevious>
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title>{meetingData.name}</Title>
              <Subtitle>{meetingData.subject}</Subtitle>
            </div>
            <ExportMeetingReport
              emoviewCode={emoviewCode}
              participants={meetingData.participants}
              meetingName={meetingData.name}
            />
          </div>
          <Table
            rowKey="_id"
            dataSource={studentAtMeeting}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
          />
        </PageLayout>
      )}
      {isLoading && <PageLoading />}
    </>
  );
};

export default StudentList;
