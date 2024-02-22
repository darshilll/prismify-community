/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { pathname } = useLocation();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  const navigate = useNavigate();

  const { user } = useUserContext();

  return (
    <nav className="leftsidebar border-2 border-black border-r-gray-800 ">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/Images/logondtextblack.png"
            alt="logo"
            width={200}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/Icons/profile-placeholder.svg"}
            alt="profile-pic"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className=" font-semibold tracking-wider">{user.name}</p>
            <p className="small-regular text-light-3 tracking-wider font-sans">
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-4 tracking-wider">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive}`}
              >
                <NavLink to={link.route} className="flex gap-4 item-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/Icons/logout.svg" alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
          </Button>
        </ul>
      </div>
    </nav>
  );
};
export default LeftSidebar;
