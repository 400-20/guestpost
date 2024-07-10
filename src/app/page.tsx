import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/BuyerLayouts/DefaultLaout";
import React from "react";
import SignupPage from '@/app/signup/page'
import Signin from "@/components/Auth/Signin";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProfileBox from "@/components/ProfileBox";
import Homie from "@/components/Home";


export const metadata: Metadata = {
  title:
    "Guestpostsale Dashboard Page",
  description: "",
};

export default function Home() {
  return (
    <>
      {/* <Login /> */}
      {/* <Signin /> */}
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
<Homie />
    </>
  );
}
