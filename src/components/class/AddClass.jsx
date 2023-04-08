import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { createClass } from '../../api/class.js';

const { TextArea } = Input;

const AddClassForm = ({ open, onSubmit, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Add New Class"
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
        >
          <Input
            className="mb-1"
            placeholder="Example: https://meet.google.com/abc-defg-hij"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddClassModal = ({ fetchData, addClassRef }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values) => {
    const { name, description, link } = values;

    try {
      const getCode = link.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/g);
      const meetCode = getCode[0];
      await createClass({ meetCode, name, description, link });
      setOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} ref={addClassRef}>
        Add Class
      </Button>
      <AddClassForm
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddClassModal;
