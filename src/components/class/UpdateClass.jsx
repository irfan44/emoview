import { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { GrEdit } from 'react-icons/gr';
import { updateClass } from '../../api/class.js';

const { TextArea } = Input;

const UpdateClassForm = ({ open, onSubmit, onCancel, initialValues }) => {
  const [isLoading, setIsLoading] = useState(false);

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
      title="Edit Class"
      okText="Edit"
      onCancel={onCancel}
      cancelButtonProps={{ type: 'text' }}
      confirmLoading={isLoading}
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
      <Form form={form} layout="vertical" initialValues={initialValues}>
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

const UpdateClassModal = ({ fetchData, initialValues }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values) => {
    setOpen(false);

    const { name, description } = values;

    try {
      await updateClass({
        meetCode: initialValues.meetCode,
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
        <span>Edit Class</span>
      </a>
      <UpdateClassForm
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

export default UpdateClassModal;
