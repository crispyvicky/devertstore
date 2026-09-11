import ShopNav from "@/storefront/ShopNav";
import MayChat from "@/storefront/MayChat";
import "@/storefront/atelier.css";

export const metadata = {
  title: "Devert Store",
  description: "Luxury house — Devert Store",
};

export default function ShopLayout({ children }) {
  return (
    <div className="devert-shop">
      <ShopNav />
      {children}
      <MayChat />
    </div>
  );
}
