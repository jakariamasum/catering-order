import { MenuItemType } from "@/types";

export const menuItems: MenuItemType[] = [
  // Appetizers
  {
    id: "app-1",
    name: "শিঙাড়া (Shingara)",
    description: "মসলাযুক্ত আলু ও মাংস ভর্তি ছোট ভাজা পেস্ট্রি",
    price: 5.99,
    category: "appetizers",
    image: "https://i.ibb.co.com/5W3JMp5S/1540101477483743.jpg",
    quantity: 0,
  },
  {
    id: "app-2",
    name: "চপ (Chop)",
    description: "সবজি বা মাংসের ভর্তা দিয়ে তৈরি মশলাদার ভাজা স্ন্যাক্স",
    price: 6.99,
    category: "appetizers",
    image:
      "https://i.ibb.co.com/sdzkzz3v/images-q-tbn-ANd9-Gc-R52-Tl-Jwl7-Q-Wa-D0-Xy-BSZBt-SWv6r-MIFNX498g-s.jpg",
    quantity: 0,
  },
  {
    id: "app-3",
    name: "পিয়াজু (Piyaju)",
    description: "ডাল এবং পেঁয়াজ দিয়ে তৈরি মচমচে ভাজা খাবার",
    price: 4.99,
    category: "appetizers",
    image:
      "https://i.ibb.co.com/zHJZ4xM2/images-q-tbn-ANd9-Gc-R0-Kpyoig-IQk-UTJz8q5zc-NOhz77l-VUkg-Pp0-JQ-s.jpg",
    quantity: 0,
  },

  // Mains
  {
    id: "main-1",
    name: "ভুনা খিচুড়ি (Bhuna Khichuri)",
    description: "মশলাদার ডাল-চালের খিচুড়ি, মাংস বা ডিমের সাথে পরিবেশন",
    price: 14.99,
    category: "mains",
    image:
      "https://i.ibb.co.com/xq3ntRWz/images-q-tbn-ANd9-Gc-T6x-MIY8r-RBCzdc-O9-KBTHHa522-Gt-R4ef-Fqn2-Q-s.jpg",
    quantity: 0,
  },
  {
    id: "main-2",
    name: "গরুর মাংস ভুনা (Beef Bhuna)",
    description: "মসলাযুক্ত ধীরপক্ক গরুর মাংসের কারি",
    price: 18.99,
    category: "mains",
    image:
      "https://i.ibb.co.com/jPjTFyvp/images-q-tbn-ANd9-Gc-RU3vhe-Tvrl4-Ph5-TWx-Mvg-G8zrjn-J1umbz-E43-Q-s.jpg",
    quantity: 0,
  },
  {
    id: "main-3",
    name: "ইলিশ মাছ ভাজা (Fried Hilsa)",
    description: "ইলিশ মাছ হালকা ভাজা, সরিষা তেলের সুবাসে",
    price: 19.99,
    category: "mains",
    image:
      "https://i.ibb.co.com/x8GP0Mz0/images-q-tbn-ANd9-Gc-Q15-LOBMi9s2-Yxagyc-QQl-S1-G3r-Jl-Ie-Qec4-Mw-s.jpg",
    quantity: 0,
  },

  // Sides
  {
    id: "side-1",
    name: "আলু ভর্তা (Aloo Bharta)",
    description: "ভাজা পেঁয়াজ ও সরিষার তেলে মাখানো আলু ভর্তা",
    price: 3.99,
    category: "sides",
    image:
      "https://i.ibb.co.com/Dgr0Bxn8/images-q-tbn-ANd9-Gc-QVmk-YHFH4bv-VJx-9-SRCe1-Mwsq12-Huq-EYq8k-Q-s.jpg",
    quantity: 0,
  },
  {
    id: "side-2",
    name: "শাক ভাজি (Saag Bhaji)",
    description: "তরতাজা শাক ভাজা সরিষার তেলে",
    price: 4.99,
    category: "sides",
    image:
      "https://i.ibb.co.com/vxs8DHk6/images-q-tbn-ANd9-Gc-TPv7xgv-Iqeovw0t-UY8-Sq-MFRtr-Jsr-CAa3-ey-Q-s.jpg",
    quantity: 0,
  },
  {
    id: "side-3",
    name: "ডাল (Dal)",
    description: "মসলাযুক্ত ডাল রান্না, ভাতের সাথে উপযোগী",
    price: 5.99,
    category: "sides",
    image:
      "https://i.ibb.co.com/60v7SZgy/images-q-tbn-ANd9-Gc-Ri-G5pd-Md-Pzl5e-J-UQt-TUO6cz-YWZ37-O3b-Y-Kg-s.jpg",
    quantity: 0,
  },

  // Desserts
  {
    id: "dessert-1",
    name: "মিষ্টি দই (Mishti Doi)",
    description: "গুরুতর দুধ এবং চিনি দিয়ে তৈরি মিষ্টি দই",
    price: 6.99,
    category: "desserts",
    image:
      "https://i.ibb.co.com/cKK3f52g/images-q-tbn-ANd9-Gc-QDLs-UNEi-BLCWZb1-EAIUPIs68a-Lib5-QAI8p-Ig-s.jpg",
    quantity: 0,
  },
  {
    id: "dessert-2",
    name: "রসগোল্লা (Rasgulla)",
    description: "চিনি সিরাপে ডোবানো নরম ছানার বল",
    price: 5.99,
    category: "desserts",
    image: "https://i.ibb.co.com/XrGF18qP/sweets-1.jpg",
    quantity: 0,
  },

  // Beverages
  {
    id: "bev-1",
    name: "লাচ্ছি (Lassi)",
    description: "মিষ্টি দইয়ের ঠান্ডা পানীয়",
    price: 3.99,
    category: "beverages",
    image:
      "https://i.ibb.co.com/F4fVc68j/images-q-tbn-ANd9-Gc-QQ4-V2-J2zt-MNs-Nowj5v7-SD7m-Ac5l-Koh-SWmi-KQ-s.jpg",
    quantity: 0,
  },
  {
    id: "bev-2",
    name: "ডাবের পানি (Coconut Water)",
    description: "প্রাকৃতিকভাবে ঠান্ডা ডাবের পানি",
    price: 4.99,
    category: "beverages",
    image:
      "https://i.ibb.co.com/Z1GWC0tG/images-q-tbn-ANd9-Gc-TXsbj-UTLEVVcy2-BN2q-Mk-Crq-Tb-Nv8u-ZFzto-RQ-s.jpg",
    quantity: 0,
  },
];

export const getMenuItemsByCategory = (category: string) => {
  return menuItems.filter((item) => item.category === category);
};
