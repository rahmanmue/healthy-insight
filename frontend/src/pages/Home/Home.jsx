import img1 from "../../assets/image/img-1.svg";
import img2 from "../../assets/image/img-2.svg";
import img3 from "../../assets/image/img-3.svg";
const Home = () => {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-4xl font-bold">Apa itu Stunting?</h1>
        <div className="text-md mt-2">
          <span className="font-bold">Stunting</span> adalah kondisi yang
          menggambarkan pertumbuhan anak yang terhambat sehingga anak lebih
          pendek dari tinggi standar usianya. Kondisi ini terjadi akibat
          kekurangan gizi kronis yang menyebabkan pertumbuhan dan perkembangan
          anak terganggu, terutama dalam seribu hari pertama kehidupan, yang
          dimulai dari masa kehamilan hingga anak berusia dua tahun.
        </div>
      </div>

      <div className="flex gap-5 items-center mb-5">
        <div>
          <h2 className="text-3xl font-bold my-3">Penyebab Stunting</h2>
          <p className="text-md mb-2">
            Stunting disebabkan oleh berbagai faktor yang saling berkaitan,
            antara lain:
          </p>

          <ol className="list-decimal text-md mt-2 text-justify px-4">
            <li>
              Kekurangan Gizi Kronis: Asupan makanan yang tidak mencukupi dalam
              jangka waktu yang panjang menyebabkan tubuh anak tidak mendapatkan
              nutrisi yang dibutuhkan untuk pertumbuhan optimal.
            </li>
            <li>
              Infeksi Berulang: Infeksi yang sering terjadi pada anak, seperti
              diare dan infeksi saluran pernapasan, dapat mengganggu penyerapan
              nutrisi dan memperburuk kondisi gizi anak.
            </li>{" "}
            <li>
              Perawatan Kesehatan yang Tidak Memadai: Akses yang terbatas
              terhadap pelayanan kesehatan, imunisasi, dan perawatan medis
              lainnya dapat meningkatkan risiko stunting
            </li>
            <li>
              Sanitasi dan Kebersihan yang Buruk: Lingkungan yang tidak bersih
              dan kurangnya akses ke air bersih dapat menyebabkan penyakit
              infeksi yang mengganggu kesehatan dan pertumbuhan anak.
            </li>
            <li>
              Status Sosioekonomi yang Rendah: Keterbatasan sumber daya ekonomi
              sering kali mempengaruhi kemampuan keluarga untuk menyediakan
              makanan bergizi dan akses ke layanan kesehatan.
            </li>
          </ol>
        </div>
        <img src={img1} alt="img-1" className="w-1/3" />
      </div>

      <div className="flex gap-5 items-center mb-5">
        <img src={img2} alt="img-2" className="w-1/3" />
        <div>
          <h2 className="text-3xl font-bold my-3">Dampak Stunting</h2>

          <p className="text-md mb-3">
            Stunting memiliki dampak jangka panjang yang signifikan pada
            kehidupan anak, di antaranya:
          </p>
          <ul className="list-disc text-md text-justify px-4">
            <li>
              Pertumbuhan Fisik Terhambat: Anak dengan stunting memiliki tinggi
              badan yang lebih pendek dibandingkan anak seusianya.
            </li>
            <li>
              Perkembangan Kognitif Terhambat: Stunting dapat mengganggu
              perkembangan otak sehingga anak memiliki kemampuan belajar yang
              lebih rendah.
            </li>
            <li>
              Kerentanan Terhadap Penyakit: Anak yang mengalami stunting
              cenderung lebih rentan terhadap penyakit dan infeksi.
            </li>
            <li>
              Prestasi Pendidikan yang Lebih Rendah: Anak stunting sering kali
              mengalami kesulitan belajar di sekolah, yang berpengaruh pada
              prestasi akademik mereka.
            </li>
            <li>
              Potensi Pendapatan yang Lebih Rendah: Pertumbuhan dan perkembangan
              yang terganggu dapat berdampak pada kemampuan kerja dan potensi
              pendapatan di masa depan.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div>
          <h2 className="text-3xl font-bold my-3">
            Pencegahan dan Penanganan Stunting
          </h2>
          <p className="text-md font-medium mb-3">
            Pencegahan dan penanganan stunting memerlukan pendekatan yang
            komprehensif, meliputi:
          </p>
          <ol className="list-decimal text-md text-justify px-4">
            <li>
              Peningkatan Asupan Gizi: Memberikan makanan yang bergizi dan
              seimbang kepada ibu hamil dan anak balita.
            </li>
            <li>
              Pelayanan Kesehatan yang Baik: Memastikan anak mendapatkan
              imunisasi lengkap dan perawatan medis yang diperlukan.
            </li>
            <li>
              Peningkatan Sanitasi dan Kebersihan: Menciptakan lingkungan yang
              bersih dan sehat dengan akses air bersih dan sanitasi yang baik.
            </li>
            <li>
              Pendidikan Gizi dan Kesehatan: Memberikan edukasi kepada keluarga
              dan masyarakat tentang pentingnya gizi dan kesehatan untuk anak.
            </li>
            <li>
              Dukungan Sosial dan Ekonomi: Meningkatkan status sosial dan
              ekonomi keluarga melalui program-program bantuan dan pemberdayaan
              masyarakat.
            </li>
          </ol>
        </div>
        <img src={img3} alt="img-3" className="w-1/3" />
      </div>
    </>
  );
};

export default Home;
