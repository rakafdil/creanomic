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
    <div className="text-gray-700 px-0 sm:px-6">
      {/* Deskripsi Panjang */}
      <p className="self-stretch text-justify justify-start text-[#545454] text-lg sm:text-xl font-medium mb-10 lg:mb-20">
        Pisang ini cocok dijadikan camilan sehat, pelengkap sarapan, atau bahan
        smoothie favorit Anda. Ditanam dengan perawatan terbaik, Sweet Banana
        bebas bahan pengawet dan dikemas dengan higienis untuk menjaga kualitas
        serta cita rasanya.
      </p>

      {/* Button Keunggulan */}
      <div className="flex justify-center">
        <button
          // Ukuran text dan padding lebih kecil di mobile
          className="bg-[#0A3917] text-white text-xl lg:text-2xl font-semibold px-10 py-2 rounded-xl lg:px-15 lg:py-3 lg:rounded-[20px] hover:bg-green-900 transition-all"
        >
          Keunggulan Produk
        </button>
      </div>

      {/* Advantages Grid */}
      {/* Grid: 2 kolom di layar kecil (sm), 4 kolom di layar medium ke atas (md) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-8 lg:py-10">
        {advantages.map((item, i) => (
          <div
            key={i}
            className="relative rounded-lg lg:rounded-xl overflow-hidden w-full aspect-[4/5]"
          >
            <Image
              src={item.img}
              alt={item.text}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-center text-sm sm:text-lg lg:text-2xl font-semibold p-2">
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
