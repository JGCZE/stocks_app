import ThemeToggle from "./ThemeToggle";
import Search from "./Search";
import Link from "next/link";

const NavBar = async () => {
  return (
    <nav className="flex justify-between items-center h-24 px-[4%] mt-2 border-b">
      Navbar
      <Search />
      <Link href="/admin" className="font-bold">Admin</Link>
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;
