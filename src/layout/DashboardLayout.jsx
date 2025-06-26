import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className=" bg-white">
      <Sidebar />
      <main className="ml-56 p-10"> {/* ← This ensures content is not under the sidebar */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
