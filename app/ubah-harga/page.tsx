import Galeri from "@/components/Galeri";
import BensinTable from "@/components/HargaBensin/Bensin";
import MasukData from "@/components/MasukData/MasukData";

const UbahHargaPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <BensinTable />
      </div>
    </div>
  );
};

export default UbahHargaPage;
