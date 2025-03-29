
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import ButtonLogout from "../button-logout";

export default function NavTopUser() {
  return (
    <nav className='flex justify-between items-center px-4 py-1'>
      <div className="flex items-center">
        <IoLocationSharp size={20} className="text-gray-500"/>
        <p className="text-xs text-gray-500">Store Location: Sudirman Square, Jakarta, Indonesia</p>
      </div>

      <div>
        <ButtonLogout/>
      </div>
    </nav>
  )
}
