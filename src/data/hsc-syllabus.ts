export interface Topic {
  id: string;
  name: string;
  importance: "high" | "medium";
}

export interface Chapter {
  id: string;
  number: number;
  name: string;
  englishName: string;
  codeName: string;
  description: string;
  topics: Topic[];
  territoryPath: string;
  labelCoord: { x: number; y: number };
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  code: string;
  icon: string;
  chapters: Chapter[];
}

export interface ColorTheme {
  id: string;
  name: string;
  englishName: string;
  primary: string;
  darkest: string;
  medium: string;
  lightest: string;
  glow: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "emerald",
    name: "সবুজ বাংলাদেশ",
    englishName: "Bengal Green",
    primary: "#0f6b4f",
    darkest: "#093e2e",
    medium: "#1a8a66",
    lightest: "#d4efe3",
    glow: "rgba(15, 107, 79, 0.35)"
  },
  {
    id: "crimson",
    name: "লাল সূর্য ও পদ্মা",
    englishName: "Padma Crimson",
    primary: "#b91c1c",
    darkest: "#6b1414",
    medium: "#dc2626",
    lightest: "#fee2e2",
    glow: "rgba(185, 28, 28, 0.35)"
  },
  {
    id: "royal",
    name: "মেঘনা নদী",
    englishName: "Meghna Blue",
    primary: "#1d4ed8",
    darkest: "#172e6b",
    medium: "#2563eb",
    lightest: "#dbeafe",
    glow: "rgba(29, 78, 216, 0.35)"
  },
  {
    id: "amber",
    name: "ধানসিঁড়ি সোনালী",
    englishName: "Harvest Gold",
    primary: "#b45309",
    darkest: "#632d05",
    medium: "#d97706",
    lightest: "#fef3c7",
    glow: "rgba(180, 83, 9, 0.35)"
  },
  {
    id: "violet",
    name: "নীলপদ্ম বেগুনী",
    englishName: "Lotus Violet",
    primary: "#6d28d9",
    darkest: "#3b1378",
    medium: "#7c3aed",
    lightest: "#ede9fe",
    glow: "rgba(109, 40, 217, 0.35)"
  }
];

import { getAtlasGeometries } from "./map-geometries";

function generateContiguousLayout(count: number, width = 620, height = 430) {
  return getAtlasGeometries(count, width, height);
}

const bio1Layout = generateContiguousLayout(12);
const BIO_1_CHAPTERS: Chapter[] = [
  {
    id: "b1-c1",
    number: 1,
    name: "কোষ ও এর গঠন",
    englishName: "Cell & its Structure",
    codeName: "কোষ গঠন",
    description: "কোষ প্রাচীর, প্লাজমামেমব্রেন, ডিএনএ, আরএনএ ও প্রোটিন সংশ্লেষণ",
    territoryPath: bio1Layout[0].path,
    labelCoord: bio1Layout[0].center,
    topics: [
      { id: "b1-c1-t1", name: "কোষপ্রাচীর ও ফ্লুইড মোজাইক মডেল", importance: "high" },
      { id: "b1-c1-t2", name: "মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্টের গঠন", importance: "high" },
      { id: "b1-c1-t3", name: "ডিএনএ অনুলিপন (DNA Replication)", importance: "high" },
      { id: "b1-c1-t4", name: "ট্রান্সক্রিপশন ও ট্রান্সলেশন", importance: "high" }
    ]
  },
  {
    id: "b1-c2",
    number: 2,
    name: "কোষ বিভাজন",
    englishName: "Cell Division",
    codeName: "কোষ বিভাজন",
    description: "মাইটোসিস, মায়োসিস ও ক্রসিং ওভার",
    territoryPath: bio1Layout[1].path,
    labelCoord: bio1Layout[1].center,
    topics: [
      { id: "b1-c2-t1", name: "মাইটোসিসের পর্যায়সমূহ ও গুরুত্ব", importance: "high" },
      { id: "b1-c2-t2", name: "মায়োসিস-১ প্রফেজ-১ এর উপপর্যায়সমূহ", importance: "high" },
      { id: "b1-c2-t3", name: "ক্রসিং ওভার কৌশল ও তাৎপর্য", importance: "high" }
    ]
  },
  {
    id: "b1-c3",
    number: 3,
    name: "কোষ রসায়ন",
    englishName: "Cell Chemistry",
    codeName: "কোষ রসায়ন",
    description: "কার্বোহাইড্রেট, প্রোটিন, লিপিড ও এনজাইম",
    territoryPath: bio1Layout[2].path,
    labelCoord: bio1Layout[2].center,
    topics: [
      { id: "b1-c3-t1", name: "মনোস্যাকারাইড, ডাইস্যাকারাইড ও পলিস্যাকারাইড", importance: "high" },
      { id: "b1-c3-t2", name: "অ্যামিনো অ্যাসিড ও প্রোটিনের শ্রেণিবিভাগ", importance: "high" },
      { id: "b1-c3-t3", name: "এনজাইমের বৈশিষ্ট্য ও তালা-চাবি মতবাদ", importance: "high" }
    ]
  },
  {
    id: "b1-c4",
    number: 4,
    name: "অণুজীব",
    englishName: "Microorganisms",
    codeName: "অণুজীব",
    description: "ভাইরাস, ব্যাকটেরিয়া ও ম্যালেরিয়া পরজীবী",
    territoryPath: bio1Layout[3].path,
    labelCoord: bio1Layout[3].center,
    topics: [
      { id: "b1-c4-t1", name: "টি-২ ফায ভাইরাস ও এইচআইভি গঠন", importance: "high" },
      { id: "b1-c4-t2", name: "ব্যাকটেরিয়ার গঠন ও অর্থনৈতিক গুরুত্ব", importance: "high" },
      { id: "b1-c4-t3", name: "ম্যালেরিয়া পরজীবীর জীবনচক্র (হেপাটিক ও এরিথ্রোসাইটিক)", importance: "high" },
      { id: "b1-c4-t4", name: "হেপাটাইটিস ও ডেঙ্গু জ্বর সংক্রমণ", importance: "medium" }
    ]
  },
  {
    id: "b1-c5",
    number: 5,
    name: "শৈবাল ও ছত্রাক",
    englishName: "Algae & Fungi",
    codeName: "শৈবাল-ছত্রাক",
    description: "ইউলোথ্রিক্স ও অ্যাগারিকাস",
    territoryPath: bio1Layout[4].path,
    labelCoord: bio1Layout[4].center,
    topics: [
      { id: "b1-c5-t1", name: "ইউলোথ্রিক্স (Ulothrix) এর গঠন ও প্রজনন", importance: "high" },
      { id: "b1-c5-t2", name: "অ্যাগারিকাস (Agaricus) গঠন ও ফ্রুটবডি", importance: "high" },
      { id: "b1-c5-t3", name: "লাইকেন (Lichen) এর গুরুত্ব", importance: "medium" }
    ]
  },
  {
    id: "b1-c6",
    number: 6,
    name: "ব্রায়োফাইটা ও টেরিডোফাইটা",
    englishName: "Bryophyta & Pteridophyta",
    codeName: "ব্রায়ো-টেরিডো",
    description: "রিকসিয়া ও ফার্ন প্রোথ্যালাস",
    territoryPath: bio1Layout[5].path,
    labelCoord: bio1Layout[5].center,
    topics: [
      { id: "b1-c6-t1", name: "রিকসিয়া (Riccia) এর বাহ্যিক ও অন্তর্গঠন", importance: "high" },
      { id: "b1-c6-t2", name: "টেরিস (Pteris) এর প্রোথ্যালাস ও জনুক্রম", importance: "high" }
    ]
  },
  {
    id: "b1-c7",
    number: 7,
    name: "নগ্নবীজী ও আবৃতবীজী উদ্ভিদ",
    englishName: "Gymnosperms & Angiosperms",
    codeName: "নগ্ন-আবৃতবীজী",
    description: "সাইকাস, মালভেসি ও পোয়েসি গোত্র",
    territoryPath: bio1Layout[6].path,
    labelCoord: bio1Layout[6].center,
    topics: [
      { id: "b1-c7-t1", name: "সাইকাস (Cycas) উদ্ভিদের বৈশিষ্ট্য ও কোরালয়েড মূল", importance: "high" },
      { id: "b1-c7-t2", name: "পুষ্পপ্রতীক ও পুষ্পসংকেত নির্ণয়", importance: "high" },
      { id: "b1-c7-t3", name: "মালভেসি (Malvaceae) গোত্রের শনাক্তকারী বৈশিষ্ট্য", importance: "high" },
      { id: "b1-c7-t4", name: "পোয়েসি (Poaceae) গোত্রের শনাক্তকারী বৈশিষ্ট্য", importance: "high" }
    ]
  },
  {
    id: "b1-c8",
    number: 8,
    name: "টিস্যু ও টিস্যুতন্ত্র",
    englishName: "Tissue & Tissue System",
    codeName: "টিস্যুতন্ত্র",
    description: "ভাজক টিস্যু, ভাস্কুলার বান্ডল ও মূল-কাণ্ডের অন্তর্গঠন",
    territoryPath: bio1Layout[7].path,
    labelCoord: bio1Layout[7].center,
    topics: [
      { id: "b1-c8-t1", name: "ভাজক টিস্যুর শ্রেণিবিভাগ ও কাজ", importance: "high" },
      { id: "b1-c8-t2", name: "ভাস্কুলার বান্ডলের প্রকারভেদ", importance: "high" },
      { id: "b1-c8-t3", name: "একবীজপত্রী উদ্ভিদের মূল ও কাণ্ডের অন্তর্গঠন", importance: "high" }
    ]
  },
  {
    id: "b1-c9",
    number: 9,
    name: "উদ্ভিদ শারীরতত্ত্ব",
    englishName: "Plant Physiology",
    codeName: "শারীরতত্ত্ব",
    description: "প্রস্বেদন, সালোকসংশ্লেষণ (C3/C4) ও শ্বসন",
    territoryPath: bio1Layout[8].path,
    labelCoord: bio1Layout[8].center,
    topics: [
      { id: "b1-c9-t1", name: "পত্ররন্ধ্র খোলা ও বন্ধ হওয়ার আধুনিক মতবাদ", importance: "high" },
      { id: "b1-c9-t2", name: "ক্যালভিন চক্র (C3) ও হ্যাচ-স্ল্যাক চক্র (C4)", importance: "high" },
      { id: "b1-c9-t3", name: "গ্লাইকোলাইসিস ও ক্রেবস চক্রের সমীকরণ", importance: "high" },
      { id: "b1-c9-t4", name: "প্রস্বেদনের প্রভাবক ও তাৎপর্য", importance: "medium" }
    ]
  },
  {
    id: "b1-c10",
    number: 10,
    name: "উদ্ভিদ প্রজনন",
    englishName: "Plant Reproduction",
    codeName: "প্রজনন",
    description: "গ্যামেটোফাইট উৎপত্তি ও দ্বি-নিষেকের তাৎপর্য",
    territoryPath: bio1Layout[9].path,
    labelCoord: bio1Layout[9].center,
    topics: [
      { id: "b1-c10-t1", name: "পুং ও স্ত্রী গ্যামেটোফাইটের বিকাশ", importance: "high" },
      { id: "b1-c10-t2", name: "নিশেক প্রক্রিয়া ও দ্বি-নিশেক (Double fertilization)", importance: "high" },
      { id: "b1-c10-t3", name: "অযৌন ও কৃত্রিম অঙ্গজ প্রজনন", importance: "medium" }
    ]
  },
  {
    id: "b1-c11",
    number: 11,
    name: "জীবপ্রযুক্তি",
    englishName: "Biotechnology",
    codeName: "জীবপ্রযুক্তি",
    description: "টিস্যু কালচার ও রিকম্বিনেন্ট ডিএনএ প্রযুক্তি",
    territoryPath: bio1Layout[10].path,
    labelCoord: bio1Layout[10].center,
    topics: [
      { id: "b1-c11-t1", name: "টিস্যু কালচার প্রযুক্তির ধাপসমূহ", importance: "high" },
      { id: "b1-c11-t2", name: "রিকম্বিনেন্ট ডিএনএ (জিন ক্লোনিং) ধাপসমূহ", importance: "high" },
      { id: "b1-c11-t3", name: "ট্রান্সজেনিক উদ্ভিদ ও জিন প্রযুক্তির ব্যবহার", importance: "high" }
    ]
  },
  {
    id: "b1-c12",
    number: 12,
    name: "পরিবেশ ও সংরক্ষণ",
    englishName: "Ecology & Conservation",
    codeName: "বাস্তুতন্ত্র",
    description: "সুন্দরবনের উদ্ভিদ ও ইন-সিটু/এক্স-সিটু সংরক্ষণ",
    territoryPath: bio1Layout[11].path,
    labelCoord: bio1Layout[11].center,
    topics: [
      { id: "b1-c12-t1", name: "সুন্দরবনের লবণাক্ত উদ্ভিদের অভিযোজন", importance: "high" },
      { id: "b1-c12-t2", name: "ইন-সিটু ও এক্স-সিটু জীববৈচিত্র্য সংরক্ষণ", importance: "high" }
    ]
  }
];

