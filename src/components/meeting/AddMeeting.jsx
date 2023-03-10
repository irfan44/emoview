import { useState } from 'react';
import { Button, Form, Input, Modal, Progress, Radio, Segmented } from 'antd';
import { createMeeting } from '../../api/meeting';
import Subtitle from '../common/typography/Subtitle';

const { TextArea } = Input;

const AddMeetingForm = ({ open, onSubmit, onCancel }) => {
  const [tabValue, setTabValue] = useState('Description');
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
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Segmented
          options={['Description', 'In Meeting View']}
          value={tabValue}
          onChange={setTabValue}
          style={{ marginTop: '16px' }}
        />
      </div> */}
      <Form form={form} layout="vertical" style={{ marginTop: '16px' }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please insert meeting name!',
            },
          ]}
          style={{
            display: tabValue === 'Description' ? 'block' : 'none',
          }}
        >
          <Input placeholder="Insert meeting name here" />
        </Form.Item>
        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: 'Please insert meeting subject!',
            },
          ]}
          style={{
            display: tabValue === 'Description' ? 'block' : 'none',
          }}
        >
          <Input placeholder="Insert meeting subject here" />
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
          style={{
            display: tabValue === 'Description' ? 'block' : 'none',
          }}
        >
          <TextArea rows={4} placeholder="Insert meeting description here" />
        </Form.Item>
        <Form.Item
          label="Google Meet Link"
          name="link"
          extra="Google Meet link can only be used once"
          rules={[
            {
              required: true,
              message: 'Please insert google meet link!',
            },
            {
              pattern: new RegExp(
                /meet.google.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}/
              ),
              message: 'Please insert a valid google meet link',
            },
          ]}
          style={{
            display: tabValue === 'Description' ? 'block' : 'none',
          }}
        >
          <Input
            className="mb-1"
            placeholder="Example: https://meet.google.com/abc-defg-hij"
          />
        </Form.Item>
        {/* <Form.Item
          label="Size"
          name="size"
          style={{
            display: tabValue === 'In Meeting View' ? 'block' : 'none',
          }}
        >
          <Radio.Group buttonStyle="solid">
            <Radio value="large">Large</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="small">Small</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Emotion Display"
          name="emotionDisplay"
          style={{
            display: tabValue === 'In Meeting View' ? 'block' : 'none',
          }}
        >
          <Radio.Group>
            <Radio value="circle">
              <Progress
                type="circle"
                percent={50}
                width={60}
                format={() => 'Circle'}
              />
            </Radio>
            <Radio value="dashboard">
              <Progress
                type="dashboard"
                percent={50}
                width={60}
                format={() => 'Gauge'}
              />
            </Radio>
            <Radio value="line">
              <div style={{ width: '120px' }}>
                <Progress type="line" percent={50} format={() => 'Bar'} />
              </div>
            </Radio>
          </Radio.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

const AddMeetingModal = ({ fetchData }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values) => {
    const { name, subject, description, link, size, emotionDisplay } = values;

    try {
      const getCode = link.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/g);
      const code = getCode[0];
      await createMeeting(
        name,
        subject,
        description,
        link,
        code,
        size,
        emotionDisplay
      );
      setOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
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
