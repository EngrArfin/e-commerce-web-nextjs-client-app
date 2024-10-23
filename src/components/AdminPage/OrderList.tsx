"use client";
import { useState } from "react";

interface Order {
  id: number;
  customerName: string;
  date: string;
  total: number;
  status: string;
}

const initialOrders: Order[] = [
  {
    id: 1,
    customerName: "John Doe",
    date: "2024-10-20",
    total: 150.5,
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    date: "2024-10-21",
    total: 200.0,
    status: "Completed",
  },
];

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Order Management</h1>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4">Order ID</th>
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.customerName}</td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4">${order.total.toFixed(2)}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleUpdateStatus(order.id, "Completed")}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1"
                >
                  Cancel Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
