/* import { authOptions } from "@/utils/authOptions";
import Image from "next/image";
import { getServerSession } from "next-auth"; */
import Link from "next/link";

const AdminSideBar = async () => {
  /* const session = await getServerSession(authOptions); */
  return (
    <div>
      <ul className="menu bg-base-200 min-h-screen rounded-box">
        <li>
          {/*
          <Link href="/dashboard">
            
           <Image
              src={session?.user?.image ?? "/default-user-image.png"}
              alt="profile img"
              width={40}
              height={40}
              className=" mx-auto border rounded-full items-center"
            />
             {session?.user?.name}
             </Link> */}
        </li>
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
