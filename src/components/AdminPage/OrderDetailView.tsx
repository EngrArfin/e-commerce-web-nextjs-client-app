"use client";
import { useState } from "react";

interface OrderDetail {
  id: number;
  customerName: string;
  date: string;
  total: number;
  status: string;
  items: { name: string; quantity: number; price: number }[];
}

const initialOrderDetail: OrderDetail = {
  id: 1,
  customerName: "John Doe",
  date: "2024-10-20",
  total: 150.5,
  status: "Pending",
  items: [
    { name: "Product 1", quantity: 2, price: 50.0 },
    { name: "Product 2", quantity: 1, price: 50.5 },
  ],
};

const OrderDetailView = () => {
  const [orderDetail] = useState<OrderDetail>(initialOrderDetail);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Order Detail</h1>
      <div className="bg-white shadow-md rounded mb-4 p-4">
        <h2 className="text-xl font-bold">Order ID: {orderDetail.id}</h2>
        <p>Customer: {orderDetail.customerName}</p>
        <p>Date: {orderDetail.date}</p>
        <p>Total: ${orderDetail.total.toFixed(2)}</p>
        <p>Status: {orderDetail.status}</p>
        <h3 className="text-lg font-bold mt-4">Items:</h3>
        <ul className="list-disc ml-5">
          {orderDetail.items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailView;
