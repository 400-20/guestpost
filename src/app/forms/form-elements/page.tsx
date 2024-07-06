import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/BuyerLayouts/DefaultLaout";

export const metadata: Metadata = {
  title:"Guestpostsale Dashboard Page",
  description: "",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
