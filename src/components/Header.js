import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlice";
import { BottomArrowIcon } from "./Icons/Icons";

export default function Header() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const menuRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowProfile(false);
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="min-h-[72px] border-b border-b-[#282e3b] flex items-center">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-yellow-400">
          <Title title="AcademyHub" size="xl" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/category/biohacking" className="text-yellow-400">
            Categories
          </Link>
          <Link href="/">Blogs</Link>
          <Link href="/">Teachers</Link>
          <Link href="/">Contact</Link>
          {token ? (
            <div className="flex items-center gap-4 relative z-60" ref={menuRef}>
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}${user?.profileImage}`}
                alt="Profile"
                className="rounded-full cursor-pointer bg-gray-600 object-cover w-10 h-10"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && (
                <div className="flex flex-col items-center absolute top-14 right-0 w-[100px]  bg-[#303030] z-40 rounded">
                  <div className="rotate-180 absolute -top-[12px] right-3">
                    <BottomArrowIcon size={16} color="#303030" />
                  </div>
                  <Link href="/auth/profile" className="p-3 w-full text-center text-sm">
                    Profile
                  </Link>
                  <button className="p-3 w-full text-center text-sm cursor-pointer" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/" className="p-4 py-3.5 bg-gray-700 rounded-xl font-bold">
                Register
              </Link>
              <Link href="/auth/login" className="p-8 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold cursor-pointer">
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
