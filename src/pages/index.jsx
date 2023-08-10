"use client";

import { Button, Input, Pagination } from "antd";
import Head from "next/head";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef, useMemo } from "react";
import { FilterOutlined } from "@ant-design/icons";
import OrderModal from "../components/orderModal";
const Index = () => {
  const ITEMS_PER_PAGE = 5;

  const orders = [
    {
      id: 1,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 2,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Cancelled",
    },
    {
      id: 3,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 4,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "In Progress",
    },
    {
      id: 5,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Completed",
    },
    {
      id: 6,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "In Progress",
    },
    {
      id: 7,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 8,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "New",
    },
    {
      id: 9,
      orderId: "PK756466",
      customer: "James Williams",
      amount: "$124.00",
      payment: "PayPal",
      orderDate: "August 06, 2023",
      status: "Cancelled",
    },
  ];

  const actionsRef = useRef();
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [activeButton, setActiveButton] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [delivered, setDelivered] = useState(0);
  const [pickup, setPickup] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [sortByDate, setSortByDate] = useState(false);

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
    if (sortByDate) {
      setFilteredOrders(
        [...filteredOrders].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
        ),
      );
    } else {
      setFilteredOrders(
        [...filteredOrders].sort(
          (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
        ),
      );
    }
  };
  useEffect(() => {
    const deliveredOrders = orders.filter(
      (order) => order.status === "Completed",
    );
    setDelivered(deliveredOrders.length);
  }, [orders]);

  useEffect(() => {
    const pickupOrders = orders.filter(
      (order) => order.status === "In Progress",
    );
    setPickup(pickupOrders.length);
  }, [orders]);

  useEffect(() => {
    const cancelledOrders = orders.filter(
      (order) => order.status === "Cancelled",
    );
    setCancelled(cancelledOrders.length);
  }, [orders]);

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handlemodify = (orderId) => {
    setShowActions(false);
    setShowModifyModal(true);
  };

  const handleModifyToggle = (productId) => {
    setSelectedProductId(productId);
    setShowModify(!showModify);
    setShowModifyModal(true);
  };

  const handleDeleteConfirmation = () => {
    const updatedOrders = orders.filter(
      (order) => order.id !== selectedProductId,
    );
    const updated = orders.filter((order) => order.id !== selectedProductId);

    setAllOrders(updatedOrders);
    setSelectedProductId(null);
    setShowDeleteModal(false);
  };

  const handleOrderModal = () => {
    setShowOrderModal(true);
    console.log("modal open");
  };

  const handleDelete = (orderId) => {
    setShowActions(false);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  const handleModifyCancel = () => {
    setShowModifyModal(false);
    setSelectedProductId(null);
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
          <div className="flex justify-between items-center w-full px-3 flex-wrap-reverse">
            <div className="relative flex items-center w-full sm:w-auto">
              <Image
                src="/images/search.svg"
                className="text-gray-500 absolute top-[13px] left-4 z-10"
                width={15}
                height={15}
              />
              <Input
                placeholder="Search Order..."
                className={` fontFamily pl-10 py-2 text-[#777777]`}
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div className="flex items-center w-full sm:w-auto">
              <Button
                type="primary"
                className="create-order-button w-full sm:w-auto mb-4 sm:mb-0"
                onClick={handleOrderModal}
                style={{
                  backgroundColor: "#A51F6C",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  height: "45px",
                }}>
                Create Order
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center my-5 px-2 w-full flex-wrap  ">
            <div className="flex text-[#777777]">
              <button
                className={`uppercase font-[500] mr-3 ${
                  activeButton === "All" ? "text-[#A51F6C]" : ""
                }`}
                onClick={() => {
                  setActiveButton("All");
                  setFilteredOrders(orders);
                }}>
                All Orders {" ("}
                {orders.length}
                {") "}
              </button>
              <button
                className={`uppercase font-[500] mr-3 ${
                  activeButton === "Delivered" ? "text-[#A51F6C]" : ""
                }`}
                onClick={() => {
                  setActiveButton("Delivered");
                  const deliveredOrders = orders.filter(
                    (order) => order.status === "Completed",
                  );
                  setFilteredOrders(deliveredOrders);
                }}>
                Delivered {" ("}
                {delivered}
                {") "}
              </button>
              <button
                className={`uppercase font-[500] mr-3 ${
                  activeButton === "PickUp" ? "text-[#A51F6C]" : ""
                }`}
                onClick={() => {
                  setActiveButton("PickUp");
                  const pickupOrders = orders.filter(
                    (order) => order.status === "In Progress",
                  );
                  setFilteredOrders(pickupOrders);
                }}>
                PickUp {" ("}
                {pickup}
                {") "}
              </button>
              <button
                className={`uppercase font-[500] mr-3 ${
                  activeButton === "Cancelled" ? "text-[#A51F6C]" : ""
                }`}
                onClick={() => {
                  setActiveButton("Cancelled");
                  const cancelledOrders = orders.filter(
                    (order) => order.status === "Cancelled",
                  );
                  setFilteredOrders(cancelledOrders);
                }}>
                Cancelled {" ("}
                {cancelled}
                {") "}
              </button>
            </div>
            <div className="flex items-center justify-center w-full sm:w-auto pt-6 sm:mt-0">
              <button
                className={`rounded-md bg-[#2668E81A] border border-[#2668E842] px-3 py-1 text-[#2668e8] font-[500] mr-3`}
                onClick={handleSortByDate}>
                <FilterOutlined style={{ color: "#2668e8" }} />
              </button>
            </div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
        <div>
          {/* Table */}
          <div className="w-full h-full  px-5 py-4 ">
            <table
              className="w-full hidden lg:table border border-[#DFDFDF] "
              style={{ borderRadius: "30px" }}>
              <thead className=" my-3 fontFamily  border-b border-[DFDFDF] uppercase">
                <tr className="text-[#777777]  text-left px-4 py-2">
                  <th className=" px-2 font-[500] text-center text-sm md:text-[14px]">
                    Order ID
                  </th>
                  <th className="px-3 font-[500] text-center text-sm md:text-[14px]">
                    Customer
                  </th>
                  <th className="px-3 font-[500] text-center py-4 mx-2 text-sm md:text-[14px]">
                    Amount
                  </th>
                  <th className="font-[500] text-center text-sm md:text-[14px]">
                    Payment
                  </th>
                  <th className="font-[500] text-center text-sm md:text-[14px]">
                    Order Date
                  </th>
                  <th className=" font-[500] text-center text-sm md:text-[14px]">
                    Status
                  </th>
                  <th className=" font-[500] text-center text-sm md:text-[14px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-gray-200 border-b border-[DFDFDF] `}>
                    {/* Checkbox column */}
                    <td className="text-center text-[#110F0F]">
                      <p>{order.orderId}</p>
                    </td>
                    <td className="font-[400] text-center ">
                      <p className="text-[#110F0F] text-[14px]">
                        {order.customer}
                      </p>
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
                        style={getStatusStyle(order.status)}>
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
            <div className="lg:hidden flex flex-col space-y-4">
              {filteredOrders.slice(startIndex, endIndex).map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-md border border-grey-500 shadow-md my-5 p-3">
                  <div className="flex justify-between items-center border-b border-[#A51F6C] mt-2 pb-3 flex-wrap w-full">
                    <div className="">
                      <h3 className="font-semibold text-base">Order ID</h3>
                      <p className="text-base">{order.orderId}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-base">Customer</h3>
                      <p className="text-base">{order.customer}</p>
                    </div>

                    <div className="w-10 h-10 py-3 rounded-full border border-[#A51F6C] flex items-center justify-center">
                      <Image
                        src="/images/more.svg"
                        width={4}
                        height={4}
                        alt="More Options"
                      />
                    </div>
                  </div>

                  <div className="flex  items-center mt-2 w-full border-b border-[#A51F6C] pb-3 mt-3 flex-wrap ">
                    <div className=" mr-[30%]">
                      <h3 className="font-semibold text-base">Payment</h3>
                      <p className="text-base">{order.payment}</p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold text-base">Order Date</h3>
                      <p className="text-base">{order.orderDate}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pb-3 mt-3 w-full flex-wrap">
                    <div>
                      <p className="font-semibold text-lg">Price</p>
                      <p className="font-[600] text-blue-600 text-lg">
                        {order.amount}
                      </p>
                    </div>

                    <p
                      className={`rounded-md px-2 py-1 text-[18px] font-[400] text-center `}
                      style={getStatusStyle(order.status)}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
              <Pagination
                current={currentPage}
                pageSize={ITEMS_PER_PAGE}
                total={filteredOrders.length}
                onChange={onPageChange}
                className="my-4 flex justify-center"
              />
            </div>
          </div>
        </div>

        <OrderModal
          visible={showOrderModal}
          onCancel={() => setShowOrderModal(false)}
          onSubmit={() => console.log("submitted")}
        />
      </div>
    </div>
  );
};

export default Index;