const bio2Layout = generateContiguousLayout(12);
const BIO_2_CHAPTERS: Chapter[] = [
  {
    id: "b2-c1",
    number: 1,
    name: "প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস",
    englishName: "Animal Diversity",
    codeName: "শ্রেণিবিন্যাস",
    description: "শ্রেণিবিন্যাসের ভিত্তি ও প্রধান পর্বসমূহ",
    territoryPath: bio2Layout[0].path,
    labelCoord: bio2Layout[0].center,
    topics: [
      { id: "b2-c1-t1", name: "সিলোম ও প্রতিসাম্যতার ভিত্তি", importance: "high" },
      { id: "b2-c1-t2", name: "নন-কর্ডাটা পর্বসমূহের শনাক্তকারী বৈশিষ্ট্য", importance: "high" },
      { id: "b2-c1-t3", name: "কর্ডাটার প্রধান উপপর্ব ও শ্রেণির বৈশিষ্ট্য", importance: "high" }
    ]
  },
  {
    id: "b2-c2",
    number: 2,
    name: "প্রাণীর পরিচিতি (হাইড্রা, ঘাসফড়িং ও রুই)",
    englishName: "Animal Types",
    codeName: "প্রাণী পরিচিতি",
    description: "হাইড্রা, ঘাসফড়িং ও রুই মাছ",
    territoryPath: bio2Layout[1].path,
    labelCoord: bio2Layout[1].center,
    topics: [
      { id: "b2-c2-t1", name: "হাইড্রার নেমাটোসিস্ট ও নিডোসাইট", importance: "high" },
      { id: "b2-c2-t2", name: "ঘাসফড়িং এর পুঞ্জাক্ষি ও ওমাটিডিয়াম", importance: "high" },
      { id: "b2-c2-t3", name: "রুই মাছের রক্ত সংবহন ও পটকা (Air bladder)", importance: "high" }
    ]
  },
  {
    id: "b2-c3",
    number: 3,
    name: "পরিপাক ও শোষণ",
    englishName: "Digestion & Absorption",
    codeName: "পরিপাক",
    description: "মুখগহ্বর, পাকস্থলী ও ক্ষুদ্রান্ত্রে পরিপাক",
    territoryPath: bio2Layout[2].path,
    labelCoord: bio2Layout[2].center,
    topics: [
      { id: "b2-c3-t1", name: "পাকস্থলীতে গ্যাস্ট্রিক রস ও পরিপাক", importance: "high" },
      { id: "b2-c3-t2", name: "যকৃতের সঞ্চয়ী ও বিপাকীয় ভূমিকা", importance: "high" },
      { id: "b2-c3-t3", name: "ক্ষুদ্রান্ত্রে এনজাইমের ক্রিয়া ও শোষণ", importance: "high" }
    ]
  },
  {
    id: "b2-c4",
    number: 4,
    name: "রক্ত ও সংবহন",
    englishName: "Blood & Circulation",
    codeName: "রক্ত সংবহন",
    description: "হৃদপিণ্ড, কার্ডিয়াক চক্র ও রক্ত তঞ্চন",
    territoryPath: bio2Layout[3].path,
    labelCoord: bio2Layout[3].center,
    topics: [
      { id: "b2-c4-t1", name: "রক্তের উপাদান ও রক্ত তঞ্চন কৌশল", importance: "high" },
      { id: "b2-c4-t2", name: "হৃদপিণ্ডের গঠন ও কার্ডিয়াক চক্র (Systole/Diastole)", importance: "high" },
      { id: "b2-c4-t3", name: "পেসমেকার, অ্যানজিওপ্লাস্টি ও বাইপাস সার্জারি", importance: "high" }
    ]
  },
  {
    id: "b2-c5",
    number: 5,
    name: "শ্বাসক্রিয়া ও শ্বসন",
    englishName: "Respiration",
    codeName: "শ্বাসক্রিয়া",
    description: "ফুসফুস, গ্যাসীয় পরিবহন (O2 ও CO2)",
    territoryPath: bio2Layout[4].path,
    labelCoord: bio2Layout[4].center,
    topics: [
      { id: "b2-c5-t1", name: "ফুসফুসের গঠন ও অ্যালভিওলাস", importance: "high" },
      { id: "b2-c5-t2", name: "অক্সিজেন ও কার্বন ডাই-অক্সাইড পরিবহন", importance: "high" }
    ]
  },
  {
    id: "b2-c6",
    number: 6,
    name: "বর্জ্য ও নিষ্কাশন",
    englishName: "Excretion",
    codeName: "রেচনতন্ত্র",
    description: "নেফ্রনের গঠন ও মূত্র সৃষ্টি প্রক্রিয়া",
    territoryPath: bio2Layout[5].path,
    labelCoord: bio2Layout[5].center,
    topics: [
      { id: "b2-c6-t1", name: "বৃক্ক ও নেফ্রনের আণুবীক্ষণিক গঠন", importance: "high" },
      { id: "b2-c6-t2", name: "মূত্র সৃষ্টি প্রক্রিয়া ও ডায়ালাইসিস", importance: "high" }
    ]
  },
  {
    id: "b2-c7",
    number: 7,
    name: "চলন ও অঙ্গচালনা",
    englishName: "Locomotion & Bones",
    codeName: "কঙ্কালতন্ত্র",
    description: "অস্থি, পেশি ও পেশি সংকোচনের স্লাইডিং ফিলামেন্ট",
    territoryPath: bio2Layout[6].path,
    labelCoord: bio2Layout[6].center,
    topics: [
      { id: "b2-c7-t1", name: "মানব কঙ্কালের প্রধান অস্থিসমূহ", importance: "high" },
      { id: "b2-c7-t2", name: "পেশি সংকোচনের স্লাইডিং ফিলামেন্ট থিওরি", importance: "high" }
    ]
  },
  {
    id: "b2-c8",
    number: 8,
    name: "সমন্বয় ও নিয়ন্ত্রণ",
    englishName: "Coordination & Control",
    codeName: "সমন্বয়",
    description: "মস্তিষ্ক, চোখ, কান ও অন্তঃক্ষরা গ্রন্থি",
    territoryPath: bio2Layout[7].path,
    labelCoord: bio2Layout[7].center,
    topics: [
      { id: "b2-c8-t1", name: "মস্তিষ্কের বিভিন্ন অংশ ও করোটি স্নায়ু", importance: "high" },
      { id: "b2-c8-t2", name: "চোখের অন্তর্গঠন ও দর্শন কৌশল", importance: "high" },
      { id: "b2-c8-t3", name: "অন্তঃক্ষরা গ্রন্থির হরমোন", importance: "high" }
    ]
  },
  {
    id: "b2-c9",
    number: 9,
    name: "মানব জীবনের ধারাবাহিকতা",
    englishName: "Human Reproduction",
    codeName: "প্রজননতন্ত্র",
    description: "গ্যামেটোজেনেসিস ও ভ্রূণের বিকাশ",
    territoryPath: bio2Layout[8].path,
    labelCoord: bio2Layout[8].center,
    topics: [
      { id: "b2-c9-t1", name: "স্পার্মাটোজেনেসিস ও উওজেনেসিস", importance: "high" },
      { id: "b2-c9-t2", name: "ভ্রূণের পরিস্ফুটন ও অমরা (Placenta)", importance: "high" }
    ]
  },
  {
    id: "b2-c10",
    number: 10,
    name: "মানবদেহের প্রতিরক্ষা (অনাক্রম্যতা)",
    englishName: "Human Immunity",
    codeName: "অনাক্রম্যতা",
    description: "প্রতিরক্ষা স্তর, অ্যান্টিবডি ও টিকা",
    territoryPath: bio2Layout[9].path,
    labelCoord: bio2Layout[9].center,
    topics: [
      { id: "b2-c10-t1", name: "প্রথম, দ্বিতীয় ও তৃতীয় প্রতিরক্ষা স্তর", importance: "high" },
      { id: "b2-c10-t2", name: "অ্যান্টিবডির গঠন ও প্রকারভেদ (IgG/IgM/IgA)", importance: "high" }
    ]
  },
  {
    id: "b2-c11",
    number: 11,
    name: "জিনতত্ত্ব ও বিবর্তন",
    englishName: "Genetics & Evolution",
    codeName: "জিনতত্ত্ব",
    description: "মেন্ডেলের সূত্র, সেক্স-লিংকড ডিসঅর্ডার",
    territoryPath: bio2Layout[10].path,
    labelCoord: bio2Layout[10].center,
    topics: [
      { id: "b2-c11-t1", name: "মেন্ডেলের ১ম ও ২য় সূত্রের ব্যতিক্রম", importance: "high" },
      { id: "b2-c11-t2", name: "সেক্স-লিংকড উত্তরাধিকার (বর্ণান্ধতা ও হিমোফিলিয়া)", importance: "high" }
    ]
  },
  {
    id: "b2-c12",
    number: 12,
    name: "প্রাণীর আচরণ",
    englishName: "Animal Behavior",
    codeName: "প্রাণী আচরণ",
    description: "সহজাত আচরণ ও শিখন আচরণ",
    territoryPath: bio2Layout[11].path,
    labelCoord: bio2Layout[11].center,
    topics: [
      { id: "b2-c12-t1", name: "ইনস্টিংক্ট বনাম লার্নিং বিহেভিয়ার", importance: "high" },
      { id: "b2-c12-t2", name: "মৌমাছির নাচের ভাষা ও ট্যাক্সিস", importance: "medium" }
    ]
  }
];

