import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, DatePicker, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

function BuyerModal({ visible, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const [status, setStatus] = useState('Default');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      setStatus('Available');
      form.resetFields();
    });
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
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Add Buyer"
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleFormSubmit} className="submit-button hover:bg-[#DB3293]">
          Add
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="buyerId"
          label="Buyer ID"
          rules={[{ required: true, message: 'Enter Buyer ID' }]}
        >
          <Input placeholder="Enter Buyer ID" />
        </Form.Item>
        <Form.Item
          name="buyerName"
          label="Buyer Name"
          rules={[{ required: true, message: 'Enter Buyer Name' }]}
        >
          <Input placeholder="Enter Buyer Name" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Enter Country' }]}
        >
           <Select defaultValue="USA">
            <Option value="USA">USA</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="registeredDate"
          label="Registered Date"
          rules={[{ required: true, message: 'Select Registered Date' }]}
        >
          <DatePicker style={{width: "100%"}} />
        </Form.Item>
        <Form.Item
          name="group"
          label="Group"
         
        >
          <Select defaultValue="Default"  value={status}   onChange={setStatus}>
            <Option value="Default"
           >Default</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="spentAmount"
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
        <Form.Item name="image" label="Buyer Image">
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            onChange={({ fileList }) => setFileList(fileList)}
            style={{width: "100%"}}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default BuyerModal;
