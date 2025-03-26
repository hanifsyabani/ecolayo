import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

export default function Sosmed() {
  return (
    <>
      <div className="flex items-center gap-3">
        <p className="text-sm">Share Product</p>
        <div className="flex items-center gap-2">
          <FaFacebook
            size={30}
            className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
          />
          <FaInstagram
            size={30}
            className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
          />
          <FaTwitter
            size={30}
            className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
          />
          <FaPinterest
            size={30}
            className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
          />
        </div>
      </div>
    </>
  );
}
