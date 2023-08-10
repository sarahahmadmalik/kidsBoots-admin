import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

function EditModal({ visible, onCancel, onOk, editForm, selectedProduct }) {
  const [status, setStatus] = useState('Available');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  
  const handleFormSubmit = async () => {
    try {
      const values = await editForm.validateFields();
      onOk({ image: fileList, status, ...values });
      editForm.resetFields();
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
    editForm.resetFields();
  };

  console.log()

  return (
    <Modal
    title="Edit Product"
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
      <Form form={editForm} layout="vertical" initialValues={selectedProduct} >
        <Form.Item name="productID" label="Product ID" rules={[{ required: true, type: 'number', message: 'Enter Product Id' }]}>
          <Input placeholder="Enter Product ID" />
        </Form.Item>
        <Form.Item name="productName" label="Product Name" rules={[{ required: true, type: 'string', message: 'Enter Product Name' }]}>
          <Input placeholder="Enter Product Name" />
        </Form.Item>
     
<Form.Item
  name="price"
  label="Price"
  rules={[
    {
      required: true,
      validator: (_, value) =>
        isNaN(value) ? Promise.reject('Price should be a valid number') : Promise.resolve(),
    },
  ]}
>
  <Input type="number" placeholder="Enter Price" />
</Form.Item>
<Form.Item
  name="earning"
  label="Total Earning"
  rules={[
    {
      required: true,
      validator: (_, value) =>
        isNaN(value) ? Promise.reject('Earning should be a valid number') : Promise.resolve(),
    },
  ]}
>
  <Input type="number" placeholder="Enter Total Earnings" />
</Form.Item>
        <Form.Item name="sold" label="Pieces" rules={[{ required: true, type: 'number', message: 'Enter Number of Pieces' }]}>
          <Input addonAfter="PC" type='number' placeholder="Enter Number of Pieces" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, type: 'string', message: 'Select Product Status' }]}
        >
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
        <Form.Item
          name="image"
          label="Product Image"
          rules={[{ required: true,  message: 'Upload Product Image' }]}
        >
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

export default EditModal;
