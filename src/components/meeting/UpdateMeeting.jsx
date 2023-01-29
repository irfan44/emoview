import { useEffect, useState } from 'react';
import { Form, Input, Modal, Progress, Radio, Segmented } from 'antd';
import { GrEdit } from 'react-icons/gr';
import { updateMeeting } from '../../api/meeting';

const { TextArea } = Input;

const UpdateMeetingForm = ({ open, onSubmit, onCancel, initialValues }) => {
  const [tabValue, setTabValue] = useState('Description');

  const [form] = Form.useForm();
  const beforeUpdate = {
    ...initialValues,
    // size: initialValues.configuration.size,
    // emotionDisplay: initialValues.configuration.emotionDisplay,
  };

  useEffect(() => {
    form.setFieldsValue(beforeUpdate);
  }, [beforeUpdate]);

  return (
    <Modal
      forceRender
      open={open}
      title="Update Meeting"
      okText="Update"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
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
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />
      </div> */}
      <Form form={form} layout="vertical" initialValues={initialValues}>
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
          <Input />
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
          <Input />
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
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Google Meet Link"
          name="link"
          rules={[
            {
              required: true,
              message: 'Please insert google meet link!',
            },
          ]}
          style={{
            display: tabValue === 'Description' ? 'block' : 'none',
          }}
        >
          <Input />
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

const UpdateMeetingModal = ({ fetchData, initialValues }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values) => {
    setOpen(false);

    const { name, subject, description, link, size, emotionDisplay } = values;

    try {
      const getCode = link.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/g);
      const code = getCode[0];
      await updateMeeting(
        initialValues._id,
        name,
        subject,
        description,
        link,
        code,
        size,
        emotionDisplay
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <a className="flex items-center space-x-2" onClick={() => setOpen(true)}>
        <GrEdit />
        <span>Edit Meeting</span>
      </a>
      <UpdateMeetingForm
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </>
  );
};

export default UpdateMeetingModal;
