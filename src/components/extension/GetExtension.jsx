import { Modal, Typography } from 'antd';
import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { IoExtensionPuzzle } from 'react-icons/io5';

const { Text } = Typography;

const GetExtension = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a className="flex items-center space-x-2" onClick={showModal}>
        <IoExtensionPuzzle />
        <span>Get Extension</span>
      </a>
      <Modal
        title="Get Emoview Extension"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelButtonProps={{ hidden: true }}
      >
        <p className="mb-4">
          Emoview Extension is used to capture emotion of the participants of
          your meetings. Participant's emotion will show up in Emoview's chart
          at Meeting Details page *
        </p>
        <div className="flex flex-col mb-4">
          <span>Get extension **</span>
          <a href="https://bit.ly/EmoviewExtension" target="_blank">
            <Text
              className="text-[#0066ff] hover:text-[#69b1ff]"
              copyable={{ icon: <FaRegCopy className="text-black" /> }}
            >
              https://bit.ly/EmoviewExtension
            </Text>
          </a>
        </div>
        <p className="mb-2 text-black/[.60] text-xs">
          * Participant's emotion will not show up if they didn't install this
          extension
        </p>
        <p className="text-black/[.60] text-xs">
          ** This extension is only for use in Google Chrome, Microsoft Edge, or
          other Chromium based browser.{' '}
          <a
            href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
            target="_blank"
          >
            Learn more
          </a>
        </p>
      </Modal>
    </>
  );
};

export default GetExtension;
