import ThemeToggle from "./ThemeToggle";
import Search from "./Search";
import Link from "next/link";

const NavBar = async () => {
  return (
    <nav className="mx-auto flex items-center justify-center shadow-sm shadow-slate-200 h-24 mt-2 border-b gap-28">

      <div className="w-[1280px] flex items-center gap-10 px-12">

        <Search />

        <div className="flex justify-center items-center gap-4 w-96">
          <Link href="/admin" className="font-bold">Admin</Link>
          <Link href="/admin" className="font-bold">Login</Link>
          <Link href="/admin" className="font-bold">Selected</Link>
          <ThemeToggle />
        </div>

      </div>

    </nav>
  );
};

export default NavBar;
