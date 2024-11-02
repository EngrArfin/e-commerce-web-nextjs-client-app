"use client";

interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}

interface AdminDashboardProps {
  users: User[];
  totalSales: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  users,
  totalSales,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold">Total Orders</h2>
          <p className="text-xl">{users?.length || 0}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold">Total Sales</h2>
          <p className="text-xl">${totalSales}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold">Total Users</h2>
          <p className="text-xl">{users?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
