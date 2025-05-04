import { Input } from "@/components/ui/input";

const NavSearch = () => {
  return (
    <div className="">
      <Input
        type="search"
        placeholder="Hledej..."
        className="bg-white w-60 rounded-3xl"
      />
    </div>
  );
};

export default NavSearch;