const phy1Layout = generateContiguousLayout(10);
const PHY_1_CHAPTERS: Chapter[] = [
  {
    id: "p1-c1",
    number: 1,
    name: "ভৌতজগৎ ও পরিমাপ",
    englishName: "Physical World",
    codeName: "পরিমাপ",
    description: "পরিমাপের ত্রুটি ও মাত্রা সমীকরণ",
    territoryPath: phy1Layout[0].path,
    labelCoord: phy1Layout[0].center,
    topics: [
      { id: "p1-c1-t1", name: "পরিমাপের ত্রুটি ও শতকরা ত্রুটি", importance: "high" },
      { id: "p1-c1-t2", name: "মাত্রা সমীকরণ ও নির্ভুলতা যাচাই", importance: "high" }
    ]
  },
  {
    id: "p1-c2",
    number: 2,
    name: "ভেক্টর",
    englishName: "Vectors",
    codeName: "ভেক্টর",
    description: "ডট ও ক্রস গুণন, নদী-নৌকা ও বৃষ্টি-বাতাস",
    territoryPath: phy1Layout[1].path,
    labelCoord: phy1Layout[1].center,
    topics: [
      { id: "p1-c2-t1", name: "ভেক্টর যোজন ও সামান্তরিক সূত্র", importance: "high" },
      { id: "p1-c2-t2", name: "ডট গুণন ও লম্ব হওয়ার শর্ত", importance: "high" },
      { id: "p1-c2-t3", name: "ক্রস গুণন ও ক্ষেত্রফল নির্ণয়", importance: "high" },
      { id: "p1-c2-t4", name: "নদী ও নৌকার ন্যূনতম পথ ও সময়", importance: "high" },
      { id: "p1-c2-t5", name: "বৃষ্টি ও বাতাসের আপেক্ষিক বেগ", importance: "high" }
    ]
  },
  {
    id: "p1-c3",
    number: 3,
    name: "গতিবিদ্যা",
    englishName: "Dynamics",
    codeName: "গতিবিদ্যা",
    description: "প্রক্ষেপক গতি ও লেখচিত্র",
    territoryPath: phy1Layout[2].path,
    labelCoord: phy1Layout[2].center,
    topics: [
      { id: "p1-c3-t1", name: "প্রক্ষেপক (Projectile) ও অনুভূমিক পাল্লা", importance: "high" },
      { id: "p1-c3-t2", name: "সর্বোচ্চ উচ্চতা ও বিচরণকাল", importance: "high" }
    ]
  },
  {
    id: "p1-c4",
    number: 4,
    name: "নিউটনীয় বলবিদ্যা",
    englishName: "Newtonian Mechanics",
    codeName: "বলবিদ্যা",
    description: "জড়তার ভ্রামক, ভরবেগ ও ব্যাংকিং কোণ",
    territoryPath: phy1Layout[3].path,
    labelCoord: phy1Layout[3].center,
    topics: [
      { id: "p1-c4-t1", name: "রৈখিক ও কৌণিক ভরবেগের নিত্যতা", importance: "high" },
      { id: "p1-c4-t2", name: "জড়তার ভ্রামক ও চক্রগতির ব্যাসার্ধ", importance: "high" },
      { id: "p1-c4-t3", name: "রাস্তার ব্যাংকিং কোণ ও নিরাপদ দ্রুতি", importance: "high" }
    ]
  },
  {
    id: "p1-c5",
    number: 5,
    name: "কাজ, শক্তি ও ক্ষমতা",
    englishName: "Work, Energy & Power",
    codeName: "কাজ-শক্তি",
    description: "স্প্রিং বল ও কুয়ার অঙ্ক",
    territoryPath: phy1Layout[4].path,
    labelCoord: phy1Layout[4].center,
    topics: [
      { id: "p1-c5-t1", name: "স্প্রিং-এর বিভব শক্তি ও সরলদোলক", importance: "high" },
      { id: "p1-c5-t2", name: "শক্তির সংরক্ষণশীলতা নীতি", importance: "high" },
      { id: "p1-c5-t3", name: "কূয়া ও পাম্পের কর্মদক্ষতা (η)", importance: "high" }
    ]
  },
  {
    id: "p1-c6",
    number: 6,
    name: "মহাকর্ষ ও অভিকর্ষ",
    englishName: "Gravitation",
    codeName: "মহাকর্ষ",
    description: "মুক্তিবেগ ও কৃত্রিম উপগ্রহ",
    territoryPath: phy1Layout[5].path,
    labelCoord: phy1Layout[5].center,
    topics: [
      { id: "p1-c6-t1", name: "অভিকর্ষজ ত্বরণ 'g' এর তারতম্য", importance: "high" },
      { id: "p1-c6-t2", name: "মুক্তিবেগ (Escape Velocity)", importance: "high" },
      { id: "p1-c6-t3", name: "কৃত্রিম উপগ্রহের উচ্চতা ও বেগ", importance: "high" }
    ]
  },
  {
    id: "p1-c7",
    number: 7,
    name: "পদার্থের গাঠনিক ধর্ম",
    englishName: "Structural Properties",
    codeName: "গাঠনিক ধর্ম",
    description: "ইয়ং-এর গুণাঙ্ক ও পৃষ্ঠটান",
    territoryPath: phy1Layout[6].path,
    labelCoord: phy1Layout[6].center,
    topics: [
      { id: "p1-c7-t1", name: "হুকের সূত্র ও ইয়ং-এর গুণাঙ্ক (Y)", importance: "high" },
      { id: "p1-c7-t2", name: "পৃষ্ঠটান ও সান্দ্রতা গুণাঙ্ক", importance: "high" }
    ]
  },
  {
    id: "p1-c8",
    number: 8,
    name: "পর্যায়বৃত্ত গতি",
    englishName: "Periodic Motion",
    codeName: "পর্যায়বৃত্ত",
    description: "সরল ছন্দিত স্পন্দন ও সেকেন্ড দোলক",
    territoryPath: phy1Layout[7].path,
    labelCoord: phy1Layout[7].center,
    topics: [
      { id: "p1-c8-t1", name: "সরল ছন্দিত গতির সমীকরণ", importance: "high" },
      { id: "p1-c8-t2", name: "সরল দোলকের সূত্র ও পাহাড়ের অঙ্ক", importance: "high" }
    ]
  },
  {
    id: "p1-c9",
    number: 9,
    name: "তরঙ্গ",
    englishName: "Waves",
    codeName: "তরঙ্গ",
    description: "অগ্রগামী ও স্থির তরঙ্গ, বিট",
    territoryPath: phy1Layout[8].path,
    labelCoord: phy1Layout[8].center,
    topics: [
      { id: "p1-c9-t1", name: "অগ্রগামী তরঙ্গের রাশিমালা", importance: "high" },
      { id: "p1-c9-t2", name: "বিট সৃষ্টি ও তীব্রতা লেভেল (dB)", importance: "high" }
    ]
  },
  {
    id: "p1-c10",
    number: 10,
    name: "আদর্শ গ্যাস ও গতিতত্ত্ব",
    englishName: "Ideal Gas",
    codeName: "আদর্শ গ্যাস",
    description: "বয়েল-চার্লস ও আপেক্ষিক আর্দ্রতা",
    territoryPath: phy1Layout[9].path,
    labelCoord: phy1Layout[9].center,
    topics: [
      { id: "p1-c10-t1", name: "RMS বেগ ও হ্রদের তলদেশের অঙ্ক", importance: "high" },
      { id: "p1-c10-t2", name: "আপেক্ষিক আর্দ্রতা ও শিশিরাঙ্ক", importance: "high" }
    ]
  }
];

