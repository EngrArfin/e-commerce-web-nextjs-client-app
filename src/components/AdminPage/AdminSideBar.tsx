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
          <Link href="/admin/userlist">UserList</Link>
        </li>
        <li>
          <Link href="/admin/productmanag">Product Management</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
