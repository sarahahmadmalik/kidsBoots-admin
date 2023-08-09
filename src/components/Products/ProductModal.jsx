// import { Button, Form, Input, Modal, Select, Upload, notification } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import productApi from "@/lib/product";
// import { db, storage } from "@/config/firebase";
// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytes,
// } from "firebase/storage";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { Firestore, serverTimestamp } from "firebase/firestore";

// const ProductModal = (props) => {
//   console.log("props", props);
//   const queryClient = useQueryClient();
//   const [imageList, setImageList] = useState([]);
//   const addMutation = useMutation(
//     ["products"],
//     async (data) => {
//       await productApi.addProduct(data);
//     },
//     {
//       onError: (data) => {},
//       onSuccess: () => {
//         notification.open({
//           type: "success",
//           message: "Product saved successfully",
//           placement: "top",
//         });
//         queryClient.invalidateQueries(["products"]);
//         props.close();
//       },
//     }
//   );

//   const handleSubmit = (values) => {
//     // console.log("values", values);
//     // console.log("image list", imageList);
//     // const timestamp =Firestore.FieldValue.serverTimestamp();
//     // const timestamp = serverTimestamp();
//     // console.log("timestamp", timestamp);
//     addMutation.mutate({
//       ...values,
//       stock: parseInt(values.stock),
//       price: parseFloat(values.price),
//       images: imageList,
//       // createdAt: timestamp,
//       // updatedAt: timestamp,
//     });
//   };

//   return (
//     <Modal
//       title="Add New Product"
//       open={props.show}
//       footer={null}
//       onCancel={props.close}
//     >
//       <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
//         <Form
//           size="large"
//           name="basic"
//           onFinish={handleSubmit}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "column",
//             width: "100%",
//           }}
//         >
//           <Form.Item
//             style={{ width: "100%" }}
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: "Input product name",
//               },
//             ]}
//           >
//             <Input placeholder="Product name" style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             style={{ width: "100%" }}
//             name="category"
//             rules={[
//               {
//                 required: true,
//                 message: "Select category",
//               },
//             ]}
//           >
//             <Select
//               style={{ width: "100%" }}
//               placeholder="Select Category"
//               options={props?.categories?.map((e) => {
//                 return {
//                   label: e?.name,
//                   value: e?.id,
//                 };
//               })}
//             />
             
//           </Form.Item>
//           <Form.Item
//             style={{ width: "100%" }}
//             name="SubCategory"
//             rules={[
//               {
//                 required: true,
//                 message: "Select Subcategory",
//               },
//             ]}
//           >
//             <Select
//               style={{ width: "100%", marginTop: 2 }}
//               placeholder="Select SubCategory"
//               options={props?.categories?.map((e) => {
//                 return {
//                   label: e?.name,
//                   value: e?.id,
//                 };
//               })}
//             />
//           </Form.Item>
//           <Form.Item
//             style={{ width: "100%" }}
//             name="SKU"
//             rules={[
//               {
//                 required: true,
//                 message: "Input product SKU",
//               },
//             ]}
//           >
//             <Input placeholder="Product SKU" style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item
//             style={{ width: "100%" }}
//             name="price"
//             rules={[
//               {
//                 required: true,
//                 message: "Input product price",
//               },
//             ]}
//           >
//             <Input placeholder="Product price" style={{ width: "100%" }} />
//           </Form.Item>

//           <Form.Item
//             style={{ width: "100%" }}
//             name="stock"
//             rules={[
//               {
//                 required: true,
//                 message: "Input stock items",
//               },
//             ]}
//           >
//             <Input placeholder="Items in stock" style={{ width: "100%" }} />
//           </Form.Item>
//           <Form.Item style={{ width: "100%" }} name="desc">
//             <Input.TextArea
//               cols={4}
//               rows={4}
//               placeholder="Description"
//               style={{ width: "100%" }}
//             />
//           </Form.Item>

//           <Form.Item
//             label="Upload Images"
//             style={{ width: "100%" }}
//             rules={[
//               {
//                 required: true,
//                 message: "Please upload atleast one image!",
//               },
//             ]}
//             required
//           >
//             <Upload
//               listType="picture-card"
//               maxCount={5}
//               // beforeUpload={(file) => {
//               //   if (file.size > 100000) {
//               //     document.getElementById("errorMsg").textContent =
//               //       "File size should be less than 100MB";
//               //     return Upload.LIST_IGNORE;
//               //   }
//               // }}
//               customRequest={(e) => {
//                 const imageRef = ref(
//                   storage,
//                   `product_images/${e.file.name + e.file.uid}`
//                 );
//                 uploadBytes(imageRef, e.file).then((snapshot) => {
//                   e.onSuccess("ok");
//                   getDownloadURL(snapshot.ref).then((url) => {
//                     setImageList([
//                       ...imageList,
//                       {
//                         id: uuidv4(),
//                         url,
//                       },
//                     ]);
//                   });
//                 });
//               }}
//               onRemove={(e) => {
//                 const imageRef = ref(
//                   storage,
//                   `product_images/${e.name + e.uid}`
//                 );
//                 getDownloadURL(imageRef).then((url) => {
//                   const updated = imageList.filter((e) => e !== url.toString());
//                   setImageList(updated);
//                 });
//                 deleteObject(imageRef);
//               }}
//             >
//               <div>
//                 <PlusOutlined />
//                 <div
//                   style={{
//                     marginTop: 8,
//                   }}
//                 >
//                   Upload
//                 </div>
//               </div>
//             </Upload>
//             {/* <Text type="danger" id="errorMsg"></Text> */}
//           </Form.Item>

//           <Form.Item>
//             <Button
//               className="hover:bg-[#49A5FF] transition-ease 1000ms"
//               style={{background: "#0852C1"}}
//               size="large"
//               type="primary"
//               htmlType="submit"
//               disabled={addMutation.isLoading}
//             >
//               {addMutation.isLoading ? "Submitting..." : "Submit"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </Modal>
//   );
// };

// export default ProductModal;
