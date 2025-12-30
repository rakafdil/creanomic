import { FaCrown, FaTruck, FaCalendarCheck, FaBolt } from "react-icons/fa";
import { TbCloverFilled } from "react-icons/tb";
import { LiaThermometerQuarterSolid } from "react-icons/lia";

const AdditionalInfoTab = () => {
  const features = [
    {
      icon: <FaCrown size={40} className="text-green-800 lg:size-[65px]" />, // Ukuran ikon lebih kecil di mobile
      title: "Varietas Premium",
      description:
        "Pisang Cavendish ekspor dengan rasa manis dan nutrisi terbaik.",
    },
    {
      icon: <TbCloverFilled size={40} className="text-green-800 lg:size-[65px]" />,
      title: "Perkebunan Terbaik",
      description:
        "Ditanam secara alami di perkebunan tropis Indonesia yang subur, bebas dari pestisida berbahaya.",
    },
    {
      icon: <LiaThermometerQuarterSolid size={40} className="text-green-800 lg:size-[65px]" />,
      title: "Penyimpanan Optimal",
      description:
        "Simpan di suhu ruang yang sejuk atau kulkas untuk menjaga kesegaran dan memperpanjang daya tahan.",
    },
    {
      icon: <FaTruck size={40} className="text-green-800 lg:size-[65px]" />,
      title: "Pengiriman Higienis",
      description:
        "Dikemas rapi dengan standar kebersihan tinggi untuk memastikan pisang tetap segar sampai di tangan Anda.",
    },
    {
      icon: <FaCalendarCheck size={40} className="text-green-800 lg:size-[65px]" />,
      title: "Jaminan Panen Segar",
      description:
        "Dipanen maksimal 3 hari sebelum dikirim untuk menjamin Anda menerima buah dengan kesegaran puncak.",
    },
    {
      icon: <FaBolt size={40} className="text-green-800 lg:size-[65px]" />,
      title: "Sumber Energi Alami",
      description:
        "Kaya potasium dan serat. Camilan sehat untuk energi dan kesehatan jantung.",
    },
  ];

  return (
    <div className="bg-white px-0 sm:px-6">
      {/* Grid: 1 kolom (default), 2 kolom (sm), 3 kolom (lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            // Padding lebih kecil di mobile
            className="flex flex-col items-center text-center px-6 py-5 sm:px-12.5 sm:py-7.5 bg-[#F0FBC6] rounded-lg"
          >
            <div className="mb-2 lg:mb-3">{feature.icon}</div>
            <h3 className="text-black text-lg lg:text-2xl font-semibold mb-1 lg:mb-2">
              {feature.title}
            </h3>
            <p className="text-black/70 text-sm lg:text-xl font-semibold">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfoTab;