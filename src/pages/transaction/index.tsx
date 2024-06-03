import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "@/components/layout";
import NumberFormatter from "@/components/number-formatter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Payment: FC = () => {
  // const navigate = useNavigate();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [pembayaran, setPembayaran] = useState({
    nama_lengkap: "",
    alamat: "",
    bank_account: "",
  });
  const [showData, setShowData] = useState({
    nama_lengkap: "",
    alamat: "",
    bank_account: "",
    va_number: "",
  });

  useEffect(() => {
    if (location.state) {
      setPembayaran({
        ...pembayaran,
        nama_lengkap: "John Doe",
        alamat: "Jln budi mulya raya no 28 pademangan",
      });
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPembayaran((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmation",
      text: "Anda Mau Melanjutkan Pembayaran",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(3 150 199)",
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios
          .post("/api/payment", pembayaran)
          .then((response) => {
            setShowData(response.data);
            setShowPopup(true);
          })
          .catch(() => {
            Swal.fire({
              title: "Gagal",
              text: "Pembayaran sebelumnya belum selesai",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(3 150 199)",
            });
          });
      }
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center pt-20 gap-8 font-Poppins">
        <div className="flex flex-col px-10 gap-3">
          <span className="text-2xl md:text-3xl lg:text-4xl text-center">
            Pembayaran
          </span>
          <span className="text-[#828282] text-center text-xs md:text-base">
            Lakukan Pembayaran produk yang diinginkan
          </span>
        </div>
      </div>

      <form
        onSubmit={handlePayment}
        className="flex justify-center items-center gap-3 h-auto my-20"
      >
        <div className="flex flex-col justify-center gap-3 w-full md:w-1/2">
          <label className="font-semibold md:text-base text-sm">Pengguna</label>
          <input
            required
            name="nama_lengkap"
            value={pembayaran.nama_lengkap}
            onChange={handleChange}
            type="text"
            className="p-2 bg-[#F6F6F6] rounded-md"
            placeholder="Masukan Nama Pengguna"
          />
          <label className="font-semibold md:text-base text-sm">Alamat</label>
          <input
            required
            name="alamat"
            value={pembayaran.alamat}
            onChange={handleChange}
            type="text"
            className="p-2 bg-[#F6F6F6] rounded-md"
            placeholder="Masukan Alamat"
          />
          <label className="font-semibold md:text-base text-sm">
            Metode Pembayaran
          </label>
          <Select
            required
            name="bank_account"
            value={pembayaran.bank_account}
            onValueChange={(value) =>
              setPembayaran((prev) => ({ ...prev, bank_account: value }))
            }
          >
            <SelectTrigger className="p-2 bg-[#F6F6F6] rounded-md">
              <SelectValue placeholder="Pilih Metode Pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BCA">BCA</SelectItem>
              {/* Tambahkan metode pembayaran lain di sini */}
            </SelectContent>
          </Select>
          <div className="mt-4">
            <span className="text-sm font-bold">Total Bayar : </span>
            <span className="font-bold text-lg text-red-500">
              <NumberFormatter value={location.state?.total} />
            </span>
          </div>
          <Button
            type="submit"
            className="flex justify-center items-center mt-10 font-semibold bg-sky-600 w-full text-white py-2.5 rounded-md"
          >
            Lanjutkan Pembayaran
          </Button>
        </div>
      </form>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="p-8 bg-white rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-blue-700">
              Detail Pembayaran
            </DialogTitle>
          </DialogHeader>
          <div className="my-2 text-sm">Nama: {showData.nama_lengkap}</div>
          <hr />
          <div className="my-2 text-sm">Alamat: {showData.alamat}</div>
          <hr />
          <div className="my-2 text-sm">
            Metode Pembayaran: {showData.bank_account}
          </div>
          <hr />
          <div className="my-2 text-sm font-semibold">
            Total Pembayaran:{" "}
            <span className="font-bold text-lg">
              <NumberFormatter value={location.state?.total} />
            </span>
          </div>
          <div className="mb-4 bg-orange-200 p-3 rounded text-lg font-bold">
            kode VA : {showData.va_number}
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setShowPopup(false)}
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Payment;
