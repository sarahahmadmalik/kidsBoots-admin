import React, { useState } from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button } from 'antd';

const { Option } = Select;

function OrderModal({ visible, onCancel, onSubmit, selectedOrder, editForm }) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleFormSubmit = () => {
    editForm.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return { backgroundColor: '#49E258' };
      case 'In Progress':
        return { backgroundColor: '#F0E74A' };
      case 'Cancelled':
        return { backgroundColor: '#D94B38' };
      default:
        return { backgroundColor: '#2668E81A' };
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Create Order"
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={editForm} layout="vertical" initialValues={selectedOrder}>
        <Form.Item name="orderId" label="Order ID" rules={[{ required: true, type: 'string', message: 'Enter orderId' }]}>
          <Input placeholder="Enter Order ID" />
        </Form.Item>
        <Form.Item name="customer" label="Customer" rules={[{ required: true, type: 'string', message: 'Enter Customer Name' }]}>
          <Input placeholder="Enter Customer Name" />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              validator: (_, value) =>
                isNaN(value) ? Promise.reject(' Amount should be a valid number') : Promise.resolve(),
            },
          ]}
        >
          <Input type="number" placeholder="Enter Amount" />
        </Form.Item>
        <Form.Item label="Payment Method">
          <Radio.Group onChange={(e) => handlePaymentMethodChange(e.target.value)} value={paymentMethod}>
            <Radio value="paypal">PayPal</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="orderDate" label="Order Date" rules={[{ required: true,  message: 'Select a date' }]}>
          <DatePicker style={{width: "100%"}} />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select
            defaultValue="New"
            dropdownStyle={{ backgroundColor: '#ffffff', padding: '3' }}
          >
            <Option
              value="New"
              style={{
                background: '#2668E81A',
                transition: 'background-color 0.3s ease',
              }}
            >
              New
            </Option>
            <Option
              value="In Progress"
              style={{
                background: '#FFF9F4',
                transition: 'background-color 0.3s ease',
              }}
            >
              In Progress
            </Option>
            <Option
              value="Completed"
              style={{
                background: '#E826261A',
                transition: 'background-color 0.3s ease',
              }}
            >
              Completed
            </Option>
            <Option
              value="Cancelled"
              style={{
                background: '#36E82617',
                transition: 'background-color 0.3s ease',
              }}
            >
              Cancelled
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default OrderModal;
