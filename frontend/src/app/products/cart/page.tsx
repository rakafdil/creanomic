// import React from "react";
// import { useState } from "react";
// import Navbar from "../../components/Products/Navbar";
// import ProductList from "../../components/Products/Cart/ProductList";
// import PaymentMethodSelector from "../../components/Products/Cart/PaymentMethodSelector";
// import OrderSummary from "../../components/Products/Cart/OrderSummary";

// export default function ProductDetailPage() {
//     const [products, setProducts] = useState([
//         { id: 1, name: "Sweet Banana", weight: "500 gram", price: 15000, quantity: 1, image: "/banana.png" },
//         { id: 2, name: "Fresh Broccoli", weight: "100 gram", price: 10000, quantity: 2, image: "/broccoli.png" },
//         { id: 3, name: "Fresh Garlic", weight: "500 gram", price: 12000, quantity: 1, image: "/garlic.png" },
//         { id: 4, name: "Green Cabbage", weight: "500 gram", price: 11000, quantity: 3, image: "/cabbage.png" },
//     ]);

//     const [paymentMethod, setPaymentMethod] = useState("Paypal");

//     const handleIncrease = (id) => {
//         setProducts((prev) =>
//             prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
//         );
//     };

//     const handleDecrease = (id) => {
//         setProducts((prev) =>
//             prev.map((p) =>
//                 p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
//             )
//         );
//     };

//     const totalItems = products.reduce(
//         (sum, p) => sum + p.price * p.quantity,
//         0
//     );

//     const summary = {
//         items: totalItems,
//         shipping: 3000,
//         taxes: 3000,
//         discount: 3000,
//         total: totalItems + 3000 + 3000 - 3000,
//     };

//     return (
//         <div className="flex flex-col gap-8">
//             <div className="w-full p-2.5 bg-gradient-to-r from-green-950 via-green-800 to-green-950 inline-flex justify-center items-center gap-2.5">
//                 <div className="text-center justify-start text-white text-sm font-bold font-['Inter']">
//                     Welcome to GrowthWell
//                 </div>
//             </div>
//             <div className="mx-32 flex flex-col gap-1">
//                 <Navbar />
//             </div>
//             <div className="text-3xl font-bold text-center">
//                 Shopping Cart
//             </div>
//             <div className="col-span-2">
//                 <ProductList
//                     products={products}
//                     onIncrease={handleIncrease}
//                     onDecrease={handleDecrease}
//                 />
//                 <div className="mt-6">
//                     <PaymentMethodSelector
//                         method={paymentMethod}
//                         onSelect={setPaymentMethod}
//                     />
//                 </div>
//             </div>
//             <OrderSummary summary={summary} />
//         </div>
//     );
// }