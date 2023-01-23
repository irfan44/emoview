import { Button, Dropdown, Space, Typography } from 'antd';
import { FaEllipsisV } from 'react-icons/fa';
import Subtitle from '../common/typography/Subtitle';
import Title from '../common/typography/Title';
import UpdateMeeting from '../meeting/UpdateMeeting';
import RecognitionSwitch from './RecognitionSwitch';

const { Paragraph, Text } = Typography;

const Header = ({
  name,
  subject,
  description,
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
      danger: true,
      label: <a onClick={() => handleDeleteMeeting()}>Delete Meeting</a>,
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
          marginBottom: '16px',
        }}
      >
        <div>
          <Title>{name}</Title>
          <Subtitle>{subject}</Subtitle>
        </div>
        <div>
          <Space>
            <RecognitionSwitch
              isStart={isStart}
              isEnded={isEnded}
              recognitionStatus={recognitionStatus}
              handleSwitch={handleSwitch}
            />
            {!isEnded && isStart && (
              <Button type="primary" onClick={() => openInMeeting()}>
                In Meeting Display
              </Button>
            )}
            {!isEnded && !isStart && (
              <Button type="primary" onClick={() => handleStartMeeting()}>
                Start Meeting
              </Button>
            )}
            {!isEnded && isStart && (
              <Button danger onClick={() => handleStopMeeting()}>
                End Meeting
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
          </Space>
        </div>
      </div>
      <div>
        <p>Description : {description}</p>
        <p>
          Link :{' '}
          <a href={!isEnded && link} target="_blank">
            <Text copyable>{link}</Text>
          </a>
          {isEnded && <span> Ended</span>}
        </p>
      </div>
    </>
  );
};

export default Header;
