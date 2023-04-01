import { Button, Dropdown, Typography } from 'antd';
import { FaEllipsisV, FaRegCopy } from 'react-icons/fa';
import { GrRefresh, GrTextAlignFull, GrTrash } from 'react-icons/gr';
import Subtitle from '../common/typography/Subtitle';
import Title from '../common/typography/Title';
import UpdateMeeting from '../meeting/UpdateMeeting';
import RecognitionSwitch from './RecognitionSwitch';
import FloatingDisplayIcon from '../icons/FloatingDisplay';
import MeetIcon from '../icons/Meet';
import { MdFiberPin } from 'react-icons/all.js';

const { Text } = Typography;

const Header = ({
  name,
  subject,
  description,
  emoviewCode,
  link,
  isStart,
  isEnded,
  recognitionStatus,
  handleStartMeeting,
  handleStopMeeting,
  handleDeleteMeeting,
  handleSwitch,
  openInMeeting,
  fetchMeetingById,
  meetingData,
  isLoadingStart,
  isLoadingEnd,
}) => {
  const items = [
    {
      key: '1',
      label: (
        <UpdateMeeting
          fetchData={fetchMeetingById}
          initialValues={meetingData}
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
          <span className="text-red-700">Delete Meeting</span>
        </a>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px',
          marginBottom: '8px',
        }}
      >
        <div className="mb-2">
          <Title>{name}</Title>
          <Subtitle>{subject}</Subtitle>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <div>
              <RecognitionSwitch
                isStart={isStart}
                isEnded={isEnded}
                recognitionStatus={recognitionStatus}
                handleSwitch={handleSwitch}
              />
            </div>
            {isStart && (
              <Button onClick={() => window.location.reload()}>Refresh</Button>
            )}
            {!isEnded && isStart && (
              <Button type="primary" onClick={() => openInMeeting()}>
                <div className="flex items-center space-x-1">
                  <FloatingDisplayIcon />
                  <span>Floating Display</span>
                </div>
              </Button>
            )}
            {!isEnded && !isStart && (
              <Button
                loading={isLoadingStart}
                type="primary"
                onClick={() => handleStartMeeting()}
              >
                Start Meeting
              </Button>
            )}
            {!isEnded && isStart && (
              <Button
                danger
                loading={isLoadingEnd}
                type="primary"
                onClick={() => handleStopMeeting()}
              >
                End Recognition
              </Button>
            )}
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow
            >
              <Button type="text">
                <Subtitle>
                  <FaEllipsisV />
                </Subtitle>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-2">
        <div className="flex items-center space-x-2">
          <GrTextAlignFull className="h-4 w-5" />
          <span>{description}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MeetIcon />
          <a href={!isEnded ? link : ''} target="_blank">
            <Text copyable={{ icon: <FaRegCopy className="text-black" /> }}>
              {link}
            </Text>
          </a>
          {isEnded && <span> Ended</span>}
        </div>
        <div className="flex items-center space-x-2">
          <MdFiberPin className="h-4 w-5" />
          <Text copyable={{ icon: <FaRegCopy className="text-black" /> }}>
            {emoviewCode}
          </Text>
        </div>
      </div>
    </>
  );
};

export default Header;
