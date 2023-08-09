
"use client"

import { Button , Input} from "antd";
import Head from "next/head";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef, useMemo } from "react";
import { FilterOutlined } from "@ant-design/icons";
import OrderModal from '../components/orderModal';
const Index = () => {

  const orders = [
    {
      id: 1,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 2,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Cancelled",
    },
     {
      id: 3,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 4,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "In Progress",
    },
    {
      id: 5,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Completed",
    },
    {
      id: 6,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "In Progress",
    },
    {
      id: 7,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 8,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 9,
      orderId: 'PK756466',
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Cancelled",
    },
  ];

  const [isContentWrapped, setIsContentWrapped] = useState(false);
  const [isContentWrapped2, setIsContentWrapped2] = useState(false);
  const [isContentWrapped3, setIsContentWrapped3] = useState(false);
  const actionsRef = useRef();
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [activeButton, setActiveButton] = useState('All'); 
  const [filteredOrders, setFilteredOrders] = useState(orders); 
  const [delivered, setDelivered] = useState(0);
  const [pickup, setPickup] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [sortByDate, setSortByDate] = useState(false);

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
    if (sortByDate) {
      setFilteredOrders([...filteredOrders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
    } else {
      setFilteredOrders([...filteredOrders].sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate)));
    }
  };
  useEffect(() => {
    const deliveredOrders = orders.filter((order) => order.status === 'Completed');
    setDelivered(deliveredOrders.length);
  }, [orders]);
  
  useEffect(() => {
    const pickupOrders = orders.filter((order) => order.status === 'In Progress');
    setPickup(pickupOrders.length);
  }, [orders]);
  
  useEffect(() => {
    const cancelledOrders = orders.filter((order) => order.status === 'Cancelled');
    setCancelled(cancelledOrders.length);
  }, [orders]);
  

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsContentWrapped(windowWidth < 759); 
    };


 
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize2 = () => {
      const windowWidth = window.innerWidth;
      setIsContentWrapped2(windowWidth < 420); 
    };
    

 
    handleResize2();

    window.addEventListener("resize", handleResize2);

    return () => {
      window.removeEventListener("resize", handleResize2);
    };
  }, []);

  useEffect(() => {
    const handleResize3 = () => {
      const windowWidth = window.innerWidth;
      setIsContentWrapped3(windowWidth < 381); 
    };
    

 
    handleResize3();

    window.addEventListener("resize", handleResize3);

    return () => {
      window.removeEventListener("resize", handleResize3);
    };
  }, []);


  const handlemodify = (orderId) => {
    setShowActions(false);
    setShowModifyModal(true)

  }

  const handleModifyToggle = (productId) => {
    setSelectedProductId(productId);
    setShowModify(!showModify);
    setShowModifyModal(true)
  };

  const handleDeleteConfirmation = () => {
    const updatedOrders = orders.filter((order) => order.id !== selectedProductId);
    const updated = orders.filter((order) => order.id !== selectedProductId);
   
    setAllOrders(updatedOrders);
    setSelectedProductId(null)
    setShowDeleteModal(false);
  };

  const handleOrderModal = () => {
    setShowOrderModal(true)
    console.log("modal open")
  }


  const handleDelete = (orderId) => {
    setShowActions(false);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null)
  };

  const handleModifyCancel = () => {
    setShowModifyModal(false);
    setSelectedProductId(null)
  };

  const handleActionsToggle = (orderId) => {
    setSelectedProductId(orderId);
    setShowActions(!showActions);
  };

  
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return {
          color: "#1BB10E",
          border: "1px solid #1BB10E",
          backgroundColor: "#36E82617",
        };
      case "New":
        return {
          color: "#2668E8",
          border: "1px solid #2668E8",
          backgroundColor: "#2668E81A",
        };
      case "In Progress":
        return {
          color: "#E88326",
          border: "1px solid #E88326",
          backgroundColor: "#FFF9F4",
        };
      case "Cancelled":
      return {
        color: "#FF0000",
        border: "1px solid #FF0000",
        backgroundColor: "#FFD9D9",
      };
      default:
        return {};
    }
  };


  return (
    <div className="w-full h-full bg-[F9F9F9] px-4 ">
      <Head>
        <title>Orders</title>
      </Head>
      <div className="h-full w-full my-4 py-3  bg-[#FFFFFF] rounded-md">
      <div className="w-full px-3  py-1 border-b border-[#DFDFDF]">
            <div className="flex justify-between items-center w-full px-3 ">
            <div className="relative flex items-center">
              <Image src="/images/search.svg" className="text-gray-500 absolute top-[13px] left-4 z-10" width={15} height={15} />
              <Input
                placeholder="Search Order..."
                className={` fontFamily pl-10 py-2 text-[#777777]`}
                style={{ borderRadius: "5px" }}
              />
            </div>
            <Button
              type="primary"
                className="create-order-button"
              onClick={handleOrderModal}
              style={{
                backgroundColor: "#A51F6C",
                color: "#FFFFFF",
                borderRadius: "8px",
                height: "45px",
                width: "140px",
              }}
            >
              Create Order
            </Button>
            </div>
            
     <div className="flex justify-between items-center my-5 px-2 w-full  ">
          <div className="flex text-[#777777]">
  <button
    className={`uppercase font-[500] mr-3 ${
      activeButton === 'All' ? 'text-[#A51F6C]' : ''
    }`}
    onClick={() => {
      setActiveButton('All');
      setFilteredOrders(orders);
    }}
  >
    All Orders {" ("}{orders.length}{") "}
  </button>
  <button
    className={`uppercase font-[500] mr-3 ${
      activeButton === 'Delivered' ? 'text-[#A51F6C]' : ''
    }`}
    onClick={() => {
      setActiveButton('Delivered');
      const deliveredOrders = orders.filter((order) => order.status === 'Completed');
      setFilteredOrders(deliveredOrders);
    }}
  >
    Delivered {" ("}{delivered}{") "}
  </button>
  <button
    className={`uppercase font-[500] mr-3 ${
      activeButton === 'PickUp' ? 'text-[#A51F6C]' : ''
    }`}
    onClick={() => {
      setActiveButton('PickUp');
      const pickupOrders = orders.filter((order) => order.status === 'In Progress');
      setFilteredOrders(pickupOrders);
    }}
  >
    PickUp {" ("}{pickup}{") "}
  </button>
  <button
    className={`uppercase font-[500] mr-3 ${
      activeButton === 'Cancelled' ? 'text-[#A51F6C]' : ''
    }`}
    onClick={() => {
      setActiveButton('Cancelled');
      const cancelledOrders = orders.filter((order) => order.status === 'Cancelled');
      setFilteredOrders(cancelledOrders);
    }}
  >
    Cancelled {" ("}{cancelled}{") "}
  </button>
</div>
<button
              className={`rounded-md bg-[#2668E81A] border border-[#2668E842] px-3 py-1 text-[#2668e8] font-[500] mr-3`}
              onClick={handleSortByDate}
            >
               <FilterOutlined style={{ color: "#2668e8" }} />
            </button>
          </div>
<div>
           
<div>

</div>
          </div>


          </div>
      <div>
        {/* Table */}
        <div className="w-full h-full overflow-x-auto px-5 py-4 ">

          <table className="w-full hidden md:table border border-[#DFDFDF] " style={{borderRadius: "30px"}}>
          
            <thead className=" my-3 fontFamily  border-b border-[DFDFDF] uppercase">
              <tr className="text-[#777777]  text-left px-4 py-2">
                <th className=" px-2 font-[500] text-center text-sm md:text-[14px]">Order ID</th>
                <th className="px-3 font-[500] text-center text-sm md:text-[14px]">Customer</th>
                <th className="px-3 font-[500] text-center py-4 mx-2 text-sm md:text-[14px]">Amount</th>
                <th className="font-[500] text-center text-sm md:text-[14px]">Payment</th>
                <th className="font-[500] text-center text-sm md:text-[14px]">Order Date</th>
                <th className=" font-[500] text-center text-sm md:text-[14px]">Status</th>
                <th className=" font-[500] text-center text-sm md:text-[14px]">Actions</th>
              </tr>
            </thead>
        
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-200 border-b border-[DFDFDF] `}
                >
                  {/* Checkbox column */}
                  <td className="text-center text-[#110F0F]">
                    <p>{order.orderId}</p>
                  </td>
                  <td className="font-[400] text-center ">
                      <p className="text-[#110F0F] text-[14px]">{order.customer}</p>
        
                  </td>
                  <td className="text-[#110F0F] text-center font-[400] text-[14px]">
                    {order.amount}
                  </td>
                  <td className="text-[#110F0F] text-center font-[400] text-[14px]">
                    {order.payment}
                  </td>
                  <td className="text-[#110F0F] text-center font-[400] text-[14px]">
                    <p>{order.orderDate}</p>
                  </td>
                  <td className=" font-[400] text-[14px] my-2">
                  <p
                        className={`rounded-md px-2 py-1 text-[14px] font-[400] text-center `}
                        style={getStatusStyle(order.status)}
                      >
                      {order.status}
                    </p>
                  </td>{" "}
                 
                  <td className="flex justify-around items-center">
                    <button className="w-[50px] flex items-center justify-center my-3">
                      <Image
                        src="/images/more.svg"
                        width={3}
                        height={3}
                        alt="more"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="md:hidden flex flex-col space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`bg-white rounded-md shadow-md p-4 ${
                  selectedRows.includes(order.id) ? 'bg-blue-100 shadow-lg' : ''
                }`}
              >
                <div className="flex items-center mb-4 ">
                  <div className="rounded-lg overflow-hidden mr-4">
                    <Image
                      src={order.image}
                      width={60}
                      height={60}
                      alt="Product Image"
                    />
                  </div>
                  <div>
                  <p className="font-semibold text-base">{order.name}</p>
                  <div>
                  <p>Category: {" "}{order.category}</p>
                  <p>OrderId: {" "}{order.id}</p>
                  </div>
                 
                  </div>
                  
                 
                  <div className="ml-auto">
                    <button
                      className="p-1 rounded-md hover:bg-gray-200"
                      onClick={() => handleActionsToggle(order.id)}
                    >
                      <Image
                        src="/images/more.svg"
                        width={3}
                        height={3}
                        alt="More Actions"
                      />
                    </button>
                    <div className="relative md:block" ref={actionsRef}>
                      {showActions && selectedProductId === order.id && (
                        <div
                          className="absolute right-0 top-0  w-32 bg-white rounded-md shadow-lg overflow-hidden border "
                          style={{ border: '1px solid #E5E7EB' }}
                        >
                          <button
                            className="block w-full py-1 text-sm text-left px-4 transition-colors duration-200 hover:bg-red-600 text-white overflow-hidden"
                            style={{ backgroundColor: '#F73B3F' }}
                            onClick={() => handleDelete(order.id)}
                           
                          >
                            Delete
                          </button>
                          <button
                            className="block w-full py-1 text-sm text-left px-4 transition-colors duration-200 hover:bg-green-600 text-white overflow-hidden"
                            style={{ backgroundColor: '#0852C1' }}
                            onClick={() => handlemodify(product.id)}
                          >
                            Edit
                          </button>
                        </div>

                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between border-b border-blue-500 pb-3 sm:text-[17px]   flex-wrap items-center mb-2">
                 
                  <div className="flex flex-wrap">
                    <p className="text-[#0852C1] ">Subcategories:</p>
                    <div className="flex flex-wrap">
                    <p className="ml-2 text-[#777777]">sub category-1</p>{","}
                    <p className="ml-2 text-[#777777]">sub category-2</p>
                    </div>
                   
                  </div>
                  
                 
                </div>
                <div className="flex justify-between border-b border-blue-500 pb-3 sm:text-[17px]   flex-wrap items-center mb-2">
                  <p className="text-[#777777] font-[400]  flex">
                    <p className="text-[#0852C1] mr-1">SKU:</p>{" "}{order.sku}
                  </p>
                  <p className="text-[#777777] font-[400] flex ">
                  <p className="text-[#0852C1] mr-1">Payment:</p> {" "}{order.Payment.price}
                  </p>
                  <div className="flex py-2 px-2 bg-blue-500 rounded-md">
                  <p className="text-white font-[400] flex ">
                  {order.Payment.status}
                  </p>
                  </div>
                  
                 
                </div>
                <div className="flex justify-between pt-3  pb-3 mb-2 flex-wrap  sm:text-[17px]">
                  <p className="text-[#777777] font-[400]  flex items-center">
                  <p className="text-[#0852C1] mr-1">Rating:</p> 
                  <div className="flex">
                  {Array.from({ length: order.rate }, (_, index) => (
                        <Image
                          key={index}
                          src="/images/start.svg"
                          width={16}
                          height={16}
                          alt="Star"
                        />
                      ))}
                  </div>
                  </p>
                  <div className="flex items-start justify-center text-white">
                  <p
                      className={`rounded-md px-2 py-2 ${
                        order.status === "Cancelled"
                          ? "bg-[#D94B38]"
                          : order.status === "Completed"
                          ? "bg-[#49E258]"
                          : "bg-[#F0E74A]"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  
                </div>
               
              </div>
            ))}
          </div>   */}
        </div>
      </div>

     <OrderModal visible = {showOrderModal} onCancel={() => setShowOrderModal(false)} onSubmit={()=> console.log("submitted")}/>
    
    </div>
    </div>
  );
};

export default Index;
