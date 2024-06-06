import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  onTabChange: (value: string) => void;
}

const CategoryTabs = ({ onTabChange }: CategoryTabsProps) => {
  return (
    <Tabs
      defaultValue="petshop"
      className="w-[400px] h-full flex items-start justify-start flex-col gap-y-2"
      onValueChange={onTabChange}
    >
      <h1 className="text-base font-semibold">Category</h1>
      <TabsList>
        <TabsTrigger
          value="petshop"
          className="flex items-center justify-center flex-col gap-y-[2px]"
        >
          <Avatar>
            <AvatarImage src="/public/assets/petshop-icon.png" />
          </Avatar>
          <h1>Pet Shop</h1>
        </TabsTrigger>
        <TabsTrigger
          value="clinic"
          className="flex items-center justify-center flex-col gap-y-[2px]"
        >
          <Avatar>
            <AvatarImage src="/public/assets/check-up-icon.png" />
          </Avatar>
          <h1>Clinic</h1>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
