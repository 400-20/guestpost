"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from '@/utils/api';


const ProfileBox = () => {

  const [email, setEmail] = useState('');
  const [data, setData] = useState('')

  // useEffect(() => {
  //   const loginUser = localStorage.getItem('login_user');
  //   if (loginUser) {
  //     const user = JSON.parse(loginUser);
  //     setEmail(user.email);
  //   }
  // }, []);
  useEffect(() => {
    const fetchUsers = async () => {
        const token = localStorage.getItem('login_access_token');
        if (!token) {
            alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL}profile/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",

                },
            });
            const data = response.data;
            console.log(data);
            
            setData(data);
        } catch (error:any) {
            console.error('Error fetching projects:', error.response);
        }
    };
    fetchUsers();
}, []);

  return (
    <>
      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src="/images/cover/cover-01.png"
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
            >
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only"
                accept="image/png, image/jpg, image/jpeg"
              />
              <span>
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.69882 3.365C5.89894 2.38259 6.77316 1.6875 7.77475 1.6875H10.2252C11.2268 1.6875 12.1011 2.38259 12.3012 3.36499C12.3474 3.59178 12.5528 3.75814 12.7665 3.75814H12.7788L12.7911 3.75868C13.8437 3.80471 14.6521 3.93387 15.3271 4.37668C15.7524 4.65568 16.1182 5.01463 16.4033 5.43348C16.7579 5.9546 16.9143 6.55271 16.9893 7.27609C17.0625 7.98284 17.0625 8.86875 17.0625 9.99079V10.0547C17.0625 11.1767 17.0625 12.0626 16.9893 12.7694C16.9143 13.4927 16.7579 14.0909 16.4033 14.612C16.1182 15.0308 15.7524 15.3898 15.3271 15.6688C14.7995 16.0149 14.1947 16.1675 13.461 16.2408C12.7428 16.3125 11.8418 16.3125 10.6976 16.3125H7.30242C6.15824 16.3125 5.25725 16.3125 4.53897 16.2408C3.80534 16.1675 3.20049 16.0149 2.67289 15.6688C2.24761 15.3898 1.88179 15.0308 1.59674 14.612C1.24209 14.0909 1.08567 13.4927 1.01072 12.7694C0.937488 12.0626 0.937494 11.1767 0.9375 10.0547V9.9908C0.937494 8.86875 0.937488 7.98284 1.01072 7.27609C1.08567 6.55271 1.24209 5.9546 1.59674 5.43348C1.88179 5.01463 2.24761 4.65568 2.67289 4.37668C3.34787 3.93387 4.15635 3.80471 5.20892 3.75868L5.2212 3.75814H5.2335C5.44716 3.75814 5.65262 3.59179 5.69882 3.365ZM7.77475 2.8125C7.29392 2.8125 6.89179 3.14475 6.80118 3.58955C6.65443 4.30994 6.01575 4.8764 5.24725 4.88308C4.23579 4.92802 3.69402 5.05227 3.28998 5.31733C2.98732 5.51589 2.72814 5.77058 2.52679 6.06643C2.31968 6.37076 2.19522 6.75994 2.12973 7.39203C2.06321 8.03405 2.0625 8.8617 2.0625 10.0227C2.0625 11.1838 2.06321 12.0114 2.12973 12.6534C2.19522 13.2855 2.31968 13.6747 2.5268 13.979C2.72814 14.2749 2.98732 14.5296 3.28998 14.7281C3.60313 14.9336 4.00383 15.0567 4.65078 15.1213C5.30662 15.1868 6.15145 15.1875 7.33333 15.1875H10.6667C11.8486 15.1875 12.6934 15.1868 13.3492 15.1213C13.9962 15.0567 14.3969 14.9336 14.71 14.7281C15.0127 14.5296 15.2719 14.2749 15.4732 13.979C15.6803 13.6747 15.8048 13.2855 15.8703 12.6534C15.9368 12.0114 15.9375 11.1838 15.9375 10.0227C15.9375 8.8617 15.9368 8.03405 15.8703 7.39203C15.8048 6.75994 15.6803 6.37076 15.4732 6.06643C15.2719 5.77058 15.0127 5.51589 14.71 5.31733C14.306 5.05227 13.7642 4.92802 12.7528 4.88308C11.9843 4.8764 11.3456 4.30994 11.1988 3.58955C11.1082 3.14475 10.7061 2.8125 10.2252 2.8125H7.77475ZM9 8.0625C8.06802 8.0625 7.3125 8.81802 7.3125 9.75C7.3125 10.682 8.06802 11.4375 9 11.4375C9.93198 11.4375 10.6875 10.682 10.6875 9.75C10.6875 8.81802 9.93198 8.0625 9 8.0625ZM6.1875 9.75C6.1875 8.1967 7.4467 6.9375 9 6.9375C10.5533 6.9375 11.8125 8.1967 11.8125 9.75C11.8125 11.3033 10.5533 12.5625 9 12.5625C7.4467 12.5625 6.1875 11.3033 6.1875 9.75ZM12.9375 7.5C12.9375 7.18934 13.1893 6.9375 13.5 6.9375H14.25C14.5607 6.9375 14.8125 7.18934 14.8125 7.5C14.8125 7.81066 14.5607 8.0625 14.25 8.0625H13.5C13.1893 8.0625 12.9375 7.81066 12.9375 7.5Z"
                    fill=""
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              <Image
                src="/images/user/user-03.png"
                width={160}
                height={160}
                className="overflow-hidden rounded-full"
                alt="profile"
              />
            </div>

            <label
              htmlFor="profilePhoto"
              className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.69882 3.365C5.89894 2.38259 6.77316 1.6875 7.77475 1.6875H10.2252C11.2268 1.6875 12.1011 2.38259 12.3012 3.36499C12.3474 3.59178 12.5528 3.75814 12.7665 3.75814H12.7788L12.7911 3.75868C13.8437 3.80471 14.6521 3.93387 15.3271 4.37668C15.7524 4.65568 16.1182 5.01463 16.4033 5.43348C16.7579 5.9546 16.9143 6.55271 16.9893 7.27609C17.0625 7.98284 17.0625 8.86875 17.0625 9.99079V10.0547C17.0625 11.1767 17.0625 12.0626 16.9893 12.7694C16.9143 13.4927 16.7579 14.0909 16.4033 14.612C16.1182 15.0308 15.7524 15.3898 15.3271 15.6688C14.7995 16.0149 14.1947 16.1675 13.461 16.2408C12.7428 16.3125 11.8418 16.3125 10.6976 16.3125H7.30242C6.15824 16.3125 5.25725 16.3125 4.53897 16.2408C3.80534 16.1675 3.20049 16.0149 2.67289 15.6688C2.24761 15.3898 1.88179 15.0308 1.59674 14.612C1.24209 14.0909 1.08567 13.4927 1.01072 12.7694C0.937488 12.0626 0.937494 11.1767 0.9375 10.0547V9.9908C0.937494 8.86875 0.937488 7.98284 1.01072 7.27609C1.08567 6.55271 1.24209 5.9546 1.59674 5.43348C1.88179 5.01463 2.24761 4.65568 2.67289 4.37668C3.34787 3.93387 4.15635 3.80471 5.20892 3.75868L5.2212 3.75814H5.2335C5.44716 3.75814 5.65262 3.59179 5.69882 3.365ZM7.77475 2.8125C7.29392 2.8125 6.89179 3.14475 6.80118 3.58955C6.65443 4.30994 6.01575 4.8764 5.24725 4.88308C4.23579 4.92802 3.69402 5.05227 3.28998 5.31733C2.98732 5.51589 2.72814 5.77058 2.52679 6.06643C2.31968 6.37076 2.19522 6.75994 2.12973 7.39203C2.06321 8.03405 2.0625 8.8617 2.0625 10.0227C2.0625 11.1838 2.06321 12.0114 2.12973 12.6534C2.19522 13.2855 2.31968 13.6747 2.5268 13.979C2.72814 14.2749 2.98732 14.5296 3.28998 14.7281C3.60313 14.9336 4.00383 15.0567 4.65078 15.1213C5.30662 15.1868 6.15145 15.1875 7.33333 15.1875H10.6667C11.8486 15.1875 12.6934 15.1868 13.3492 15.1213C13.9962 15.0567 14.3969 14.9336 14.71 14.7281C15.0127 14.5296 15.2719 14.2749 15.4732 13.979C15.6803 13.6747 15.8048 13.2855 15.8703 12.6534C15.9368 12.0114 15.9375 11.1838 15.9375 10.0227C15.9375 8.8617 15.9368 8.03405 15.8703 7.39203C15.8048 6.75994 15.6803 6.37076 15.4732 6.06643C15.2719 5.77058 15.0127 5.51589 14.71 5.31733C14.306 5.05227 13.7642 4.92802 12.7528 4.88308C11.9843 4.8764 11.3456 4.30994 11.1988 3.58955C11.1082 3.14475 10.7061 2.8125 10.2252 2.8125H7.77475ZM9 8.0625C8.06802 8.0625 7.3125 8.81802 7.3125 9.75C7.3125 10.682 8.06802 11.4375 9 11.4375C9.93198 11.4375 10.6875 10.682 10.6875 9.75C10.6875 8.81802 9.93198 8.0625 9 8.0625ZM6.1875 9.75C6.1875 8.1967 7.4467 6.9375 9 6.9375C10.5533 6.9375 11.8125 8.1967 11.8125 9.75C11.8125 11.3033 10.5533 12.5625 9 12.5625C7.4467 12.5625 6.1875 11.3033 6.1875 9.75ZM12.9375 7.5C12.9375 7.18934 13.1893 6.9375 13.5 6.9375H14.25C14.5607 6.9375 14.8125 7.18934 14.8125 7.5C14.8125 7.81066 14.5607 8.0625 14.25 8.0625H13.5C13.1893 8.0625 12.9375 7.81066 12.9375 7.5Z"
                  fill=""
                />
              </svg>

              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                className="sr-only"
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>
          </div>
          <div className="mt-4">
          <h3 className="mb-1 font-bold text-dark dark:text-white">
            {data.username}
            </h3>
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
            {data.email}
            </h3>
            {/* <p className="font-medium">Ui/Ux Designer</p> */}
            <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  259
                </span>
                <span className="text-body-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  129K
                </span>
                <span className="text-body-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  2K
                </span>
                <span className="text-body-sm-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">
                About Me
              </h4>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                pharetra ligula sed, aliquam lacus.
              </p>
            </div>

            <div className="mt-4.5">
              <h4 className="mb-3.5 font-medium text-dark dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1804)">
                      <path
                        d="M12.8337 12.3752H15.1253L16.042 8.7085H12.8337V6.87516C12.8337 5.931 12.8337 5.04183 14.667 5.04183H16.042V1.96183C15.7432 1.92241 14.6147 1.8335 13.4231 1.8335C10.9343 1.8335 9.16699 3.35241 9.16699 6.14183V8.7085H6.41699V12.3752H9.16699V20.1668H12.8337V12.3752Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1804">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6894 18.5L9.90566 13.1069L5.16898 18.5H3.16504L9.01663 11.8394L3.16504 3.5H8.31001L11.8761 8.58297L16.3443 3.5H18.3482L12.7681 9.85216L18.8343 18.5H13.6894ZM15.921 16.9795H14.5719L6.03435 5.02047H7.38366L10.803 9.809L11.3943 10.6399L15.921 16.9795Z"
                      fill=""
                    />
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1812)">
                      <path
                        d="M6.69596 4.58327C6.69572 5.0695 6.50233 5.53572 6.15834 5.87937C5.81436 6.22301 5.34794 6.41593 4.86171 6.41569C4.37548 6.41545 3.90926 6.22206 3.56562 5.87807C3.22197 5.53408 3.02905 5.06767 3.0293 4.58144C3.02954 4.09521 3.22293 3.62899 3.56692 3.28535C3.9109 2.9417 4.37732 2.74878 4.86355 2.74902C5.34978 2.74927 5.816 2.94265 6.15964 3.28664C6.50329 3.63063 6.69621 4.09704 6.69596 4.58327ZM6.75096 7.77327H3.0843V19.2499H6.75096V7.77327ZM12.5443 7.77327H8.89596V19.2499H12.5076V13.2274C12.5076 9.87244 16.8801 9.56077 16.8801 13.2274V19.2499H20.501V11.9808C20.501 6.32494 14.0293 6.53577 12.5076 9.31327L12.5443 7.77327Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1812">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.333984)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1816)">
                      <path
                        d="M18.3229 10.6078C18.2478 9.16492 17.7459 7.7768 16.881 6.61941C16.6175 6.90324 16.3358 7.16964 16.0377 7.41691C15.1219 8.17761 14.0985 8.79851 13.0008 9.25942C13.1538 9.58025 13.2941 9.891 13.4178 10.1843V10.1871C13.4528 10.269 13.4864 10.3516 13.5187 10.4346C14.9065 10.2787 16.3695 10.3356 17.7876 10.5272C17.9764 10.5528 18.1543 10.5803 18.3229 10.6078ZM9.72001 3.77866C10.6133 5.03741 11.4371 6.34408 12.1877 7.69283C13.3088 7.251 14.2355 6.69366 14.9817 6.07308C15.2407 5.85962 15.4845 5.62836 15.7113 5.381C14.3922 4.27157 12.7233 3.66438 10.9997 3.66683C10.5707 3.66654 10.1425 3.70365 9.72001 3.77775V3.77866ZM3.89826 9.16408C4.52272 9.14832 5.14643 9.11072 5.76826 9.05133C7.27126 8.9169 8.76143 8.66496 10.2251 8.29783C9.46015 6.96886 8.63427 5.6759 7.75009 4.42308C6.80567 4.89094 5.97291 5.55646 5.30832 6.37447C4.64372 7.19248 4.16283 8.14387 3.89826 9.16408ZM5.30076 15.6156C5.65643 15.0958 6.12393 14.511 6.74451 13.8748C8.07734 12.509 9.65034 11.4457 11.4708 10.859L11.5277 10.8425C11.3764 10.5088 11.2343 10.2109 11.0913 9.93042C9.40834 10.4208 7.63551 10.727 5.86909 10.8856C5.00743 10.9635 4.23468 10.9974 3.66634 11.0029C3.66472 12.6828 4.24228 14.3119 5.30168 15.6156H5.30076ZM13.7543 17.7973C13.4008 16.0146 12.9004 14.2642 12.2583 12.564C10.4231 13.2304 8.96101 14.2048 7.83076 15.3672C7.37463 15.8277 6.96984 16.3364 6.62351 16.8843C7.88742 17.8273 9.42271 18.3358 10.9997 18.3335C11.9438 18.3349 12.8792 18.1534 13.7543 17.7991V17.7973ZM15.4712 16.8118C16.9023 15.7116 17.8773 14.1221 18.2093 12.3477C17.8976 12.2697 17.5025 12.1918 17.068 12.1313C16.102 11.9922 15.1217 11.982 14.153 12.1011C14.6985 13.64 15.1389 15.2142 15.4712 16.8128V16.8118ZM10.9997 20.1668C5.93693 20.1668 1.83301 16.0629 1.83301 11.0002C1.83301 5.93741 5.93693 1.8335 10.9997 1.8335C16.0624 1.8335 20.1663 5.93741 20.1663 11.0002C20.1663 16.0629 16.0624 20.1668 10.9997 20.1668Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1816">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1820)">
                      <path
                        d="M11.6657 1.8335C6.60111 1.8335 2.49902 5.93558 2.49902 11.0002C2.49799 12.9245 3.10294 14.8003 4.22806 16.3614C5.35318 17.9226 6.94133 19.0898 8.76719 19.6975C9.22553 19.7772 9.39694 19.5022 9.39694 19.2612C9.39694 19.0439 9.38503 18.3225 9.38503 17.5543C7.08236 17.9787 6.48653 16.9933 6.30319 16.4772C6.19961 16.2132 5.75319 15.4002 5.36361 15.182C5.04278 15.0106 4.58444 14.5862 5.35169 14.5752C6.07403 14.5632 6.58919 15.2397 6.76153 15.5147C7.58653 16.9007 8.90469 16.5112 9.43086 16.271C9.51153 15.6752 9.75169 15.2746 10.0157 15.0454C7.97611 14.8162 5.84486 14.0252 5.84486 10.5189C5.84486 9.52158 6.19961 8.6975 6.78444 8.05491C6.69278 7.82575 6.37194 6.88616 6.87611 5.62575C6.87611 5.62575 7.64336 5.38558 9.39694 6.56625C10.1432 6.35914 10.9142 6.25489 11.6886 6.25641C12.4678 6.25641 13.2469 6.35908 13.9803 6.56533C15.7329 5.37366 16.5011 5.62666 16.5011 5.62666C17.0053 6.88708 16.6844 7.82666 16.5928 8.05583C17.1767 8.6975 17.5324 9.51058 17.5324 10.5189C17.5324 14.0371 15.3901 14.8162 13.3505 15.0454C13.6824 15.3314 13.9693 15.8814 13.9693 16.7412C13.9693 17.9668 13.9574 18.9522 13.9574 19.2621C13.9574 19.5022 14.1297 19.7882 14.588 19.6966C16.4076 19.0822 17.9888 17.9127 19.1089 16.3527C20.2291 14.7927 20.8318 12.9207 20.8324 11.0002C20.8324 5.93558 16.7303 1.8335 11.6657 1.8335Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1820">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.666016)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
