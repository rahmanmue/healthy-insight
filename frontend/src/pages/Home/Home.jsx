import { MdOutlineInsights } from "react-icons/md";
import img1 from "../../assets/image/img-1.svg";
const Home = () => {
  return (
    <>
      <div className="flex my-3 justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold flex gap-3 mb-3">
            <MdOutlineInsights className="text-green-500" /> Healthy Insight
          </h1>
          <p className="text-md text-justify">
            <span className="font-bold">Healthy Insight </span> adalah aplikasi
            web yang dirancang untuk membantu pengguna mendiagnosa kemungkinan
            penyakit berdasarkan gejala yang dipilih. Web ini dibangun
            menggunakan teknologi web modern,{" "}
            <span className="font-bold"> React.js </span>untuk tampilan depan
            (front-end), <span className="font-bold">Express.js</span> untuk
            logika server (back-end), dan{" "}
            <span className="font-bold">PostgreSQL</span> sebagai basis data.
            Aplikasi ini menggunakan metode{" "}
            <span className="font-bold">Case-Based Reasoning (CBR)</span> dengan
            algoritma{" "}
            <span className="font-bold">K-Nearest Neighbors (KNN)</span> untuk
            menghitung kemiripan gejala yang dimasukkan dengan data di basis
            pengetahuan kami.
          </p>
        </div>
        <img src={img1} alt="image-1" className="w-1/2" />
      </div>
    </>
  );
};

export default Home;
