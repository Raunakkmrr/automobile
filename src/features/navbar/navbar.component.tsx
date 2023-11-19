import MobileNav from "../mobile-nav/mobile-nav.component";
import userIcon from "/src/assets/icons/user.svg";

const Navbar = () => {
  return (
    <section className="flex items-center justify-between px-5 py-5 pr-10 border bg-gray-50">
      <div>
        <h1 className="text-xl font-bold">Auto-mobile AI Studio</h1>
        <p>professional shoot at clicks</p>
      </div>
      <div className="flex items-center gap-4">
        <img className="rounded-lg " src={userIcon} alt="user avatar" />
        <span className=" sm:hidden">
          <MobileNav />
        </span>
      </div>
    </section>
  );
};

export default Navbar;
