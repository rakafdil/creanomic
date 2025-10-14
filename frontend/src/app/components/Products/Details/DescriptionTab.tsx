import Image from "next/image";

const DescriptionTab = () => {
  const advantages = [
    {
      img: "/assets/advantage1.jpg",
      text: "Rasa manis alami Tekstur lembut",
    },
    {
      img: "/assets/advantage2.jpg",
      text: "Sumber energi cepat dan bergizi",
    },
    {
      img: "/assets/advantage3.jpg",
      text: "Aman dikonsumsi anak-anak maupun dewasa",
    },
    {
      img: "/assets/advantage4.jpg",
      text: "Cocok untuk diet dan gaya hidup sehat",
    },
  ];

  return (
    <div className="text-gray-700">
      <p className="self-stretch text-justify justify-start text-[#545454] text-3xl font-medium mb-20">
        Pisang ini cocok dijadikan camilan sehat, pelengkap sarapan, atau bahan
        smoothie favorit Anda. Ditanam dengan perawatan terbaik, Sweet Banana
        bebas bahan pengawet dan dikemas dengan higienis untuk menjaga kualitas
        serta cita rasanya.
      </p>

      <div className="flex justify-center">
        <button className="bg-[#0A3917] text-white text-2xl font-semibold px-15 py-3 rounded-[20px] hover:bg-green-900 transition-all">
          Keunggulan Produk
        </button>
      </div>

      {/* Advantages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-10">
        {advantages.map((item, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden w-full aspect-[4/5]"
          >
            <Image
              src={item.img}
              alt={item.text}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-center text-2xl font-semibold">
              {item.text.split("\n").map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescriptionTab;
