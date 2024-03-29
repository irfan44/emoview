import { Button, Dropdown, Modal, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getClassMeetings } from '../../api/meeting.js';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import MeetingListLoading from '../../components/loading/MeetingListLoading.jsx';
import AddMeeting from '../../components/meeting/AddMeeting.jsx';
import MeetingList from '../../components/meeting/MeetingList.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetailByMeetCode, removeClass } from '../../api/class.js';
import { GrTextAlignFull, GrTrash } from 'react-icons/gr';
import MeetIcon from '../../components/icons/Meet.jsx';
import { FaEllipsisV, FaRegCopy } from 'react-icons/fa';
import UpdateClass from '../../components/class/UpdateClass.jsx';
import PageLoading from '../../components/loading/PageLoading.jsx';
import MeetingsTour from '../../components/tour/MeetingsTour/index.jsx';

const { confirm } = Modal;
const { Text } = Typography;

const ClassMeetings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classDetails, setClassDetails] = useState();
  const [meetings, setMeetings] = useState([]);

  const classDescriptionRef = useRef(null);
  const addMeetingRef = useRef(null);
  const refreshRef = useRef(null);
  const dropdownRef = useRef(null);

  const { meetCode } = useParams();
  const navigate = useNavigate();

  const fetchClassDetails = async () => {
    setIsLoading(true);
    const data = await getClassDetailByMeetCode({ meetCode });
    setClassDetails(data);
    setIsLoading(false);
  };

  const fetchMeetings = async () => {
    setIsLoading(true);
    const data = await getClassMeetings({ meetCode });
    setMeetings(data);
    setIsLoading(false);
  };

  const handleDeleteMeeting = () => {
    confirm({
      title: 'Do you want to delete this class?',
      content: (
        <>
          <span>All meeting & data related to this class will be deleted </span>
          <span>
            Warning : You <strong>cannot</strong> change this later!
          </span>
        </>
      ),
      okText: 'Delete',
      okType: 'danger',
      okButtonProps: { type: 'primary' },
      cancelButtonProps: { type: 'text' },
      onOk: async () => {
        await removeClass(meetCode);
        navigate('/class');
      },
    });
  };

  const items = [
    {
      key: '1',
      label: (
        <UpdateClass
          fetchData={fetchClassDetails}
          initialValues={classDetails && classDetails[0]}
        />
      ),
    },
    {
      key: '2',
      label: (
        <a
          className="flex items-center space-x-2"
          onClick={() => handleDeleteMeeting()}
        >
          <GrTrash />
          <span className="text-red-700">Delete Class</span>
        </a>
      ),
    },
  ];

  useEffect(() => {
    fetchClassDetails();
    fetchMeetings();
  }, []);

  return (
    <>
      {classDetails && (
        <PageLayout
          backToMenu
          prevMenu="Class"
          prevLink="class"
          currentMenu={classDetails[0].name}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '8px',
              marginBottom: '24px',
            }}
          >
            <div>
              <Title>{classDetails[0].name}</Title>
              <Subtitle>{`List of all your meetings in ${classDetails[0].name} class`}</Subtitle>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <AddMeeting
                  addMeetingRef={addMeetingRef}
                  fetchData={fetchMeetings}
                  updateDetails={fetchClassDetails}
                  classDetails={classDetails}
                />
                <Button ref={refreshRef} onClick={() => fetchMeetings()}>
                  Refresh
                </Button>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <Button ref={dropdownRef} type="text">
                    <Subtitle>
                      <FaEllipsisV />
                    </Subtitle>
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="w-fit space-y-2" ref={classDescriptionRef}>
              <div className="flex items-center space-x-2">
                <GrTextAlignFull className="h-4 w-5" />
                <span>{classDetails[0].description}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MeetIcon />
                <a href={classDetails[0].link} target="_blank">
                  <Text
                    copyable={{ icon: <FaRegCopy className="text-black" /> }}
                  >
                    {classDetails[0].link}
                  </Text>
                </a>
              </div>
            </div>
          </div>
          {isLoading ? (
            <MeetingListLoading />
          ) : (
            <div className="mt-6">
              <MeetingList meetings={meetings} page={`class`} />
            </div>
          )}
          <MeetingsTour
            classDescriptionRef={classDescriptionRef}
            addMeetingRef={addMeetingRef}
            refreshRef={refreshRef}
            dropdownRef={dropdownRef}
            name={classDetails[0].name}
          />
        </PageLayout>
      )}
      {isLoading && <PageLoading />}
    </>
  );
};

export default ClassMeetings;