const phy2Layout = generateContiguousLayout(11);
const PHY_2_CHAPTERS: Chapter[] = [
  {
    id: "p2-c1",
    number: 1,
    name: "তাপগতিবিদ্যা",
    englishName: "Thermodynamics",
    codeName: "তাপগতিবিদ্যা",
    description: "কার্নো ইঞ্জিন ও এন্ট্রপি",
    territoryPath: phy2Layout[0].path,
    labelCoord: phy2Layout[0].center,
    topics: [
      { id: "p2-c1-t1", name: "তাপগতিবিদ্যার ১ম ও ২য় সূত্র", importance: "high" },
      { id: "p2-c1-t2", name: "কার্নো চক্র ও ইঞ্জিনের কর্মদক্ষতা (η)", importance: "high" },
      { id: "p2-c1-t3", name: "এন্ট্রপির পরিবর্তন (ΔS)", importance: "high" }
    ]
  },
  {
    id: "p2-c2",
    number: 2,
    name: "স্থির তড়িৎ",
    englishName: "Electrostatics",
    codeName: "স্থির তড়িৎ",
    description: "কুলম্বের সূত্র ও গাউসের সূত্র",
    territoryPath: phy2Layout[1].path,
    labelCoord: phy2Layout[1].center,
    topics: [
      { id: "p2-c2-t1", name: "তড়িৎ প্রাবল্য ও তড়িৎ বিভব", importance: "high" },
      { id: "p2-c2-t2", name: "ধারকত্ব ও সমান্তরাল পাত ধারক", importance: "high" }
    ]
  },
  {
    id: "p2-c3",
    number: 3,
    name: "চল তড়িৎ",
    englishName: "Current Electricity",
    codeName: "চল তড়িৎ",
    description: "কার্শফের সূত্র ও হুইটস্টোন ব্রিজ",
    territoryPath: phy2Layout[2].path,
    labelCoord: phy2Layout[2].center,
    topics: [
      { id: "p2-c3-t1", name: "রোধের সূত্র ও তাপমাত্রা সহগ", importance: "high" },
      { id: "p2-c3-t2", name: "কার্শফের সূত্রাবলী প্রয়োগ", importance: "high" },
      { id: "p2-c3-t3", name: "হুইটস্টোন ব্রিজ ও মিটার ব্রিজ", importance: "high" }
    ]
  },
  {
    id: "p2-c4",
    number: 4,
    name: "তড়িৎ প্রবাহের চৌম্বক ক্রিয়া",
    englishName: "Magnetism",
    codeName: "চৌম্বক ক্রিয়া",
    description: "বায়োট-স্যাভার্ট সূত্র ও লরেঞ্জ বল",
    territoryPath: phy2Layout[3].path,
    labelCoord: phy2Layout[3].center,
    topics: [
      { id: "p2-c4-t1", name: "বায়োট-স্যাভার্ট সূত্র ও বৃত্তাকার কুণ্ডলী", importance: "high" },
      { id: "p2-c4-t2", name: "অ্যাম্পিয়ারের সূত্র ও লরেঞ্জ বল", importance: "high" }
    ]
  },
  {
    id: "p2-c5",
    number: 5,
    name: "তাড়িৎচৌম্বকীয় আবেশ",
    englishName: "Electromagnetic Induction",
    codeName: "চৌম্বক আবেশ",
    description: "ফ্যারাডের সূত্র ও ট্রান্সফরমার",
    territoryPath: phy2Layout[4].path,
    labelCoord: phy2Layout[4].center,
    topics: [
      { id: "p2-c5-t1", name: "ফ্যারাডের আবেশ সূত্র ও লেঞ্জের সূত্র", importance: "high" },
      { id: "p2-c5-t2", name: "ট্রান্সফরমারের সমীকরণ ও অপচয়", importance: "high" }
    ]
  },
  {
    id: "p2-c6",
    number: 6,
    name: "জ্যামিতিক আলোকবিজ্ঞান",
    englishName: "Geometrical Optics",
    codeName: "জ্যামিতিক আলো",
    description: "প্রিজম, লেন্স ও গোলীয় প্রতিসরণ",
    territoryPath: phy2Layout[5].path,
    labelCoord: phy2Layout[5].center,
    topics: [
      { id: "p2-c6-t1", name: "প্রিজমের প্রতিসরাঙ্ক ও ন্যূনতম বিচ্যুতি", importance: "high" },
      { id: "p2-c6-t2", name: "লেন্স প্রস্তুতকারকের সমীকরণ", importance: "high" }
    ]
  },
  {
    id: "p2-c7",
    number: 7,
    name: "ভৌত আলোকবিজ্ঞান",
    englishName: "Physical Optics",
    codeName: "ভৌত আলো",
    description: "ব্যতিচার, অপবর্তন ও পোলারায়ন",
    territoryPath: phy2Layout[6].path,
    labelCoord: phy2Layout[6].center,
    topics: [
      { id: "p2-c7-t1", name: "ইয়ং-এর দ্বি-চির ব্যতিচার পরীক্ষা", importance: "high" },
      { id: "p2-c7-t2", name: "একক চিরে অপবর্তন ও অপবর্তন গ্রেটিং", importance: "high" }
    ]
  },
  {
    id: "p2-c8",
    number: 8,
    name: "আধুনিক পদার্থবিজ্ঞানের সূচনা",
    englishName: "Modern Physics",
    codeName: "আধুনিক পদার্থ",
    description: "আপেক্ষিকতা, ফটোতড়িৎ ক্রিয়া",
    territoryPath: phy2Layout[7].path,
    labelCoord: phy2Layout[7].center,
    topics: [
      { id: "p2-c8-t1", name: "কাল দীর্ঘায়ন ও দৈর্ঘ্য সংকোচন", importance: "high" },
      { id: "p2-c8-t2", name: "ফটোইলেকট্রিক সমীকরণ ও কম্পটন ক্রিয়া", importance: "high" }
    ]
  },
  {
    id: "p2-c9",
    number: 9,
    name: "পরমাণুর মডেল ও নিউক্লিয়ার",
    englishName: "Atomic Models",
    codeName: "পরমাণু মডেল",
    description: "বোর মডেল ও তেজস্ক্রিয়তা",
    territoryPath: phy2Layout[8].path,
    labelCoord: phy2Layout[8].center,
    topics: [
      { id: "p2-c9-t1", name: "বোর পরমাণু মডেল ও বোর ব্যাসার্ধ", importance: "high" },
      { id: "p2-c9-t2", name: "তেজস্ক্রিয় ক্ষয় সূত্র ও অর্ধায়ু (T1/2)", importance: "high" }
    ]
  },
  {
    id: "p2-c10",
    number: 10,
    name: "সেমিকন্ডাক্টর ও ইলেকট্রনিক্স",
    englishName: "Semiconductors",
    codeName: "সেমিকন্ডাক্টর",
    description: "p-n জংশন ও ট্রানজিস্টর",
    territoryPath: phy2Layout[9].path,
    labelCoord: phy2Layout[9].center,
    topics: [
      { id: "p2-c10-t1", name: "p-n ডায়োড ও রেকটিফায়ার", importance: "high" },
      { id: "p2-c10-t2", name: "ট্রানজিস্টর ও অ্যামপ্লিফায়ার", importance: "high" }
    ]
  },
  {
    id: "p2-c11",
    number: 11,
    name: "জ্যোতির্বিজ্ঞান",
    englishName: "Astronomy",
    codeName: "জ্যোতির্বিজ্ঞান",
    description: "হাবল সূত্র ও বিগ ব্যাং",
    territoryPath: phy2Layout[10].path,
    labelCoord: phy2Layout[10].center,
    topics: [
      { id: "p2-c11-t1", name: "হাবলের সূত্র ও মহাবিশ্বের প্রসারণ", importance: "high" }
    ]
  }
];

