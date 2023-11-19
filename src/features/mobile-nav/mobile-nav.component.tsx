import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import BackgroundIcon from "/src/assets/icons/backgrounds-filter.svg";
import HomeIcon from "/src/assets/icons/home.svg";
import NumberPlateIcon from "/src/assets/icons/number-plate.svg";
import WindowsIcon from "/src/assets/icons/windows.svg";

const sidebarItems = [
  {
    id: 1,
    label: "",
    image: HomeIcon,
    redirectTo: "/",
  },
  {
    id: 1,
    label: "Backgrounds",
    redirectTo: "/backgrounds",
    image: BackgroundIcon,
  },
  {
    id: 2,
    label: "Windows",
    redirectTo: "/windows",
    image: WindowsIcon,
  },
  {
    id: 3,
    label: "Number Plate",
    redirectTo: "/number-plate",
    image: NumberPlateIcon,
  },
];

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="w-auto">
        <div className="flex flex-col items-center w-full h-full gap-5 py-10 ">
          {sidebarItems.map((item) => (
            <NavLink
              key={item?.id}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 p-3 rounded-md hover:bg-gray-200 flex flex-col items-center justify-center"
                  : "p-3 rounded-md hover:bg-gray-200 flex flex-col items-center justify-center"
              }
              to={item.redirectTo}
            >
              <img src={item.image} alt={item.label} width={40} height={40} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
