import Link from "next/link"
import React from "react"

const Footer = props => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/channel/UCMkBlS9FozLnTOmv7iz8FQw"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/lecaohao210101/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/lecaohao2101"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
              Contact Info
            </h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              {/*Call Us: +44 20 8331 8000*/}
              <a
                href="tel:+442083318000"
                className="text-decoration-none text-black dark:text-gray-300 dark:hover:text-white"
              >
                Call Us: +123456789
              </a>
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              {/*Address: Old Royal Naval College, Park Row, London SE10 9LS*/}
              <a
                href="https://www.google.com/maps/dir//London+SE10+9NN,+United+Kingdom/@51.4826853,-0.0890966,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x48760285263b1459:0x182423076697c5c8!2m2!1d-0.0066964!2d51.4827142?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-black dark:text-gray-300 dark:hover:text-white"
              >
                Address: 1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội
              </a>
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white  pb-2">
              {/*Mail Us: lecaohao2101@gmail.com*/}
              <a
                href="mailto:lecaohao2101@gmail.com"
                className="text-decoration-none text-black dark:text-gray-300 dark:hover:text-white"
              >
                Mail Us: nguyenminhduc@gmail.com
              </a>
            </p>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          Copyright © 2024 Elearning | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  )
}

export default Footer