const chem1Layout = generateContiguousLayout(5);
const CHEM_1_CHAPTERS: Chapter[] = [
  {
    id: "c1-c1",
    number: 1,
    name: "ল্যাবরেটরির নিরাপদ ব্যবহার",
    englishName: "Laboratory Safety",
    codeName: "ল্যাব নিরাপত্তা",
    description: "গ্লাস সামগ্রী ও হ্যাজার্ড সিম্বল",
    territoryPath: chem1Layout[0].path,
    labelCoord: chem1Layout[0].center,
    topics: [
      { id: "c1-c1-t1", name: "হ্যাজার্ড প্রতীক ও ঝুঁকি সতর্কতা", importance: "high" },
      { id: "c1-c1-t2", name: "ল্যাবরেটরির প্রাথমিক চিকিৎসা", importance: "medium" }
    ]
  },
  {
    id: "c1-c2",
    number: 2,
    name: "গুণগত রসায়ন",
    englishName: "Qualitative Chemistry",
    codeName: "গুণগত রসায়ন",
    description: "কোয়ান্টাম সংখ্যা ও দ্রাব্যতা গুণফল",
    territoryPath: chem1Layout[1].path,
    labelCoord: chem1Layout[1].center,
    topics: [
      { id: "c1-c2-t1", name: "কোয়ান্টাম সংখ্যা ও ইলেকট্রন বিন্যাস", importance: "high" },
      { id: "c1-c2-t2", name: "রিডবার্গ সমীকরণ ও হাইড্রোজেন বর্ণালী", importance: "high" },
      { id: "c1-c2-t3", name: "দ্রাব্যতা ও দ্রাব্যতা গুণফল (Ksp)", importance: "high" },
      { id: "c1-c2-t4", name: "শিখা পরীক্ষা ও আয়ন শনাক্তকরণ", importance: "medium" }
    ]
  },
  {
    id: "c1-c3",
    number: 3,
    name: "মৌলের পর্যায়বৃত্ত ধর্ম",
    englishName: "Periodic Properties",
    codeName: "পর্যায়বৃত্ত ধর্ম",
    description: "সংকরায়ন, ফাজানের নীতি ও হাইড্রোজেন বন্ধন",
    territoryPath: chem1Layout[2].path,
    labelCoord: chem1Layout[2].center,
    topics: [
      { id: "c1-c3-t1", name: "আয়নীকরণ শক্তি ও ইলেকট্রন আসক্তি", importance: "high" },
      { id: "c1-c3-t2", name: "সংকরায়ন (Hybridization) ও জ্যামিতিক আকৃতি", importance: "high" },
      { id: "c1-c3-t3", name: "ফাজানের নীতি ও পোলারায়ন", importance: "high" }
    ]
  },
  {
    id: "c1-c4",
    number: 4,
    name: "রাসায়নিক পরিবর্তন",
    englishName: "Chemical Changes",
    codeName: "রাসায়নিক পরিবর্তন",
    description: "Kp-Kc, লা-শাতেলিয়ারের নীতি ও বাফার দ্রবণ",
    territoryPath: chem1Layout[3].path,
    labelCoord: chem1Layout[3].center,
    topics: [
      { id: "c1-c4-t1", name: "Kp ও Kc এর রাশিমালা ও হিসাব", importance: "high" },
      { id: "c1-c4-t2", name: "লা-শাতেলিয়ারের নীতি প্রয়োগ", importance: "high" },
      { id: "c1-c4-t3", name: "pH গণনা ও বাফার দ্রবণ", importance: "high" }
    ]
  },
  {
    id: "c1-c5",
    number: 5,
    name: "কর্মমুখী রসায়ন",
    englishName: "Applied Chemistry",
    codeName: "কর্মমুখী রসায়ন",
    description: "খাদ্য সংরক্ষণ, ভিনেগার ও টয়লেট্রিজ",
    territoryPath: chem1Layout[4].path,
    labelCoord: chem1Layout[4].center,
    topics: [
      { id: "c1-c5-t1", name: "খাদ্য সংরক্ষক ও প্রিজারভেটিভস", importance: "high" },
      { id: "c1-c5-t2", name: "ভিনেগারের প্রস্তুতি ও কৌশল", importance: "high" }
    ]
  }
];

