import { FaCrown, FaTruck, FaCalendarCheck, FaBolt } from "react-icons/fa";
import { TbCloverFilled } from "react-icons/tb";
import { LiaThermometerQuarterSolid } from "react-icons/lia";

const AdditionalInfoTab = () => {
  const features = [
    {
      icon: <FaCrown size={65} className="text-green-800" />,
      title: "Varietas Premium",
      description:
        "Pisang Cavendish ekspor dengan rasa manis dan nutrisi terbaik.",
    },
    {
      icon: <TbCloverFilled size={65} className="text-green-800" />,
      title: "Perkebunan Terbaik",
      description:
        "Ditanam secara alami di perkebunan tropis Indonesia yang subur, bebas dari pestisida berbahaya.",
    },
    {
      icon: <LiaThermometerQuarterSolid size={65} className="text-green-800" />,
      title: "Penyimpanan Optimal",
      description:
        "Simpan di suhu ruang yang sejuk atau kulkas untuk menjaga kesegaran dan memperpanjang daya tahan.",
    },
    {
      icon: <FaTruck size={65} className="text-green-800" />,
      title: "Pengiriman Higienis",
      description:
        "Dikemas rapi dengan standar kebersihan tinggi untuk memastikan pisang tetap segar sampai di tangan Anda.",
    },
    {
      icon: <FaCalendarCheck size={65} className="text-green-800" />,
      title: "Jaminan Panen Segar",
      description:
        "Dipanen maksimal 3 hari sebelum dikirim untuk menjamin Anda menerima buah dengan kesegaran puncak.",
    },
    {
      icon: <FaBolt size={65} className="text-green-800" />,
      title: "Sumber Energi Alami",
      description:
        "Kaya potasium dan serat. Camilan sehat untuk energi dan kesehatan jantung.",
    },
  ];

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-12.5 py-7.5 bg-[#F0FBC6] rounded-lg"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-black text-2xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-black/70 text-xl font-semibold">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfoTab;
