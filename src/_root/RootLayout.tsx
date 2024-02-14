import { Outlet } from "react-router-dom";
import BottomBar from "@/components/shared/BottomBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full pb-[5em]">
        <Outlet />
      </section>

      <BottomBar/>
    </div>
  );
};
export default RootLayout;
