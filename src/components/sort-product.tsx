import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortProductsAtom } from "@/utils/jotai/atom";
import { useAtom } from "jotai";

const SortProducts = () => {
  const [, setSort] = useAtom(sortProductsAtom);

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Default" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="highest">Highest Price</SelectItem>
        <SelectItem value="lowest">Lowest Price</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortProducts;
