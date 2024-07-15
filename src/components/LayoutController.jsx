// // LayoutController.js
// import React, { useState } from "react";
// import BuyerSidebar from "@/components/BuyerSidebar";
// import BuyerHeader from "@/components/BuyerHeader";
// import PublisherSidebar from "@/components/PublisherSidebar";
// import PublisherHeader from "@/components/PublisherHeader";
// import DefaultLayout from "@/components/BuyerLayouts";

// const layouts = {
//   buyer: {
//     sidebar: BuyerSidebar,
//     header: BuyerHeader,
//   },
//   publisher: {
//     sidebar: PublisherSidebar,
//     header: PublisherHeader,
//   },
// };

// const LayoutController = () => {
//   const [layout, setLayout] = useState("buyer");

//   const handleSwitchLayout = () => {
//     setLayout(layout === "buyer" ? "publisher" : "buyer");
//   };

//   return (
//     <div>
//       <button onClick={handleSwitchLayout}>
//         Switch to {layout === "buyer" ? "Publisher" : "Buyer"}
//       </button>
//       {layout === "buyer" ? (
//         <DefaultLayout children={<div>Buyer content goes here</div>} />
//       ) : (
//         <DefaultLayout children={<div>Publisher content goes here</div>} />
//       )}
//     </div>
//   );
// };

// export default LayoutController;