const chem2Layout = generateContiguousLayout(5);
const CHEM_2_CHAPTERS: Chapter[] = [
  {
    id: "c2-c1",
    number: 1,
    name: "পরিবেশ রসায়ন",
    englishName: "Environmental Chemistry",
    codeName: "পরিবেশ রসায়ন",
    description: "গ্যাসের সূত্রাবলী ও অ্যাসিড বৃষ্টি",
    territoryPath: chem2Layout[0].path,
    labelCoord: chem2Layout[0].center,
    topics: [
      { id: "c2-c1-t1", name: "বয়েল, চার্লস ও ডাল্টনের আংশিক চাপ সূত্র", importance: "high" },
      { id: "c2-c1-t2", name: "আদর্শ ও বাস্তব গ্যাস (ভ্যান ডার ওয়ালস)", importance: "high" },
      { id: "c2-c1-t3", name: "গ্রিনহাউস প্রভাব ও পানির BOD/COD", importance: "high" }
    ]
  },
  {
    id: "c2-c2",
    number: 2,
    name: "জৈব রসায়ন",
    englishName: "Organic Chemistry",
    codeName: "জৈব রসায়ন",
    description: "অ্যারোমেটিক যৌগ, অ্যালকোহল ও অ্যালডিহাইড",
    territoryPath: chem2Layout[1].path,
    labelCoord: chem2Layout[1].center,
    topics: [
      { id: "c2-c2-t1", name: "জৈব যৌগের নামকরণ ও সমাণুতা", importance: "high" },
      { id: "c2-c2-t2", name: "বেনজিন ও ইলেকট্রোফিলিক প্রতিস্থাপন", importance: "high" },
      { id: "c2-c2-t3", name: "গ্রিগনার্ড বিকারক ও রূপান্তরসমূহ", importance: "high" },
      { id: "c2-c2-t4", name: "অ্যালডিহাইড ও কিটোনের শনাক্তকারী পরীক্ষা", importance: "high" }
    ]
  },
  {
    id: "c2-c3",
    number: 3,
    name: "পরিমাণগত রসায়ন",
    englishName: "Quantitative Chemistry",
    codeName: "পরিমাণগত রসায়ন",
    description: "মোলারিটি, টাইট্রেশন ও জারণ-বিজারণ",
    territoryPath: chem2Layout[2].path,
    labelCoord: chem2Layout[2].center,
    topics: [
      { id: "c2-c3-t1", name: "মোলারিটি, শতকরা মাত্রা ও পিপিএম", importance: "high" },
      { id: "c2-c3-t2", name: "অ্যাসিড-ক্ষার টাইট্রেশন ও নির্দেশক", importance: "high" },
      { id: "c2-c3-t3", name: "আয়ন-ইলেকট্রন পদ্ধতিতে সমতাকরণ (Redox)", importance: "high" }
    ]
  },
  {
    id: "c2-c4",
    number: 4,
    name: "তড়িৎ রসায়ন",
    englishName: "Electrochemistry",
    codeName: "তড়িৎ রসায়ন",
    description: "ফ্যারাডের সূত্র ও নার্নস্ট সমীকরণ",
    territoryPath: chem2Layout[3].path,
    labelCoord: chem2Layout[3].center,
    topics: [
      { id: "c2-c4-t1", name: "ফ্যারাডের তড়িৎ বিশ্লেষণ সূত্র", importance: "high" },
      { id: "c2-c4-t2", name: "তড়িৎ রাসায়নিক কোষ ও EMF গণনা", importance: "high" },
      { id: "c2-c4-t3", name: "নার্নস্ট সমীকরণ ও ফুয়েল সেল", importance: "high" }
    ]
  },
  {
    id: "c2-c5",
    number: 5,
    name: "অর্থনৈতিক রসায়ন",
    englishName: "Economic Chemistry",
    codeName: "অর্থনৈতিক রসায়ন",
    description: "ইউরিয়া সার, চামড়া ট্যানিং ও সিমেন্ট",
    territoryPath: chem2Layout[4].path,
    labelCoord: chem2Layout[4].center,
    topics: [
      { id: "c2-c5-t1", name: "ইউরিয়া সার প্রস্তুতি", importance: "high" },
      { id: "c2-c5-t2", name: "কাচ, সিরামিক ও সিমেন্ট শিল্প", importance: "medium" }
    ]
  }
];

