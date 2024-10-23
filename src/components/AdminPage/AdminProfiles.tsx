import { useState, ChangeEvent, FormEvent } from "react";

const AdminProfiles = () => {
  // Sample admin data, replace with real data fetched from server
  const [adminData, setAdminData] = useState({
    name: "John Doe",
    email: "admin@example.com",
  });

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Handle input change for profile updates
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for profile update
  const handleProfileUpdate = (e: FormEvent) => {
    e.preventDefault();
    // Call the API to update profile details here
    console.log("Updated Profile Data:", adminData);
    alert("Profile updated successfully!");
  };

  // Handle form submission for password change
  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Call the API to update the password here
    console.log("New Password:", newPassword);
    alert("Password changed successfully!");
    setNewPassword(""); // Reset password fields
    setConfirmPassword("");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Profile</h1>

      {/* Profile Information Update Form */}
      <div className="bg-white p-6 shadow rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfiles;
