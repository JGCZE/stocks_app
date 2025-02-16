import ThemeToggle from "./ThemeToggle";
import Search from "./Search";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-24 px-[4%] mt-2 border-b">
      Navbar
      <Search />
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;
