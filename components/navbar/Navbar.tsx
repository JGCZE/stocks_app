import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center h-24 px-[4%] mt-2 border-b">
      Navbar
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;
