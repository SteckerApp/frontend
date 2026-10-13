import { Icons, paths } from "@/constants";
import { routeItem } from "@/data/routes.data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Referral } from "./Referral";
import { useState } from "react";
import { DeleteModal } from "../commons";
import { apiServices } from "@/services";


const AffiliateSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [ logoutLoading, setLogoutLoading ] = useState<boolean>(false);
  const [ logoutUser ] = apiServices.useLogoutMutation();

  const handleIsLogout = () => {
    setModalOpen(!isModalOpen);
  };

  // Logout handler
  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      handleIsLogout();
      logoutUser();
      navigate(paths.login); 
    }, 2000)
  };

  return (
    <div className="bg-sidebar w-full md:w-[15rem] min-h-screen relative border-r border-r-dashboardBg">
      <div className="flex flex-col items-start justify-start w-full">
        <img
          src={Icons.Logo}
          alt="Logo"
          className="mb-4 cursor-pointer px-5 pt-8"
        />
        <nav className="flex flex-col text-center text-black text-16 font-outfit w-full pt-10">
          {routeItem?.slice(8, 13)?.map((route, index) => (
            <Link
              key={index}
              to={route?.path}
              className={`flex justify-start font-normal items-center gap-3 py-3 px-5 mb-5 ${
                location.pathname.startsWith(route.path) ? "active-item" : "inherit"
              }`}
              onClick={(e) => {
                if (route.name === "Log out") {
                  e.preventDefault();
                  handleIsLogout(); 
                }
              }}
            >
              {route.icon} {route.name}
            </Link>
          ))}
        </nav>

        <Referral />
      </div>

      <DeleteModal
        open={isModalOpen}
        onCancel={handleIsLogout}
        title="Logout"
        desc="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        confirmDelete={() => handleLogout()}
        loading={logoutLoading}
      />
    </div>
  );
};

export default AffiliateSidebar;
