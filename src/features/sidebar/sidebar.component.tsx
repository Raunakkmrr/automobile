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

const Sidebar = () => {
  return (
    <section className="fixed top-0 left-0 bottom-0 min-h-screen w-[150px] bg-gray-50 border border-r-2">
      <div className="flex flex-col items-center w-full h-full gap-5 py-10 ">
        {sidebarItems.map((item) => (
          <NavLink
            key={item?.id}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 p-3 rounded-md hover:bg-gray-200 flex flex-col items-center justify-center"
                : "p-3 rounded-md hover:bg-gray-200 flex flex-col justify-center items-center"
            }
            to={item.redirectTo}
          >
            <img width={50} height={50} src={item.image} alt={item.label} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
