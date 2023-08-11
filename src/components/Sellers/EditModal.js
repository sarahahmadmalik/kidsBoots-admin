import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

function EditModal({ visible, onCancel, onOk, editForm, selectedSeller }) {
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
  };

  return (
    <Modal
      title="Edit Seller"
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
      <Form form={editForm} layout="vertical" initialValues={selectedSeller}>
        <Form.Item name="id" label="Seller ID" rules={[{ required: true, message: 'Enter Seller ID' }]}>
          <Input placeholder="Enter Seller ID" />
        </Form.Item>
        <Form.Item name="name" label="Seller Name" rules={[{ required: true, message: 'Enter Seller Name' }]}>
          <Input placeholder="Enter Seller Name" />
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
          label="Earn Amount"
          rules={[
            {
              required: true,
              validator: (_, value) =>
                isNaN(value) ? Promise.reject('Earn Amount should be a valid number') : Promise.resolve(),
            },
          ]}
        >
          <Input type="number" placeholder="Enter Earn Amount" />
        </Form.Item>
      </Form>
      
    </Modal>
    
  );
}

export default EditModal;