const math1Layout = generateContiguousLayout(10);
const MATH_1_CHAPTERS: Chapter[] = [
  {
    id: "m1-c1",
    number: 1,
    name: "ম্যাট্রিক্স ও নির্ণায়ক",
    englishName: "Matrix & Determinants",
    codeName: "ম্যাট্রিক্স",
    description: "ইনভার্স ম্যাট্রিক্স ও ক্রেমার নিয়ম",
    territoryPath: math1Layout[0].path,
    labelCoord: math1Layout[0].center,
    topics: [
      { id: "m1-c1-t1", name: "ম্যাট্রিক্সের গুণন ও ইনভার্স", importance: "high" },
      { id: "m1-c1-t2", name: "ক্রেমারের নিয়মে সমাধান", importance: "high" }
    ]
  },
  {
    id: "m1-c2",
    number: 2,
    name: "ভেক্টর",
    englishName: "Vectors",
    codeName: "ভেক্টর",
    description: "ভেক্টরের ডট ও ক্রস গুণন",
    territoryPath: math1Layout[1].path,
    labelCoord: math1Layout[1].center,
    topics: [
      { id: "m1-c2-t1", name: "ভেক্টর বীজগণিত ও গুণন", importance: "high" }
    ]
  },
  {
    id: "m1-c3",
    number: 3,
    name: "সরলরেখা",
    englishName: "Straight Lines",
    codeName: "সরলরেখা",
    description: "ঢাল, সমীকরণ, লম্ব দূরত্ব ও কোণ",
    territoryPath: math1Layout[2].path,
    labelCoord: math1Layout[2].center,
    topics: [
      { id: "m1-c3-t1", name: "সরলরেখার সমীকরণ ও ঢাল", importance: "high" },
      { id: "m1-c3-t2", name: "মধ্যবর্তী কোণ ও লম্ব দূরত্ব", importance: "high" }
    ]
  },
  {
    id: "m1-c4",
    number: 4,
    name: "বৃত্ত",
    englishName: "Circles",
    codeName: "বৃত্ত",
    description: "বৃত্তের সমীকরণ ও স্পর্শক",
    territoryPath: math1Layout[3].path,
    labelCoord: math1Layout[3].center,
    topics: [
      { id: "m1-c4-t1", name: "বৃত্তের সাধারণ সমীকরণ ও অক্ষের খণ্ডিতাংশ", importance: "high" },
      { id: "m1-c4-t2", name: "স্পর্শকের সমীকরণ ও দৈর্ঘ্য", importance: "high" }
    ]
  },
  {
    id: "m1-c5",
    number: 5,
    name: "বিন্যাস ও সমাবেশ",
    englishName: "Permutation & Combination",
    codeName: "বিন্যাস-সমাবেশ",
    description: "nPr ও nCr প্রয়োগ",
    territoryPath: math1Layout[4].path,
    labelCoord: math1Layout[4].center,
    topics: [
      { id: "m1-c5-t1", name: "বিন্যাসের সমস্যা ও শব্দ গঠন", importance: "high" },
      { id: "m1-c5-t2", name: "সমাবেশের সমস্যা ও দল গঠন", importance: "high" }
    ]
  },
  {
    id: "m1-c6",
    number: 6,
    name: "ত্রিকোণমিতিক অনুপাত",
    englishName: "Trigonometric Ratios",
    codeName: "ত্রিকোণমিতি ১",
    description: "কোণ পরিমাপ ও মৌলিক অভেদ",
    territoryPath: math1Layout[5].path,
    labelCoord: math1Layout[5].center,
    topics: [
      { id: "m1-c6-t1", name: "ত্রিকোণমিতিক মৌলিক সূত্রাবলী", importance: "medium" }
    ]
  },
  {
    id: "m1-c7",
    number: 7,
    name: "সংযুক্ত কোণের ত্রিকোণমিতি",
    englishName: "Associated Angles",
    codeName: "ত্রিকোণমিতি ২",
    description: "যৌগিক কোণ ও গুণিতক কোণ",
    territoryPath: math1Layout[6].path,
    labelCoord: math1Layout[6].center,
    topics: [
      { id: "m1-c7-t1", name: "যৌগিক ও গুণিতক কোণের অনুপাত", importance: "high" },
      { id: "m1-c7-t2", name: "ত্রিভুজের গুণাবলী ও প্রমাণ", importance: "high" }
    ]
  },
  {
    id: "m1-c8",
    number: 8,
    name: "ফাংশন ও লেখচিত্র",
    englishName: "Functions",
    codeName: "ফাংশন",
    description: "ডোমেন, রেঞ্জ ও বিপরীত ফাংশন",
    territoryPath: math1Layout[7].path,
    labelCoord: math1Layout[7].center,
    topics: [
      { id: "m1-c8-t1", name: "ফাংশনের ডোমেন ও রেঞ্জ নির্ণয়", importance: "high" }
    ]
  },
  {
    id: "m1-c9",
    number: 9,
    name: "অন্তরীকরণ",
    englishName: "Differentiation",
    codeName: "অন্তরীকরণ",
    description: "লিমিট, চেইন রুল ও গুরুমান-লঘুমান",
    territoryPath: math1Layout[8].path,
    labelCoord: math1Layout[8].center,
    topics: [
      { id: "m1-c9-t1", name: "লিমিট ও মূল নিয়মে অন্তরজ", importance: "high" },
      { id: "m1-c9-t2", name: "পর্যায়ক্রমিক অন্তরীকরণ ও স্পর্শক", importance: "high" },
      { id: "m1-c9-t3", name: "গুরুমান ও লঘুমান (Maxima/Minima)", importance: "high" }
    ]
  },
  {
    id: "m1-c10",
    number: 10,
    name: "যোগজীকরণ",
    englishName: "Integration",
    codeName: "যোগজীকরণ",
    description: "প্রতিস্থাপন, আংশিক ভগ্নাংশ ও ক্ষেত্রফল",
    territoryPath: math1Layout[9].path,
    labelCoord: math1Layout[9].center,
    topics: [
      { id: "m1-c10-t1", name: "খণ্ডশ সমাকলন (By Parts)", importance: "high" },
      { id: "m1-c10-t2", name: "নির্দিষ্ট যোগজ ও আবদ্ধ ক্ষেত্রফল", importance: "high" }
    ]
  }
];

const math2Layout = generateContiguousLayout(10);
const MATH_2_CHAPTERS: Chapter[] = [
  {
    id: "m2-c1",
    number: 1,
    name: "বাস্তব সংখ্যা ও অসমতা",
    englishName: "Real Numbers",
    codeName: "বাস্তব সংখ্যা",
    description: "পরমমান ও অসমতার সমাধান",
    territoryPath: math2Layout[0].path,
    labelCoord: math2Layout[0].center,
    topics: [
      { id: "m2-c1-t1", name: "অসমতার সমাধান ও সংখ্যারেখা", importance: "high" }
    ]
  },
  {
    id: "m2-c2",
    number: 2,
    name: "যোগাশ্রয়ী প্রোগ্রাম",
    englishName: "Linear Programming",
    codeName: "যোগাশ্রয়ী",
    description: "সীমাবদ্ধতা ও চরম মান নির্ণয়",
    territoryPath: math2Layout[1].path,
    labelCoord: math2Layout[1].center,
    topics: [
      { id: "m2-c2-t1", name: "লেখচিত্রের সাহায্যে সর্বোচ্চকরণ", importance: "high" }
    ]
  },
  {
    id: "m2-c3",
    number: 3,
    name: "জটিল সংখ্যা",
    englishName: "Complex Numbers",
    codeName: "জটিল সংখ্যা",
    description: "মডুলাস, আর্গুমেন্ট ও এককের কাল্পনিক ঘনমূল",
    territoryPath: math2Layout[2].path,
    labelCoord: math2Layout[2].center,
    topics: [
      { id: "m2-c3-t1", name: "মডুলাস, আর্গুমেন্ট ও পোলার আকার", importance: "high" },
      { id: "m2-c3-t2", name: "এককের ঘনমূল (ω) এর ধর্মাবলী", importance: "high" }
    ]
  },
  {
    id: "m2-c4",
    number: 4,
    name: "বহুপদী ও বহুপদী সমীকরণ",
    englishName: "Polynomials",
    codeName: "বহুপদী",
    description: "মূল ও সহগের সম্পর্ক, সমীকরণ গঠন",
    territoryPath: math2Layout[3].path,
    labelCoord: math2Layout[3].center,
    topics: [
      { id: "m2-c4-t1", name: "দ্বিঘাত ও ত্রিঘাত সমীকরণের মূলের সম্পর্ক", importance: "high" },
      { id: "m2-c4-t2", name: "সাধারণ মূল থাকার শর্ত", importance: "high" }
    ]
  },
  {
    id: "m2-c5",
    number: 5,
    name: "দ্বিপদী বিস্তার",
    englishName: "Binomial Expansion",
    codeName: "দ্বিপদী",
    description: "সাধারণ পদ ও মধ্যপদ নির্ণয়",
    territoryPath: math2Layout[4].path,
    labelCoord: math2Layout[4].center,
    topics: [
      { id: "m2-c5-t1", name: "দ্বিপদী বিস্তৃতির সাধারণ পদ ও x-বর্জিত পদ", importance: "high" }
    ]
  },
  {
    id: "m2-c6",
    number: 6,
    name: "কণিক",
    englishName: "Conics",
    codeName: "কণিক",
    description: "পরাবৃত্ত, উপবৃত্ত ও অধিবৃত্ত",
    territoryPath: math2Layout[5].path,
    labelCoord: math2Layout[5].center,
    topics: [
      { id: "m2-c6-t1", name: "পরাবৃত্তের সমীকরণ ও বৈশিষ্ট্য", importance: "high" },
      { id: "m2-c6-t2", name: "উপবৃত্তের উপকেন্দ্র ও উৎকেন্দ্রিকতা (e)", importance: "high" },
      { id: "m2-c6-t3", name: "অধিবৃত্তের সমীকরণ ও অসীমতট", importance: "high" }
    ]
  },
  {
    id: "m2-c7",
    number: 7,
    name: "বিপরীত ত্রিকোণমিতিক ফাংশন",
    englishName: "Inverse Trigonometry",
    codeName: "বিপরীত ত্রিকোণমিতি",
    description: "বিপরীত বৃত্তীয় ফাংশন ও সমীকরণ সমাধান",
    territoryPath: math2Layout[6].path,
    labelCoord: math2Layout[6].center,
    topics: [
      { id: "m2-c7-t1", name: "বিপরীত ত্রিকোণমিতিক সূত্রের প্রমাণ", importance: "high" },
      { id: "m2-c7-t2", name: "ত্রিকোণমিতিক সমীকরণের সাধারণ সমাধান", importance: "high" }
    ]
  },
  {
    id: "m2-c8",
    number: 8,
    name: "স্থিতিবিদ্যা",
    englishName: "Statics",
    codeName: "স্থিতিবিদ্যা",
    description: "বলের লব্ধি ও লামির উপপাদ্য",
    territoryPath: math2Layout[7].path,
    labelCoord: math2Layout[7].center,
    topics: [
      { id: "m2-c8-t1", name: "লামির উপপাদ্য ও বলের ত্রিভুজ সূত্র", importance: "high" },
      { id: "m2-c8-t2", name: "সমান্তরাল বল ও যুগল", importance: "high" }
    ]
  },
  {
    id: "m2-c9",
    number: 9,
    name: "সমতলে বস্তুকণার গতি",
    englishName: "Dynamics (Math)",
    codeName: "কণার গতি",
    description: "সরলরেখায় গতি ও প্রক্ষেপক",
    territoryPath: math2Layout[8].path,
    labelCoord: math2Layout[8].center,
    topics: [
      { id: "m2-c9-t1", name: "নিক্ষেপণ গতি ও পাল্লা সংক্রান্ত সমস্যা", importance: "high" }
    ]
  },
  {
    id: "m2-c10",
    number: 10,
    name: "বিস্তার পরিমাপ ও সম্ভাবনা",
    englishName: "Probability",
    codeName: "সম্ভাবনা",
    description: "গড় ব্যবধান, পরিমিত ব্যবধান ও সম্ভাবনা",
    territoryPath: math2Layout[9].path,
    labelCoord: math2Layout[9].center,
    topics: [
      { id: "m2-c10-t1", name: "ভেদাঙ্ক ও পরিমিত ব্যবধান", importance: "high" },
      { id: "m2-c10-t2", name: "সম্ভাবনার যোগ ও গুণন সূত্র", importance: "high" }
    ]
  }
];

