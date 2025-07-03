import ThemeToggle from "./ThemeToggle";
import Search from "./Search";
import Link from "next/link";

const NavBar = async () => {
  return (
    <nav className="mx-auto flex items-center justify-center shadow-sm shadow-green-800 h-24 mt-2 border-b gap-28 mb-8">

      <div className="w-[1280px] flex items-center gap-10">

        <Search />

        <div className="flex justify-between items-center gap-4 w-1/2">
          <Link href="/" className="font-bold">Home</Link>
          <Link href="/admin" className="font-bold">Admin</Link>
          <Link href="/login" className="font-bold">Login</Link>
          <Link href="/filter" className="font-bold">Stock filter</Link>
          <ThemeToggle />
        </div>

      </div>

    </nav>
  );
};

export default NavBar;
