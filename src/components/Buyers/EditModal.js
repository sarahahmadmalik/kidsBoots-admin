import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

function EditModal({ visible, onCancel, onOk, editForm, selectedBuyer }) {
  const [status, setStatus] = useState('Default');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleFormSubmit = async () => {
    try {
      const values = await editForm.validateFields();
      onOk({ image: fileList, group: status, ...values });
      editForm.resetFields();
      setFileList([]);
      setStatus('Default');
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  const handleCancel = () => {
    onCancel();
    editForm.resetFields();
  };

  return (
    <Modal
      title="Edit Buyer"
      visible={visible}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      footer={[
        <Button key="submit" type="primary" onClick={() => handleFormSubmit()} className="submit-button">
          Submit
        </Button>,
      ]}
    >
      <Form form={editForm} layout="vertical" initialValues={selectedBuyer}>
        <Form.Item name="id" label="Buyer ID" rules={[{ required: true, message: 'Enter Buyer ID' }]}>
          <Input placeholder="Enter Buyer ID" />
        </Form.Item>
        <Form.Item name="name" label="Buyer Name" rules={[{ required: true, message: 'Enter Buyer Name' }]}>
          <Input placeholder="Enter Buyer Name" />
        </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Enter Country' }]}>
          <Input placeholder="Enter Country" />
        </Form.Item>
        <Form.Item
          name="registered"
          label="Registered Date"
          rules={[{ required: true, message: 'Select Registered Date' }]}
        >
          <DatePicker style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item
          name="group"
          label="Group"
        >
          <Select defaultValue="Default" value={status} onChange={setStatus}>
            <Option value="Default">Default</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="spent"
          label="Spent Amount"
          rules={[
            {
              required: true,
              validator: (_, value) =>
                isNaN(value) ? Promise.reject('Spent Amount should be a valid number') : Promise.resolve(),
            },
          ]}
        >
          <Input type="number" placeholder="Enter Spent Amount" />
        </Form.Item>
      </Form>
      
    </Modal>
    
  );
}

export default EditModal;
