import { IconType } from "react-icons";
import {
  GiFarmer,
  GiBarn,
  GiStrawberry,
  GiCorn,
  GiCow,
  GiGoat,
  GiCarrot,
  GiChicken,
  GiPig,
  GiCoffeeBeans,
} from "react-icons/gi";
import { FaFish, FaMapMarkerAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

// Ekspor ikon agar bisa dipakai di komponen lain
export {
  GiFarmer,
  GiBarn,
  GiStrawberry,
  GiCorn,
  GiCow,
  GiGoat,
  GiCarrot,
  GiChicken,
  GiPig,
  GiCoffeeBeans,
  FaFish,
  FaMapMarkerAlt,
  RxCross2,
};

// --- TIPE DATA ---
export interface Product {
  name: string;
  quantity: number; // Angka ini akan menentukan persentase
  icon: IconType;
}

export interface ProductCategory {
  categoryName: string;
  icon: IconType;
  products: Product[];
}

export interface LocationData {
  id: string;
  name: string;
  province: string;
  position: [number, number]; // [lat, lng]
  categories: ProductCategory[];
}

// --- DUMMY DATA ---
export const dummyLocations: LocationData[] = [
  {
    id: "bdg",
    name: "Bandung",
    province: "Jawa Barat",
    position: [-6.9175, 107.6191],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [
          { name: "Strawberry", quantity: 40, icon: GiStrawberry },
          { name: "Kopi", quantity: 30, icon: GiCoffeeBeans },
        ],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [
          { name: "Sapi", quantity: 25, icon: GiCow },
          { name: "Ayam", quantity: 5, icon: GiChicken },
        ],
      },
    ],
  },
  {
    id: "sby",
    name: "Surabaya",
    province: "Jawa Timur",
    position: [-7.2575, 112.7521],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [{ name: "Jagung", quantity: 15, icon: GiCorn }],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [
          { name: "Ayam", quantity: 45, icon: GiChicken },
          { name: "Babi", quantity: 20, icon: GiPig },
        ],
      },
      {
        categoryName: "Hasil Perikanan",
        icon: FaFish,
        products: [{ name: "Ikan Bandeng", quantity: 20, icon: FaFish }],
      },
    ],
  },
  {
    id: "mks",
    name: "Makassar",
    province: "Sulawesi Selatan",
    position: [-5.1477, 119.4327],
    categories: [
      {
        categoryName: "Hasil Perikanan",
        icon: FaFish,
        products: [{ name: "Ikan Tuna", quantity: 60, icon: FaFish }],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [
          { name: "Kambing", quantity: 30, icon: GiGoat },
          { name: "Sapi", quantity: 10, icon: GiCow },
        ],
      },
    ],
  },
];
