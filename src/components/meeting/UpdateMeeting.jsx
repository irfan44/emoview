import { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { GrEdit } from 'react-icons/gr';
import { updateMeeting } from '../../api/meeting';

const { TextArea } = Input;

const UpdateMeetingForm = ({ open, onSubmit, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const beforeUpdate = {
    ...initialValues,
  };

  useEffect(() => {
    form.setFieldsValue(beforeUpdate);
  }, [beforeUpdate]);

  return (
    <Modal
      forceRender
      open={open}
      title="Edit Meeting"
      okText="Edit"
      onCancel={onCancel}
      cancelButtonProps={{ type: 'text' }}
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
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UpdateMeetingModal = ({ fetchData, initialValues }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values) => {
    setOpen(false);

    const { name, description } = values;

    try {
      await updateMeeting({
        emoviewCode: initialValues.emoviewCode,
        name,
        description,
      });
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
