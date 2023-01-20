import { Button, Dropdown, Space, Typography } from 'antd';
import { FaEllipsisV } from 'react-icons/fa';
import UpdateMeeting from '../meeting/UpdateMeeting';
import RecognitionSwitch from './RecognitionSwitch';

const { Paragraph, Text, Title } = Typography;

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
          <Title level={3} style={{ marginBottom: 0 }}>
            {name}
          </Title>
          <Text type="secondary">{subject}</Text>
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
              <Button
                type="primary"
                onClick={async () =>
                  openInMeeting(await window.electronAPI.getAccessToken())
                }
              >
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
                <Text type="secondary">
                  <FaEllipsisV />
                </Text>
              </Button>
            </Dropdown>
          </Space>
        </div>
      </div>
      <div>
        <Paragraph>Description : {description}</Paragraph>
        <Paragraph>
          Link :{' '}
          <a href={!isEnded && link} target="_blank">
            {link}
          </a>
          {isEnded && <span> Ended</span>}
        </Paragraph>
      </div>
    </>
  );
};

export default Header;
