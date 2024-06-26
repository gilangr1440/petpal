import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FC } from "react";

interface ProductsProps {
  title: string;
  cost: number;
  img: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductsAdminCard: FC<ProductsProps> = ({ title, cost, img, onClick, onEdit, onDelete }) => {
  return (
    <Card className="flex items-start justify-start w-full p-4">
      <CardHeader>
        <div className="w-[200px] h-[150px]">
          <img src={img} alt="" className="w-full h-full object-cover rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-start gap-y-2">
        <h1 className="text-2xl font-semibold cursor-pointer hover:text-black/70" onClick={onClick}>
          {title}
        </h1>
        <p className="text-base font-medium">Rp. {cost}</p>
        <div className="flex gap-3">
          <button onClick={onEdit} className="p-2 w-32 rounded-md bg-blue-500 text-white">
            Edit
          </button>
          <button onClick={onDelete} className="p-2 w-32 rounded-md bg-red-500 text-white">
            Hapus
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsAdminCard;
