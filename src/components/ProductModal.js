import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

function ProductModal({ visible, onCancel, onSubmit }) {
  const [form] = Form.useForm();
  const [status, setStatus] = useState('Available');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({ ...values, image: fileList[0], status });
      form.resetFields();
      setFileList([]);
      setStatus('Available');
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
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Create Product"
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary"  onClick={handleFormSubmit}  className="submit-button hover:bg-[#DB3293]">
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="productID" label="Product ID" rules={[{ required: true, type: 'string', message: 'Enter Product Id' }]}>
          <Input placeholder="Enter Product ID" />
        </Form.Item>
        <Form.Item name="product" label="Product" rules={[{ required: true, type: 'string', message: 'Enter Product Name' }]}>
          <Input placeholder="Enter Product Name" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, type: 'number', min: 0.01, message: 'Price should be greater than 0' }]}
        >
          <Input type="number" placeholder="Enter Price" />
        </Form.Item>
        <Form.Item name="pieces" label="Pieces">
          <Input addonAfter="PC" type="number" placeholder="Enter Number of Pieces" />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select
            defaultValue="Available"
            dropdownStyle={{ backgroundColor: '#ffffff', padding: '3' }}
            onChange={setStatus}
            value={status}
          >
            <Option value="Available">Available</Option>
            <Option value="Disabled">Disabled</Option>
          </Select>
        </Form.Item>
        <Form.Item name="image" label="Product Image">
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

 
      </Form>
    </Modal>
  );
}

export default ProductModal;
