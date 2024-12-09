import Link from "next/link";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  setOpen: any;
  setOpenSidebar: any;
  user: any;
};

const NavItems: React.FC<Props> = ({
  activeItem,
  isMobile,
  setOpen,
  setOpenSidebar,
  user
}) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                ELearning
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={i.url} passHref key={index}>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
          {!user && (
            <a>
              <HiOutlineUserCircle
                size={25}
                className="block cursor-pointer dark:text-white text-black px-6 w-[72px]"
                onClick={() => {
                  setOpen(true);
                  setOpenSidebar(false);
                }}
              />
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default NavItems;
