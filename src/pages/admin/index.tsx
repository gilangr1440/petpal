import Layout from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <Layout>
      <div className="container mx-auto h-full">
        <header className="w-full flex items-center justify-between py-4">
          <h1 className="text-2xl font-medium">List Product</h1>
          <Link to={"/admin/products/add-edit?action=add"} className="text-white px-4 py-2 rounded-md text-center font-medium bg-[#036DA1] hover:bg-[#036DA1] hover:bg-opacity-90">
            Add Products
          </Link>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
          <Link to={"/"}>
            <Card className="flex items-start justify-center p-6">
              <CardHeader>
                <img src="/public/assets/auth-image.png" alt="" className="max-h-[350px]" />
              </CardHeader>
              <CardContent className="flex flex-col items-start justify-start gap-y-2">
                <h1 className="text-2xl font-semibold">Dog Food 1</h1>
                <p className="text-base font-medium">Rp.200.000</p>
                <p className="text-base font-normal">Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet</p>
              </CardContent>
            </Card>
          </Link>
          <Link to={"/"}>
            <Card className="flex items-start justify-center p-6">
              <CardHeader>
                <img src="/public/assets/auth-image.png" alt="" className="max-h-[350px]" />
              </CardHeader>
              <CardContent className="flex flex-col items-start justify-start gap-y-2">
                <h1 className="text-2xl font-semibold">Dog Food 1</h1>
                <p className="text-base font-medium">Rp.200.000</p>
                <p className="text-base font-normal">Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet Lorem Ipsum Dolor Sit amet</p>
              </CardContent>
            </Card>
          </Link>
        </main>
      </div>
    </Layout>
  );
};

export default Admin;
