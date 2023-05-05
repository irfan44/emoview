import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { createMeeting } from '../../api/meeting';

const { TextArea } = Input;

const AddMeetingForm = ({ open, onSubmit, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Add New Meeting"
      okText="Add"
      onCancel={onCancel}
      confirmLoading={isLoading}
      cancelButtonProps={{ type: 'text' }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setIsLoading(true);
            onSubmit(values);
            form.resetFields();
            setIsLoading(false);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" style={{ marginTop: '16px' }}>
        <Form.Item
          label="Name"
          name="meetingName"
          rules={[
            {
              required: true,
              message: 'Please insert meeting name!',
            },
          ]}
        >
          <Input placeholder="Insert meeting name here" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please insert meeting description!',
            },
          ]}
        >
          <TextArea rows={4} placeholder="Insert meeting description here" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddMeetingModal = ({
  fetchData,
  updateDetails,
  classDetails,
  addMeetingRef,
}) => {
  const [open, setOpen] = useState(false);
  let initialName;
  let initialLink;
  let initialMeetCode;
  let initialCountOfMeetings;

  if (classDetails) {
    const { name, link, meetCode, countOfMeetings } = classDetails[0];
    initialName = name;
    initialLink = link;
    initialMeetCode = meetCode;
    initialCountOfMeetings = countOfMeetings;
  }

  const handleSubmit = async (values) => {
    const { meetingName, description } = values;

    try {
      await createMeeting({
        name: meetingName,
        subject: initialName,
        description: description,
        link: initialLink,
        meetCode: initialMeetCode,
        countOfMeetings: initialCountOfMeetings,
      });
      setOpen(false);
      fetchData();
      updateDetails();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button ref={addMeetingRef} type="primary" onClick={() => setOpen(true)}>
        Add Meeting
      </Button>
      <AddMeetingForm
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddMeetingModal;
