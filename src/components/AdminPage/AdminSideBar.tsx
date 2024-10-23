import Link from "next/link";
const AdminSideBar = async () => {
  /* const session = await getServerSession(authOptions); */
  return (
    <div className="w-fit flex">
      <ul className=" menu bg-base-200 max-h-screen ">
        <li>
          <Link href="/admin">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/profile">Profile</Link>
        </li>

        <li>
          <Link href="/admin/usermanagement">User Management</Link>
        </li>
        <li>
          <Link href="/admin/productmanag">Product Management</Link>
        </li>
        <li>
          <Link href="/admin/addproduct">Add Product</Link>
        </li>
        <li>
          <Link href="/admin/orderview">Order View</Link>
        </li>
        <li>
          <Link href="/admin/orderlist">Order List</Link>
        </li>
        <li>
          <Link href="/admin/paymentrecord">Payment Record</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
