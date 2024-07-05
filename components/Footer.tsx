"use client";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { MdMarkEmailRead } from "react-icons/md";
export default function Footer() {
  return (
    <footer className="h-[200px] px-3 pb-5 pt-7 flex justify-between shadow-xl mt-11 bg-muted">
      <div className="flex justify-end flex-col opacity-50">
        <p>© 2024 doantri.hung</p>
      </div>
      <div className="lg:mr-20 mr-5 flex flex-col gap-5 font-light">
        <div className="flex items-center gap-3">
          <MdMarkEmailRead size={24} className="text-cyan-900" />
          <p className="hover:underline">koikoidth12@gmail.com</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100026377400074"
          >
            <FaSquareFacebook size={30} className="text-cyan-700" />
          </a>

          <a target="_blank" href="https://www.instagram.com/doantri.hung/">
            <GrInstagram size={30} className="text-cyan-700" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/%C4%91o%C3%A0n-tr%C3%AD-h%C3%B9ng-29a077252/">
            <FaLinkedin size={30} className="text-cyan-700" />
          </a>
        </div>
      </div>
    </footer>
  );
}