const ictLayout = generateContiguousLayout(6);
const ICT_CHAPTERS: Chapter[] = [
  {
    id: "ict-c1",
    number: 1,
    name: "বিশ্ব ও বাংলাদেশ প্রেক্ষিত",
    englishName: "Global Perspective",
    codeName: "বিশ্ব প্রেক্ষিত",
    description: "ভিআর, এআই, রোবোটিক্স ও ক্রায়োসার্জারি",
    territoryPath: ictLayout[0].path,
    labelCoord: ictLayout[0].center,
    topics: [
      { id: "ict-c1-t1", name: "ভার্চুয়াল রিয়েলিটি ও কৃত্রিম বুদ্ধিমত্তা", importance: "high" },
      { id: "ict-c1-t2", name: "রোবোটিক্স ও বায়োমেট্রিক্স", importance: "high" }
    ]
  },
  {
    id: "ict-c2",
    number: 2,
    name: "কমিউনিকেশন সিস্টেম ও নেটওয়ার্কিং",
    englishName: "Networking",
    codeName: "নেটওয়ার্কিং",
    description: "ডেটা ট্রান্সমিশন, ফাইবার ও টপোলজি",
    territoryPath: ictLayout[1].path,
    labelCoord: ictLayout[1].center,
    topics: [
      { id: "ict-c2-t1", name: "ব্যান্ডউইথ ও অপটিক্যাল ফাইবার", importance: "high" },
      { id: "ict-c2-t2", name: "নেটওয়ার্ক টপোলজি (Star/Mesh/Bus)", importance: "high" }
    ]
  },
  {
    id: "ict-c3",
    number: 3,
    name: "সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস",
    englishName: "Number Systems",
    codeName: "ডিজিটাল ডিভাইস",
    description: "বাইনারি রূপান্তর, ২ এর পরিপূরক ও লজিক গেট",
    territoryPath: ictLayout[2].path,
    labelCoord: ictLayout[2].center,
    topics: [
      { id: "ict-c3-t1", name: "সংখ্যা পদ্ধতি রূপান্তর ও ২ এর পরিপূরক", importance: "high" },
      { id: "ict-c3-t2", name: "লজিক গেট, ডিমরগান ও অ্যাডার", importance: "high" }
    ]
  },
  {
    id: "ict-c4",
    number: 4,
    name: "ওয়েব ডিজাইন ও HTML",
    englishName: "HTML Web Design",
    codeName: "HTML",
    description: "HTML ট্যাগ, টেবিল, লিংক ও ছবি",
    territoryPath: ictLayout[3].path,
    labelCoord: ictLayout[3].center,
    topics: [
      { id: "ict-c4-t1", name: "HTML মৌলিক ট্যাগ ও টেবিল তৈরি", importance: "high" },
      { id: "ict-c4-t2", name: "হাইপারলিংক ও ইমেজ সংযোগ", importance: "high" }
    ]
  },
  {
    id: "ict-c5",
    number: 5,
    name: "প্রোগ্রামিং ভাষা (C Language)",
    englishName: "C Programming",
    codeName: "প্রোগ্রামিং",
    description: "অ্যালগরিদম, ফ্লোচার্ট, লুপ ও কন্ডিশন",
    territoryPath: ictLayout[4].path,
    labelCoord: ictLayout[4].center,
    topics: [
      { id: "ict-c5-t1", name: "অ্যালগরিদম ও ফ্লোচার্ট প্রণয়ন", importance: "high" },
      { id: "ict-c5-t2", name: "কন্ডিশনাল স্টেটমেন্ট ও লুপ (for/while)", importance: "high" }
    ]
  },
  {
    id: "ict-c6",
    number: 6,
    name: "ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)",
    englishName: "Database (DBMS)",
    codeName: "ডেটাবেজ",
    description: "এসকিউএল কোয়েরি ও রিলেশনশিপ",
    territoryPath: ictLayout[5].path,
    labelCoord: ictLayout[5].center,
    topics: [
      { id: "ict-c6-t1", name: "প্রাইমারি কি ও ডেটাবেজ রিলেশন", importance: "high" },
      { id: "ict-c6-t2", name: "SQL কোয়েরি (SELECT/INSERT/UPDATE)", importance: "high" }
    ]
  }
];

export const HSC_SUBJECTS: Subject[] = [
  {
    id: "bio-1",
    name: "জীববিজ্ঞান ১ম পত্র",
    shortName: "জীববিজ্ঞান ১ম",
    code: "১৭৮",
    icon: "solar:leaf-bold-duotone",
    chapters: BIO_1_CHAPTERS,
  },
  {
    id: "bio-2",
    name: "জীববিজ্ঞান ২য় পত্র",
    shortName: "জীববিজ্ঞান ২য়",
    code: "১৭৯",
    icon: "solar:bone-bold-duotone",
    chapters: BIO_2_CHAPTERS,
  },
  {
    id: "phy-1",
    name: "পদার্থবিজ্ঞান ১ম পত্র",
    shortName: "পদার্থ ১ম",
    code: "১৭৪",
    icon: "solar:atom-bold-duotone",
    chapters: PHY_1_CHAPTERS,
  },
  {
    id: "phy-2",
    name: "পদার্থবিজ্ঞান ২য় পত্র",
    shortName: "পদার্থ ২য়",
    code: "১৭৫",
    icon: "solar:compass-bold-duotone",
    chapters: PHY_2_CHAPTERS,
  },
  {
    id: "chem-1",
    name: "রসায়ন ১ম পত্র",
    shortName: "রসায়ন ১ম",
    code: "১৭৬",
    icon: "solar:test-tube-minimalistic-bold-duotone",
    chapters: CHEM_1_CHAPTERS,
  },
  {
    id: "chem-2",
    name: "রসায়ন ২য় পত্র",
    shortName: "রসায়ন ২য়",
    code: "১৭৭",
    icon: "solar:benzene-ring-bold-duotone",
    chapters: CHEM_2_CHAPTERS,
  },
  {
    id: "math-1",
    name: "উচ্চতর গণিত ১ম পত্র",
    shortName: "গণিত ১ম",
    code: "২৬৫",
    icon: "solar:calculator-minimalistic-bold-duotone",
    chapters: MATH_1_CHAPTERS,
  },
  {
    id: "math-2",
    name: "উচ্চতর গণিত ২য় পত্র",
    shortName: "গণিত ২য়",
    code: "২৬৬",
    icon: "solar:ruler-pen-bold-duotone",
    chapters: MATH_2_CHAPTERS,
  },
  {
    id: "ict",
    name: "তথ্য ও যোগাযোগ প্রযুক্তি",
    shortName: "আইসিটি",
    code: "২৭৫",
    icon: "solar:laptop-minimalistic-bold-duotone",
    chapters: ICT_CHAPTERS,
  }
];
