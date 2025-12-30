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
    ],
  },
  {
    id: "mks",
    name: "Makassar",
    province: "Sulawesi Selatan",
    position: [-5.1477, 119.4327],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [{ name: "Jagung", quantity: 22, icon: GiCorn }],
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
  {
    id: "dps",
    name: "Denpasar",
    province: "Bali",
    position: [-8.6705, 115.2126],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [
          { name: "Kopi", quantity: 50, icon: GiCoffeeBeans },
          { name: "Wortel", quantity: 20, icon: GiCarrot },
        ],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [{ name: "Ayam", quantity: 30, icon: GiChicken }],
      },
    ],
  },
  {
    id: "mdn",
    name: "Medan",
    province: "Sumatera Utara",
    position: [3.5952, 98.6722],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [
          { name: "Jagung", quantity: 35, icon: GiCorn },
          { name: "Kopi", quantity: 25, icon: GiCoffeeBeans },
        ],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [{ name: "Sapi", quantity: 40, icon: GiCow }],
      },
    ],
  },
  {
    id: "plb",
    name: "Palembang",
    province: "Sumatera Selatan",
    position: [-2.9909, 104.7566],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [{ name: "Jagung", quantity: 20, icon: GiCorn }],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [
          { name: "Ayam", quantity: 25, icon: GiChicken },
          { name: "Kambing", quantity: 15, icon: GiGoat },
        ],
      },
    ],
  },
  {
    id: "bjm",
    name: "Banjarmasin",
    province: "Kalimantan Selatan",
    position: [-3.3186, 114.5944],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [{ name: "Jagung", quantity: 18, icon: GiCorn }],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [{ name: "Sapi", quantity: 22, icon: GiCow }],
      },
    ],
  },
  {
    id: "jyp",
    name: "Jayapura",
    province: "Papua",
    position: [-2.5337, 140.7181],
    categories: [
      {
        categoryName: "Hasil Pertanian",
        icon: GiFarmer,
        products: [{ name: "Wortel", quantity: 10, icon: GiCarrot }],
      },
      {
        categoryName: "Hasil Peternakan",
        icon: GiBarn,
        products: [{ name: "Kambing", quantity: 8, icon: GiGoat }],
      },
    ],
  },
];
