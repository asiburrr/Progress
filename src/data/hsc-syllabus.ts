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
    description: "কোষ প্রাচীর, প্লাজমামেমব্রেন, সাইটোপ্লাজমীয় অঙ্গাণু, ডিএনএ, আরএনএ ও প্রোটিন সংশ্লেষণ",
    territoryPath: bio1Layout[0].path,
    labelCoord: bio1Layout[0].center,
    topics: [
      { id: "b1-c1-t1", name: "কোষপ্রাচীর ও প্লাজমামেমব্রেন (ফ্লুইড মোজাইক মডেল)", importance: "high" },
      { id: "b1-c1-t2", name: "মাইটোকন্ড্রিয়ার সূক্ষ্ম গঠন ও কার্যাবলি", importance: "high" },
      { id: "b1-c1-t3", name: "প্লাস্টিড ও ক্লোরোপ্লাস্টের সূক্ষ্ম গঠন", importance: "high" },
      { id: "b1-c1-t4", name: "রাইবোসোম, গলগি বডি ও এন্ডোপ্লাজমিক রেটিকুলাম", importance: "medium" },
      { id: "b1-c1-t5", name: "লাইসোজোম, সেন্ট্রোসোম ও সাইটোস্কেলেটন", importance: "medium" },
      { id: "b1-c1-t6", name: "নিউক্লিয়াস ও ক্রোমোজোমের ভৌত-রাসায়নিক গঠন", importance: "high" },
      { id: "b1-c1-t7", name: "ডিএনএ (DNA) এর ভৌত গঠন (ওয়াটসন-ক্রিক মডেল)", importance: "high" },
      { id: "b1-c1-t8", name: "ডিএনএ অনুলিপন (DNA Replication - অর্ধ-রক্ষণশীল পদ্ধতি)", importance: "high" },
      { id: "b1-c1-t9", name: "আরএনএ (RNA) এর প্রকারভেদ ও গঠন", importance: "high" },
      { id: "b1-c1-t10", name: "ট্রান্সক্রিপশন প্রক্রিয়া ও জেনেটিক কোড", importance: "high" },
      { id: "b1-c1-t11", name: "ট্রান্সলেশন প্রক্রিয়া (প্রোটিন সংশ্লেষণ)", importance: "high" }
    ]
  },
  {
    id: "b1-c2",
    number: 2,
    name: "কোষ বিভাজন",
    englishName: "Cell Division",
    codeName: "কোষ বিভাজন",
    description: "কোষ চক্র, মাইটোসিস, মায়োসিস ও ক্রসিং ওভার",
    territoryPath: bio1Layout[1].path,
    labelCoord: bio1Layout[1].center,
    topics: [
      { id: "b1-c2-t1", name: "কোষ চক্র (Cell Cycle) ও অ্যামাইটোসিস", importance: "medium" },
      { id: "b1-c2-t2", name: "মাইটোসিসের পর্যায়সমূহ (প্রফেজ, মেটাফেজ, অ্যানাফেজ, টেলোফেজ)", importance: "high" },
      { id: "b1-c2-t3", name: "সাইটোকাইনেসিস ও মাইটোসিসের তাৎপর্য", importance: "high" },
      { id: "b1-c2-t4", name: "অনিয়ন্ত্রিত মাইটোসিস (টিউমার ও ক্যান্সার সৃষ্টি)", importance: "high" },
      { id: "b1-c2-t5", name: "মায়োসিস-১ এর প্রফেজ-১ উপপর্যায়সমূহ (লেপ্টোটিন, জাইগোটিন, প্যাকাইটিন, ডিপ্লোটিন, ডায়াকাইনেসিস)", importance: "high" },
      { id: "b1-c2-t6", name: "ক্রসিং ওভার (Crossing Over) কৌশল ও তাৎপর্য", importance: "high" },
      { id: "b1-c2-t7", name: "মায়োসিস-২ ও মায়োসিসের গুরুত্ব", importance: "high" }
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
      { id: "b1-c3-t1", name: "কার্বোহাইড্রেট শ্রেণিবিভাগ (মনোস্যাকারাইড ও ডাইস্যাকারাইড)", importance: "high" },
      { id: "b1-c3-t2", name: "পলিস্যাকারাইড (স্টার্চ, সেলুলোজ ও গ্লাইকোজেন)", importance: "high" },
      { id: "b1-c3-t3", name: "অ্যামিনো অ্যাসিডের গঠন, শ্রেণিবিভাগ ও পেপটাইড বন্ধন", importance: "high" },
      { id: "b1-c3-t4", name: "প্রোটিনের শ্রেণিবিভাগ ও জৈবিক ভূমিকা", importance: "high" },
      { id: "b1-c3-t5", name: "লিপিডের শ্রেণিবিভাগ (সরল, যৌগিক ও উদ্ভূত লিপিড)", importance: "high" },
      { id: "b1-c3-t6", name: "এনজাইমের বৈশিষ্ট্য ও তালা-চাবি (Lock & Key) মতবাদ", importance: "high" },
      { id: "b1-c3-t7", name: "কো-এনজাইম, প্রস্থেটিক গ্রুপ ও এনজাইম ক্রিয়ার কৌশল", importance: "high" }
    ]
  },
  {
    id: "b1-c4",
    number: 4,
    name: "অণুজীব",
    englishName: "Microorganisms",
    codeName: "অণুজীব",
    description: "ভাইরাস, ব্যাকটেরিয়া ও ম্যালেরিয়া পরজীবী",
    territoryPath: bio1Layout[3].path,
    labelCoord: bio1Layout[3].center,
    topics: [
      { id: "b1-c4-t1", name: "ভাইরাসের বৈশিষ্ট্য, গঠন ও T2 ব্যাকটেরিওফায", importance: "high" },
      { id: "b1-c4-t2", name: "ভাইরাসের বংশবৃদ্ধি (লাইটিক ও লাইসোজেনিক চক্র)", importance: "high" },
      { id: "b1-c4-t3", name: "উদ্ভিদ ও মানুষের ভাইরাসঘটিত রোগ (TMV, ডেঙ্গু, হেপাটাইটিস, করোনা)", importance: "high" },
      { id: "b1-c4-t4", name: "ব্যাকটেরিয়ার গঠন (ক্যাপসুল, ফ্ল্যাজেলা, প্লাজমিড)", importance: "high" },
      { id: "b1-c4-t5", name: "গ্রাম পজিটিভ ও গ্রাম নেগেটিভ ব্যাকটেরিয়া", importance: "high" },
      { id: "b1-c4-t6", name: "ব্যাকটেরিয়ার জনন ও অর্থনৈতিক গুরুত্ব", importance: "medium" },
      { id: "b1-c4-t7", name: "ম্যালেরিয়ার পরজীবী (Plasmodium) জীবনচক্র - মানবদেহ পর্যায় (হেপাটিক ও এরিথ্রোসাইটিক সাইজোগনি)", importance: "high" },
      { id: "b1-c4-t8", name: "ম্যালেরিয়া পরজীবীর মশকীর দেহে জীবনচক্র (গ্যামিটোগনি ও স্পোরোগনি)", importance: "high" },
      { id: "b1-c4-t9", name: "ম্যালেরিয়া রোগের লক্ষণ, প্রতিকার ও নিয়ন্ত্রণ", importance: "medium" }
    ]
  },
  {
    id: "b1-c5",
    number: 5,
    name: "শৈবাল ও ছত্রাক",
    englishName: "Algae & Fungi",
    codeName: "শৈবাল-ছত্রাক",
    description: "ইউলোথ্রিক্স, অ্যাগারিকাস ও লাইকেন",
    territoryPath: bio1Layout[4].path,
    labelCoord: bio1Layout[4].center,
    topics: [
      { id: "b1-c5-t1", name: "শৈবালের সাধারণ বৈশিষ্ট্য ও গঠন", importance: "medium" },
      { id: "b1-c5-t2", name: "ইউলোথ্রিক্স (Ulothrix) এর দৈহিক গঠন ও জনন", importance: "high" },
      { id: "b1-c5-t3", name: "শৈবালের অর্থনৈতিক গুরুত্ব ও অ্যালগাল ব্লুম", importance: "medium" },
      { id: "b1-c5-t4", name: "ছত্রাকের সাধারণ বৈশিষ্ট্য ও হাইফার গঠন", importance: "medium" },
      { id: "b1-c5-t5", name: "অ্যাগারিকাস (Agaricus) ফ্রুটবডির গঠন ও জনন", importance: "high" },
      { id: "b1-c5-t6", name: "মাশরুম চাষ প্রণালী ও বিষাক্ত মাশরুম শনাক্তকরণ", importance: "medium" },
      { id: "b1-c5-t7", name: "লাইকেন (Lichen) এর গঠন, মিথোজীবিতা ও গুরুত্ব", importance: "high" },
      { id: "b1-c5-t8", name: "আলুর বিলম্বিত ধ্বসা রোগ (Late Blight of Potato)", importance: "high" }
    ]
  },
  {
    id: "b1-c6",
    number: 6,
    name: "ব্রায়োফাইটা ও টেরিডোফাইটা",
    englishName: "Bryophyta & Pteridophyta",
    codeName: "ব্রায়ো-টেরিডো",
    description: "রিকসিয়া, টেরিস ও ফার্ন প্রথ্যাল্যাস",
    territoryPath: bio1Layout[5].path,
    labelCoord: bio1Layout[5].center,
    topics: [
      { id: "b1-c6-t1", name: "ব্রায়োফাইটার বৈশিষ্ট্য ও উভচর প্রকৃতি", importance: "medium" },
      { id: "b1-c6-t2", name: "রিকসিয়া (Riccia) থ্যালাসের অন্তর্গঠন ও জনন", importance: "high" },
      { id: "b1-c6-t3", name: "টেরিডোফাইটার বৈশিষ্ট্য ও সংবহন কলা", importance: "medium" },
      { id: "b1-c6-t4", name: "টেরিস (Pteris) এর স্পোরোফাইটিক গঠন ও সোরাস", importance: "high" },
      { id: "b1-c6-t5", name: "ফার্ন প্রথ্যাল্যাস (Prothallus) এর গঠন ও নিষেকের কৌশল", importance: "high" },
      { id: "b1-c6-t6", name: "টেরিসের জনুক্রম (Alternation of Generations)", importance: "high" }
    ]
  },
  {
    id: "b1-c7",
    number: 7,
    name: "নগ্নবীজী ও আবৃতবীজী উদ্ভিদ",
    englishName: "Gymnosperms & Angiosperms",
    codeName: "নগ্ন-আবৃতবীজী",
    description: "সাইকাস, গোত্র পরিচিতি (মালভেসি ও পোয়েসি)",
    territoryPath: bio1Layout[6].path,
    labelCoord: bio1Layout[6].center,
    topics: [
      { id: "b1-c7-t1", name: "নগ্নবীজী উদ্ভিদের বৈশিষ্ট্য ও সাইকাস (Cycas) গঠন", importance: "high" },
      { id: "b1-c7-t2", name: "সাইকাসের কোরালয়েড মূল ও জনন প্রক্রিয়া", importance: "high" },
      { id: "b1-c7-t3", name: "আবৃতবীজী উদ্ভিদের বৈশিষ্ট্য ও অঙ্গসংস্থান", importance: "medium" },
      { id: "b1-c7-t4", name: "পুষ্পমঞ্জরী, পুষ্পের বিভিন্ন স্তবক ও পুষ্প সংকেত", importance: "high" },
      { id: "b1-c7-t5", name: "অমরাবিন্যাস (Placentation) ও এস্টিভেশন (Aestivation)", importance: "high" },
      { id: "b1-c7-t6", name: "মালভেসি (Malvaceae) গোত্রের শনাক্তকারী বৈশিষ্ট্য ও অর্থনৈতিক গুরুত্ব", importance: "high" },
      { id: "b1-c7-t7", name: "পোয়েসি (Poaceae) গোত্রের শনাক্তকারী বৈশিষ্ট্য ও অর্থনৈতিক গুরুত্ব", importance: "high" }
    ]
  },
  {
    id: "b1-c8",
    number: 8,
    name: "টিস্যু ও টিস্যুতন্ত্র",
    englishName: "Tissue & Tissue Systems",
    codeName: "টিস্যুতন্ত্র",
    description: "ভাজক টিস্যু, এপিডার্মাল ও ভাস্কুলার বান্ডল",
    territoryPath: bio1Layout[7].path,
    labelCoord: bio1Layout[7].center,
    topics: [
      { id: "b1-c8-t1", name: "ভাজক টিস্যুর বৈশিষ্ট্য ও অবস্থানিক শ্রেণিবিন্যাস", importance: "high" },
      { id: "b1-c8-t2", name: "স্থায়ী টিস্যুর প্রকারভেদ (জাইলেম ও ফ্লোয়েম)", importance: "high" },
      { id: "b1-c8-t3", name: "এপিডার্মাল টিস্যুতন্ত্র (রোম, ট্রাইকোম ও পত্ররন্ধ্র)", importance: "high" },
      { id: "b1-c8-t4", name: "গ্রাউন্ড টিস্যুতন্ত্র (বহিঃস্টিলীয় ও অন্তঃস্টিলীয় অঞ্চল)", importance: "medium" },
      { id: "b1-c8-t5", name: "ভাস্কুলার বান্ডলের প্রকারভেদ (সংযুক্ত, অরীয়, কেন্দ্রিক)", importance: "high" },
      { id: "b1-c8-t6", name: "একবীজপত্রী উদ্ভিদের মূলের অন্তর্গঠন (প্রস্থচ্ছেদ)", importance: "high" },
      { id: "b1-c8-t7", name: "একবীজপত্রী উদ্ভিদের কাণ্ডের অন্তর্গঠন (প্রস্থচ্ছেদ)", importance: "high" },
      { id: "b1-c8-t8", name: "দ্বিবীজপত্রী উদ্ভিদের মূল ও কাণ্ডের অন্তর্গঠন তুলনা", importance: "high" }
    ]
  },
  {
    id: "b1-c9",
    number: 9,
    name: "উদ্ভিদ শারীরতত্ত্ব",
    englishName: "Plant Physiology",
    codeName: "শারীরতত্ত্ব",
    description: "খনিজ লবণ শোষণ, প্রস্বেদন, সালোকসংশ্লেষণ ও শ্বসন",
    territoryPath: bio1Layout[8].path,
    labelCoord: bio1Layout[8].center,
    topics: [
      { id: "b1-c9-t1", name: "খনিজ লবণ পরিশোষণ (সক্রিয় ও নিষ্ক্রিয় শোষণ মতবাদ)", importance: "high" },
      { id: "b1-c9-t2", name: "প্রস্বেদন প্রকারভেদ ও পত্ররন্ধ্র খোলা-বন্ধের আধুনিক কৌশল", importance: "high" },
      { id: "b1-c9-t3", name: "সালোকসংশ্লেষণ আলোক নির্ভর পর্যায় ও ফটোলাইসিস", importance: "high" },
      { id: "b1-c9-t4", name: "চক্রীয় ও অচক্রীয় ফটোফসফোরাইলেশন", importance: "high" },
      { id: "b1-c9-t5", name: "ক্যালভিন চক্র (C3 গতিপথ) এর ধাপসমূহ", importance: "high" },
      { id: "b1-c9-t6", name: "হ্যাচ ও স্ল্যাক চক্র (C4 গতিপথ) ও CAM উদ্ভিদ", importance: "high" },
      { id: "b1-c9-t7", name: "শ্বসন: গ্লাইকোলাইসিস পর্যায় (EMP pathway)", importance: "high" },
      { id: "b1-c9-t8", name: "অ্যাসিটাইল কো-এ ও ক্রেবস চক্র (TCA Cycle)", importance: "high" },
      { id: "b1-c9-t9", name: "ইলেকট্রন ট্রান্সপোর্ট সিস্টেম (ETS) ও অবাত শ্বসন/ফার্মেন্টেশন", importance: "high" }
    ]
  },
  {
    id: "b1-c10",
    number: 10,
    name: "উদ্ভিদ প্রজনন",
    englishName: "Plant Reproduction",
    codeName: "প্রজনন",
    description: "পুং ও স্ত্রী গ্যামেটোফাইট, পরাগায়ন ও নিষেক",
    territoryPath: bio1Layout[9].path,
    labelCoord: bio1Layout[9].center,
    topics: [
      { id: "b1-c10-t1", name: "পুংগ্যামেটোফাইট (পরাগরেণু) এর উৎপত্তি ও বিকাশ", importance: "high" },
      { id: "b1-c10-t2", name: "স্ত্রীগ্যামেটোফাইট (ভ্রূণথলি) এর উৎপত্তি ও বিকাশ", importance: "high" },
      { id: "b1-c10-t3", name: "পরাগায়ন (স্ব-পরাগায়ন ও পর-পরাগায়ন) এর মাধ্যম", importance: "medium" },
      { id: "b1-c10-t4", name: "নিষেক ও দ্বিনিষেক (Double Fertilization) প্রক্রিয়া", importance: "high" },
      { id: "b1-c10-t5", name: "অপুংজনি (Parthenogenesis) ও পার্থেনোকার্পি", importance: "high" },
      { id: "b1-c10-t6", name: "কৃত্রিম অঙ্গজ প্রজনন (গ্রাফটিং, কাটিং, লেয়ারিং)", importance: "medium" }
    ]
  },
  {
    id: "b1-c11",
    number: 11,
    name: "জীবপ্রযুক্তি",
    englishName: "Biotechnology",
    codeName: "জীবপ্রযুক্তি",
    description: "টিস্যু কালচার, রিকম্বিনেন্ট ডিএনএ ও জিএমও",
    territoryPath: bio1Layout[10].path,
    labelCoord: bio1Layout[10].center,
    topics: [
      { id: "b1-c11-t1", name: "টিস্যু কালচার প্রযুক্তির মূলনীতি ও ধাপসমূহ", importance: "high" },
      { id: "b1-c11-t2", name: "টিস্যু কালচারের প্রয়োগ ও কৃষিতে গুরুত্ব", importance: "high" },
      { id: "b1-c11-t3", name: "রিকম্বিনেন্ট ডিএনএ প্রযুক্তি (জিন ক্লোনিং) এর ধাপসমূহ", importance: "high" },
      { id: "b1-c11-t4", name: "রেস্ট্রিকশন এনজাইম ও প্লাজমিড ভেক্টরের ভূমিকা", importance: "high" },
      { id: "b1-c11-t5", name: "ট্রান্সজেনিক উদ্ভিদ ও জিএমও (GMO/Bt Crops)", importance: "high" },
      { id: "b1-c11-t6", name: "চিকিৎসা ও শিল্পে বায়োটেকনোলজি (ইনসুলিন ও ইন্টারফেরন)", importance: "high" },
      { id: "b1-c11-t7", name: "জিনোম সিকোয়েন্সিং ও ডিএনএ ফিঙ্গারপ্রিন্টিং", importance: "high" }
    ]
  },
  {
    id: "b1-c12",
    number: 12,
    name: "জীবের পরিবেশ, বিস্তার ও সংরক্ষণ",
    englishName: "Ecology & Conservation",
    codeName: "বাস্তুতন্ত্র",
    description: "বাস্তুতন্ত্র, উদ্ভিদ অভিযোজন ও জীববৈচিত্র্য সংরক্ষণ",
    territoryPath: bio1Layout[11].path,
    labelCoord: bio1Layout[11].center,
    topics: [
      { id: "b1-c12-t1", name: "বাস্তুতন্ত্রের উপাদান, খাদ্যশৃঙ্খল ও খাদ্যজাল", importance: "high" },
      { id: "b1-c12-t2", name: "শক্তি প্রবাহ ও বাস্তুসংস্থানিক পিরামিড", importance: "medium" },
      { id: "b1-c12-t3", name: "হাইড্রোফাইট ও জেরোফাইট উদ্ভিদের অঙ্গসংস্থানিক অভিযোজন", importance: "high" },
      { id: "b1-c12-t4", name: "হ্যালোফাইট (ম্যানগ্রোভ উদ্ভিদ) এর শারীরবৃত্তীয় অভিযোজন", importance: "high" },
      { id: "b1-c12-t5", name: "জীববৈচিত্র্য সংরক্ষণ (ইন-সিটু ও এক্স-সিটু সংরক্ষণ)", importance: "high" },
      { id: "b1-c12-t6", name: "রেড ডাটা বুক ও বাংলাদেশের বিলুপ্তপ্রায় উদ্ভিদ", importance: "medium" }
    ]
  }
];

const bio2Layout = generateContiguousLayout(12);
const BIO_2_CHAPTERS: Chapter[] = [
  {
    id: "b2-c1",
    number: 1,
    name: "প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস",
    englishName: "Animal Diversity & Classification",
    codeName: "প্রাণীর বিভিন্নতা",
    description: "শ্রেণিবিন্যাসের ভিত্তি ও নন-কর্ডাটা-কর্ডাটা পর্বসমূহ",
    territoryPath: bio2Layout[0].path,
    labelCoord: bio2Layout[0].center,
    topics: [
      { id: "b2-c1-t1", name: "শ্রেণিবিন্যাসের ভিত্তি (ভ্রূণস্তর, প্রতিসাম্য, সিলোম ও খণ্ডকায়ন)", importance: "high" },
      { id: "b2-c1-t2", name: "নন-কর্ডাটা পর্বসমূহ (Porifera, Cnidaria, Platyhelminthes)", importance: "high" },
      { id: "b2-c1-t3", name: "নন-কর্ডাটা পর্বসমূহ (Nematoda, Annelida, Arthropoda)", importance: "high" },
      { id: "b2-c1-t4", name: "নন-কর্ডাটা পর্বসমূহ (Mollusca ও Echinodermata)", importance: "high" },
      { id: "b2-c1-t5", name: "কর্ডাটা পর্বের বৈশিষ্ট্য ও উপপর্বসমূহ (Urochordata, Cephalochordata, Vertebrata)", importance: "high" },
      { id: "b2-c1-t6", name: "মেরুদণ্ডী প্রাণীদের শ্রেণিবিভাগ (Chondrichthyes, Osteichthyes, Amphibia, Reptilia, Aves, Mammalia)", importance: "high" },
      { id: "b2-c1-t7", name: "দ্বিপদ নামকরণ নীতি ও ICZN নিয়মাবলী", importance: "medium" }
    ]
  },
  {
    id: "b2-c2",
    number: 2,
    name: "প্রাণীর পরিচিতি",
    englishName: "Introduction to Animals",
    codeName: "প্রাণী পরিচিতি",
    description: "হাইড্রা, ঘাসফড়িং ও রুই মাছ",
    territoryPath: bio2Layout[1].path,
    labelCoord: bio2Layout[1].center,
    topics: [
      { id: "b2-c2-t1", name: "হাইড্রা (Hydra) বহিস্ত্বকের কোষসমূহ ও নিডোসাইট", importance: "high" },
      { id: "b2-c2-t2", name: "নেমাটোসিস্টের প্রকারভেদ ও কার্যপদ্ধতি", importance: "high" },
      { id: "b2-c2-t3", name: "হাইড্রার চলন (লুপিং ও সমারসল্টিং) এবং খাদ্য পরিপাক", importance: "high" },
      { id: "b2-c2-t4", name: "হাইড্রার প্রজনন ও মিথোজীবিতা (Symbiosis)", importance: "high" },
      { id: "b2-c2-t5", name: "ঘাসফড়িং (Grasshopper) মুখোপাঙ্গ ও পরিপাকতন্ত্র", importance: "high" },
      { id: "b2-c2-t6", name: "ঘাসফড়িংয়ের ওমাটিডিয়াম ও দর্শন কৌশল (অ্যাপোজিশন ও সুপারপজিশন)", importance: "high" },
      { id: "b2-c2-t7", name: "ঘাসফড়িংয়ের শ্বসনতন্ত্র ও রূপান্তর (Metamorphosis)", importance: "high" },
      { id: "b2-c2-t8", name: "রুই মাছ (Labeo rohita) বাহ্যিক গঠন ও আঁইশের গঠন", importance: "medium" },
      { id: "b2-c2-t9", name: "রুই মাছের রক্ত সংবহনতন্ত্র ও একচক্রীয় হৃৎপিণ্ড", importance: "high" },
      { id: "b2-c2-t10", name: "রুই মাছের ফুলকা ও পটকা (বায়ুথলি) এর কাজ", importance: "high" },
      { id: "b2-c2-t11", name: "রুই মাছের প্রাকৃতিক প্রজনন ও সংরক্ষণ", importance: "medium" }
    ]
  },
  {
    id: "b2-c3",
    number: 3,
    name: "মানব শারীরতত্ত্ব: পরিপাক ও শোষণ",
    englishName: "Digestion & Absorption",
    codeName: "পরিপাক ও শোষণ",
    description: "পৌষ্টিকতন্ত্র, এনজাইম, খাদ্য পরিপাক ও যকৃতের ভূমিকা",
    territoryPath: bio2Layout[2].path,
    labelCoord: bio2Layout[2].center,
    topics: [
      { id: "b2-c3-t1", name: "পৌষ্টিকতন্ত্রের গঠন ও দাঁতের দন্তসংকেত", importance: "medium" },
      { id: "b2-c3-t2", name: "মুখগহ্বরে খাদ্য পরিপাক ও লালারসের ভূমিকা", importance: "high" },
      { id: "b2-c3-t3", name: "পাকস্থলীতে খাদ্য পরিপাক ও গ্যাস্ট্রিক জুস", importance: "high" },
      { id: "b2-c3-t4", name: "ক্ষুদ্রান্ত্রে খাদ্য পরিপাক (অগ্ন্যাশয় রস ও পিত্তরসের ক্রিয়া)", importance: "high" },
      { id: "b2-c3-t5", name: "শর্করা, আমিষ ও চর্বি জাতীয় খাদ্যের শোষণ", importance: "high" },
      { id: "b2-c3-t6", name: "যকৃতের সঞ্চয়ী ও বিপাকীয় ভূমিকা (জৈব রসায়নাগার)", importance: "high" },
      { id: "b2-c3-t7", name: "স্থূলতা (Obesity), কারণ ও বিএমআই (BMI) গণনা", importance: "medium" }
    ]
  },
  {
    id: "b2-c4",
    number: 4,
    name: "মানব শারীরতত্ত্ব: রক্ত ও সংবহন",
    englishName: "Blood & Circulation",
    codeName: "রক্ত ও সংবহন",
    description: "রক্তকণিকা, হৃদপিণ্ড, কার্ডিয়াক চক্র ও রোগ",
    territoryPath: bio2Layout[3].path,
    labelCoord: bio2Layout[3].center,
    topics: [
      { id: "b2-c4-t1", name: "রক্তের উপাদান ও রক্তকণিকা (RBC, WBC, প্লাটিলেট)", importance: "high" },
      { id: "b2-c4-t2", name: "রক্তের গ্রুপ (ABO Group) ও আরএইচ ফ্যাক্টর (Rh Factor)", importance: "high" },
      { id: "b2-c4-t3", name: "রক্ত তঞ্চন (Blood Clotting) কৌশল ও ফ্যাক্টরসমূহ", importance: "high" },
      { id: "b2-c4-t4", name: "মানুষের হৃৎপিণ্ডের অন্তর্গঠন ও কপাটিকাসমূহ", importance: "high" },
      { id: "b2-c4-t5", name: "কার্ডিয়াক চক্র (Cardiac Cycle) ও হৃৎস্পন্দন প্রবাহ", importance: "high" },
      { id: "b2-c4-t6", name: "মায়োজেনিক নিয়ন্ত্রণ ও পেসমেকার (SA Node, AV Node)", importance: "high" },
      { id: "b2-c4-t7", name: "রক্তচাপ ও ব্যারোরিসেপ্টরের ভূমিকা", importance: "high" },
      { id: "b2-c4-t8", name: "হৃদরোগ (অ্যানজাইনা, হার্ট অ্যাটাক, হার্ট ফেইলিউর)", importance: "high" },
      { id: "b2-c4-t9", name: "এনজিওপ্লাস্টি, পেসমেকার স্থাপন ও বাইপাস সার্জারি", importance: "high" }
    ]
  },
  {
    id: "b2-c5",
    number: 5,
    name: "মানব শারীরতত্ত্ব: শ্বাসক্রিয়া ও শ্বসন",
    englishName: "Respiration & Gas Exchange",
    codeName: "শ্বাসক্রিয়া",
    description: "শ্বসনতন্ত্র, গ্যাসীয় পরিবহন ও শ্বসন নিয়ন্ত্রণ",
    territoryPath: bio2Layout[4].path,
    labelCoord: bio2Layout[4].center,
    topics: [
      { id: "b2-c5-t1", name: "মানুষের শ্বসনতন্ত্রের গঠন ও অ্যালভিওলাসের সূক্ষ্ম গঠন", importance: "high" },
      { id: "b2-c5-t2", name: "প্রশ্বাস ও নিঃশ্বাস মেকানিজম (ফুসফুসের আয়তন পরিবর্তন)", importance: "high" },
      { id: "b2-c5-t3", name: "রক্তে অক্সিজেন পরিবহন (ভৌত দ্রবণ ও অক্সিহিমোগ্লোবিন)", importance: "high" },
      { id: "b2-c5-t4", name: "রক্তে কার্বন ডাই-অক্সাইড পরিবহন (বাইকার্বোনেট ও কার্বামিনো যৌগ)", importance: "high" },
      { id: "b2-c5-t5", name: "ক্লোরাইড শিফট (হ্যামবার্গার প্রক্রিয়া)", importance: "high" },
      { id: "b2-c5-t6", name: "শ্বসন নিয়ন্ত্রণ (স্নায়বিক ও রাসায়নিক নিয়ন্ত্রণ)", importance: "high" },
      { id: "b2-c5-t7", name: "ধূমপানজনিত শ্বসন রোগ (ব্রঙ্কাইটিস ও এমফাইসেমা)", importance: "medium" }
    ]
  },
  {
    id: "b2-c6",
    number: 6,
    name: "মানব শারীরতত্ত্ব: বর্জ্য ও নিষ্কাশন",
    englishName: "Excretion & Osmoregulation",
    codeName: "বর্জ্য ও নিষ্কাশন",
    description: "বৃক্কের গঠন, নেফ্রন, মূত্র তৈরি ও ডায়ালাইসিস",
    territoryPath: bio2Layout[5].path,
    labelCoord: bio2Layout[5].center,
    topics: [
      { id: "b2-c6-t1", name: "রেচনতন্ত্র ও বৃক্কের লম্বচ্ছেদ অন্তর্গঠন", importance: "high" },
      { id: "b2-c6-t2", name: "নেফ্রনের সূক্ষ্ম গঠন (ম্যালপিজিয়ান বডি ও রেনাল টিউবিউল)", importance: "high" },
      { id: "b2-c6-t3", name: "মূত্র সৃষ্টির পর্যায়সমূহ (অতিপরিস্রাবণ, পুনঃশোষণ ও ক্ষরণ)", importance: "high" },
      { id: "b2-c6-t4", name: "অস্মোরেগুলেশন ও হরমোনের ভূমিকা (ADH ও অ্যালডোস্টেরন)", importance: "high" },
      { id: "b2-c6-t5", name: "বৃক্কে পাথর ও কিডনি ফেইলিউর লক্ষণ", importance: "medium" },
      { id: "b2-c6-t6", name: "ডায়ালাইসিস (হিমোডায়ালাইসিস ও পেরিটোনিয়াল ডায়ালাইসিস)", importance: "high" },
      { id: "b2-c6-t7", name: "বৃক্ক প্রতিস্থাপন (Kidney Transplant)", importance: "medium" }
    ]
  },
  {
    id: "b2-c7",
    number: 7,
    name: "মানব শারীরতত্ত্ব: চলন ও অঙ্গচালনা",
    englishName: "Locomotion & Bone Mechanics",
    codeName: "চলন ও অঙ্গচালনা",
    description: "কঙ্কালতন্ত্র, অস্থি, পেশি ও পেশি সংকোচন",
    territoryPath: bio2Layout[6].path,
    labelCoord: bio2Layout[6].center,
    topics: [
      { id: "b2-c7-t1", name: "অক্ষীয় কঙ্কাল (করোটিকা, মেরুদণ্ড ও বক্ষপিঞ্জরের অস্থি)", importance: "high" },
      { id: "b2-c7-t2", name: "উপাঙ্গীয় কঙ্কাল (বক্ষ অস্থিচক্র, শ্রোণিচক্র, হাত ও পায়ের অস্থি)", importance: "high" },
      { id: "b2-c7-t3", name: "অস্থির সূক্ষ্ম গঠন (হ্যাভারশিয়ান তন্ত্র) ও তরুণাস্থি", importance: "high" },
      { id: "b2-c7-t4", name: "সাইনোভিয়াল অস্থিসন্ধির গঠন ও প্রকারভেদ", importance: "high" },
      { id: "b2-c7-t5", name: "পেশি টিস্যুর প্রকারভেদ ও রৈখিক পেশির গঠন", importance: "high" },
      { id: "b2-c7-t6", name: "পেশি সংকোচন মেকানিজম (স্লাইডিং ফিলামেন্ট তত্ত্ব)", importance: "high" },
      { id: "b2-c7-t7", name: "মানবদেহে লিভারের প্রকারভেদ ও ক্রিয়াকলাপ", importance: "medium" },
      { id: "b2-c7-t8", name: "হাড় ভাঙা ও প্রাথমিক চিকিৎসা", importance: "medium" }
    ]
  },
  {
    id: "b2-c8",
    number: 8,
    name: "মানব শারীরতত্ত্ব: সমন্বয় ও নিয়ন্ত্রণ",
    englishName: "Coordination & Control",
    codeName: "সমন্বয় ও নিয়ন্ত্রণ",
    description: "মস্তিষ্ক, স্নায়ুতন্ত্র, সংবেদী অঙ্গ ও হরমোন",
    territoryPath: bio2Layout[7].path,
    labelCoord: bio2Layout[7].center,
    topics: [
      { id: "b2-c8-t1", name: "মস্তিষ্কের বিভিন্ন অংশ (অগ্র, মধ্য ও পশ্চাৎ মস্তিষ্ক) ও কার্যাবলি", importance: "high" },
      { id: "b2-c8-t2", name: "করোটিক স্নায়ুসমূহ (১২ জোড়া) ও কাজ", importance: "high" },
      { id: "b2-c8-t3", name: "প্রতিবর্ত ক্রিয়া (Reflex Action) ও প্রতিবর্ত চাপ", importance: "high" },
      { id: "b2-c8-t4", name: "চোখের লম্বচ্ছেদের গঠন ও স্তরসমূহ", importance: "high" },
      { id: "b2-c8-t5", name: "চোখের উপযোজন (Accommodation) ও দৃষ্টি ত্রুটি", importance: "high" },
      { id: "b2-c8-t6", name: "কানের গঠন, শ্রবণ কৌশল ও শারীরিক ভারসাম্য রক্ষা", importance: "high" },
      { id: "b2-c8-t7", name: "অন্তঃক্ষরা গ্রন্থিসমূহ ও হরমোন (পিটুইটারি, থাইরয়েড, আইলেটস অব ল্যাঙ্গারহ্যান্স, অ্যাড্রেনাল)", importance: "high" }
    ]
  },
  {
    id: "b2-c9",
    number: 9,
    name: "মানব জীবনের ধারাবাহিকতা",
    englishName: "Human Reproduction & Development",
    codeName: "প্রজনন ও ধারাবাহিকতা",
    description: "প্রজননতন্ত্র, গ্যামেটোজেনেসিস, ভ্রূণ বিকাশ ও রোগ",
    territoryPath: bio2Layout[8].path,
    labelCoord: bio2Layout[8].center,
    topics: [
      { id: "b2-c9-t1", name: "পুরুষ প্রজননতন্ত্রের গঠন ও শুক্রাণুর সূক্ষ্ম গঠন", importance: "high" },
      { id: "b2-c9-t2", name: "স্ত্রী প্রজননতন্ত্রের গঠন ও ডিম্বাণুর সূক্ষ্ম গঠন", importance: "high" },
      { id: "b2-c9-t3", name: "গ্যামেটোজেনেসিস (স্পার্মাটোজেনেসিস ও ওওজেনেসিস)", importance: "high" },
      { id: "b2-c9-t4", name: "ঋতুচক্র (Menstrual Cycle) ও হরমোনাল নিয়ন্ত্রণ", importance: "high" },
      { id: "b2-c9-t5", name: "নিষেক ও ব্লাস্টোসিস্ট রূপান্তর", importance: "high" },
      { id: "b2-c9-t6", name: "ভ্রূণের পরিস্ফুটন, জার্ম লেয়ার ও অমরা (Placenta)", importance: "high" },
      { id: "b2-c9-t7", name: "টেস্টটিউব বেবি ও বন্ধ্যাত্ব প্রতিকার", importance: "medium" },
      { id: "b2-c9-t8", name: "যৌনবাহিত রোগ (সিফিলিস, গনোরিয়া ও এইডস)", importance: "medium" }
    ]
  },
  {
    id: "b2-c10",
    number: 10,
    name: "মানবদেহের প্রতিরক্ষা",
    englishName: "Human Immunity",
    codeName: "দেহের প্রতিরক্ষা",
    description: "অনাক্রম্যতা স্তর, ফ্যাগোসাইটোসিস, অ্যান্টিবডি ও টিকা",
    territoryPath: bio2Layout[9].path,
    labelCoord: bio2Layout[9].center,
    topics: [
      { id: "b2-c10-t1", name: "প্রতিরক্ষার স্তরসমূহ (১ম, ২য় ও ৩য় প্রতিরক্ষা স্তর)", importance: "high" },
      { id: "b2-c10-t2", name: "জন্মগত ও অর্জিত প্রতিরক্ষা ব্যবস্থা", importance: "high" },
      { id: "b2-c10-t3", name: "ফ্যাগোসাইটোসিস প্রক্রিয়া ও প্রদাহ সাড়া", importance: "high" },
      { id: "b2-c10-t4", name: "অ্যান্টিবডির সূক্ষ্ম গঠন (IgG, IgA, IgM, IgE, IgD)", importance: "high" },
      { id: "b2-c10-t5", name: "অ্যান্টিজেন-অ্যান্টিবডি মিথস্ক্রিয়া", importance: "high" },
      { id: "b2-c10-t6", name: "বি ও টি লিম্ফোসাইটের ভূমিকা ও ইমিউন স্মৃতি", importance: "high" },
      { id: "b2-c10-t7", name: "টিকা/ভ্যাকসিনের প্রকারভেদ ও টিকাদান কর্মসূচি", importance: "high" }
    ]
  },
  {
    id: "b2-c11",
    number: 11,
    name: "জিনতত্ত্ব ও বিবর্তন",
    englishName: "Genetics & Evolution",
    codeName: "জিনতত্ত্ব-বিবর্তন",
    description: "মেন্ডেলের সূত্র, সেক্স লিঙ্কড ডিজঅর্ডার ও বিবর্তন",
    territoryPath: bio2Layout[10].path,
    labelCoord: bio2Layout[10].center,
    topics: [
      { id: "b2-c11-t1", name: "মেন্ডেলের ১ম সূত্র (মনোহাইব্রিড ক্রস) ও ব্যাখ্যা", importance: "high" },
      { id: "b2-c11-t2", name: "১ম সূত্রের ব্যতিক্রম (অসম্পূর্ণ প্রকটতা, সমপ্রকটতা, লিথাল জিন)", importance: "high" },
      { id: "b2-c11-t3", name: "মেন্ডেলের ২য় সূত্র (ডাইহাইব্রিড ক্রস) ও অনুপাত", importance: "high" },
      { id: "b2-c11-t4", name: "২য় সূত্রের ব্যতিক্রম (পরিপূরক জিন, এপিস্ট্যাসিস)", importance: "high" },
      { id: "b2-c11-t5", name: "সেক্স লিঙ্কড ইনহেরিটেন্স (বর্ণান্ধতা, হিমোফিলিয়া, ডوشেন মাসকুলার ডিস্ট্রফি)", importance: "high" },
      { id: "b2-c11-t6", name: "রক্তের গ্রুপ ও পিতা-মাতার বংশানুক্রমিক জটিলতা", importance: "high" },
      { id: "b2-c11-t7", name: "ডারউইনের বিবর্তন মতবাদ ও প্রাকৃতিক নির্বাচন", importance: "high" },
      { id: "b2-c11-t8", name: "নব্য ডারউইনবাদ ও ল্যামার্কিজম", importance: "medium" },
      { id: "b2-c11-t9", name: "সমসংস্থ, সমবৃত্তীয় ও নিষ্ক্রিয় অঙ্গের প্রমাণ", importance: "high" }
    ]
  },
  {
    id: "b2-c12",
    number: 12,
    name: "প্রাণীর আচরণ",
    englishName: "Animal Behavior",
    codeName: "প্রাণীর আচরণ",
    description: "ট্যাক্সিস, রিফ্লেক্স, শিখন ও সামাজিক আচরণ",
    territoryPath: bio2Layout[11].path,
    labelCoord: bio2Layout[11].center,
    topics: [
      { id: "b2-c12-t1", name: "সহজাত আচরণ (Innate Behavior) ও রিফ্লেক্স", importance: "medium" },
      { id: "b2-c12-t2", name: "ট্যাক্সিস (Taxis) এর প্রকারভেদ (ফটোট্যাক্সিস, কেমোট্যাক্সিস)", importance: "high" },
      { id: "b2-c12-t3", name: "শিখন আচরণ (Learned Behavior) ও স্বভাবগত আচরণ (Habituation)", importance: "high" },
      { id: "b2-c12-t4", name: "প্যাভলভের সাপেক্ষ প্রতিবর্ত ক্রিয়া (Conditioning)", importance: "high" },
      { id: "b2-c12-t5", name: "অনুকৃতির শিখন (Imprinting) ও অন্ধ শিখন", importance: "medium" },
      { id: "b2-c12-t6", name: "সামাজিক আচরণ: মৌমাছির সমাজ ও নাচের ভাষা (Waggle Dance)", importance: "high" },
      { id: "b2-c12-t7", name: "পরার্থপরতা (Altruism) ও আত্মরক্ষা আচরণ", importance: "high" }
    ]
  }
];

const phy1Layout = generateContiguousLayout(10);
const PHY_1_CHAPTERS: Chapter[] = [
  {
    id: "p1-c1",
    number: 1,
    name: "ভৌতজগৎ ও পরিমাপ",
    englishName: "Physical World & Measurement",
    codeName: "ভৌতজগৎ",
    description: "একক, মাত্রা, ভার্নিয়ার স্কেল, স্ক্রু গজ ও ত্রুটির হিসাব",
    territoryPath: phy1Layout[0].path,
    labelCoord: phy1Layout[0].center,
    topics: [
      { id: "p1-c1-t1", name: "এসআই একক (SI Unit) ও মাত্রা সমীকরণ", importance: "high" },
      { id: "p1-c1-t2", name: "স্লাইড ক্যালিপার্স ও ভার্নিয়ার ধ্রুবক", importance: "high" },
      { id: "p1-c1-t3", name: "স্ক্রু গজ, পিচ ও লঘিষ্ঠ গণন", importance: "high" },
      { id: "p1-c1-t4", name: "পরিমাপের ত্রুটি (পরম, আপেক্ষিক ও শতকরা ত্রুটি)", importance: "high" },
      { id: "p1-c1-t5", name: "তাৎপর্যপূর্ণ অঙ্ক ও পরিমাপের নির্ভুলতা", importance: "medium" }
    ]
  },
  {
    id: "p1-c2",
    number: 2,
    name: "ভেক্টর",
    englishName: "Vectors",
    codeName: "ভেক্টর",
    description: "ভেক্টর যোজন, সামান্তরিক সূত্র, ডট ও ক্রস গুণন, ক্যালকুলাস",
    territoryPath: phy1Layout[1].path,
    labelCoord: phy1Layout[1].center,
    topics: [
      { id: "p1-c2-t1", name: "ভেক্টরের প্রকারভেদ ও ভেক্টর যোজনের সামান্তরিক সূত্র", importance: "high" },
      { id: "p1-c2-t2", name: "ভেক্টরের বিয়োগ ও আপেক্ষিক বেগ (নৌকা-নদী ও বৃষ্টির বেগ সমস্যা)", importance: "high" },
      { id: "p1-c2-t3", name: "ত্রিমাত্রিক স্থানাঙ্ক ব্যবস্থায় ভেক্টরের বিভাজন ও একক ভেক্টর", importance: "high" },
      { id: "p1-c2-t4", name: "স্কেলার গুণন (ডট গুণন) ও অভিক্ষেপ নির্ণয়", importance: "high" },
      { id: "p1-c2-t5", name: "ভেক্টর গুণন (ক্রস গুণন) ও ক্ষেত্রফল নির্ণয়", importance: "high" },
      { id: "p1-c2-t6", name: "ভেক্টর ক্যালকুলাস (গ্র্যাডিয়েন্ট, ডাইভারজেন্স ও কার্ল)", importance: "high" }
    ]
  },
  {
    id: "p1-c3",
    number: 3,
    name: "গতিবিদ্যা",
    englishName: "Dynamics & Kinematics",
    codeName: "গতিবিদ্যা",
    description: "রৈখিক গতি, প্রাস, অভিকর্ষজ গতি ও লেখচিত্র",
    territoryPath: phy1Layout[2].path,
    labelCoord: phy1Layout[2].center,
    topics: [
      { id: "p1-c3-t1", name: "একমাত্রিক গতি ও অবস্থান-সময় লেখচিত্র", importance: "medium" },
      { id: "p1-c3-t2", name: "সমত্বরণে সরলরৈখিক গতির সমীকরণ ও অনুসিদ্ধান্ত", importance: "high" },
      { id: "p1-c3-t3", name: "অভিকর্ষের অধীনে খাড়া নিক্ষিপ্ত ও পড়ন্ত বস্তুর গতি", importance: "high" },
      { id: "p1-c3-t4", name: "প্রাস (Projectile) এর সমীকরণ ও গতিপথের রূপ", importance: "high" },
      { id: "p1-c3-t5", name: "প্রাসের সর্বোচ্চ উচ্চতা, উড্ডয়নকাল ও অনুভূমিক পাল্লা", importance: "high" },
      { id: "p1-c3-t6", name: "কৌণিক সরণ, কৌণিক বেগ ও কেন্দ্রমুখী ত্বরণ", importance: "high" }
    ]
  },
  {
    id: "p1-c4",
    number: 4,
    name: "নিউটনীয় বলবিদ্যা",
    englishName: "Newtonian Mechanics",
    codeName: "বলবিদ্যা",
    description: "বলের ঘাত, রকেট, জড়তার ভ্রামক, টর্ক ও ব্যাংকিং",
    territoryPath: phy1Layout[3].path,
    labelCoord: phy1Layout[3].center,
    topics: [
      { id: "p1-c4-t1", name: "নিউটনের গতির সূত্রসমূহ ও বলের ঘাত", importance: "high" },
      { id: "p1-c4-t2", name: "রৈখিক ভরবেগের সংরক্ষণ সূত্র ও রকেটের গতি", importance: "high" },
      { id: "p1-c4-t3", name: "সংঘর্ষ (স্থিতিস্থাপক ও অস্থিতিস্থাপক সংঘর্ষ)", importance: "high" },
      { id: "p1-c4-t4", name: "ঘর্ষণ বল ও ঘর্ষণ গুণাঙ্ক", importance: "medium" },
      { id: "p1-c4-t5", name: "জড়তার ভ্রামক (Moment of Inertia) ও চক্রগতির ব্যাসার্ধ", importance: "high" },
      { id: "p1-c4-t6", name: "সমান্তরাল ও লম্ব অক্ষ উপপাদ্য", importance: "high" },
      { id: "p1-c4-t7", name: "টর্ক (Torque) ও কৌণিক ভরবেগের সংরক্ষণ সূত্র", importance: "high" },
      { id: "p1-c4-t8", name: "কেন্দ্রমুখী বল ও রাস্তার ব্যাংকিং কোণ", importance: "high" }
    ]
  },
  {
    id: "p1-c5",
    number: 5,
    name: "কাজ, শক্তি ও ক্ষমতা",
    englishName: "Work, Energy & Power",
    codeName: "কাজ-শক্তি",
    description: "কাজ-শক্তি উপপাদ্য, স্প্রিং, শক্তির নিত্যতা ও ক্ষমতা",
    territoryPath: phy1Layout[4].path,
    labelCoord: phy1Layout[4].center,
    topics: [
      { id: "p1-c5-t1", name: "কাজের সংজ্ঞা (ধ্রুব বল ও পরিবর্তনশীল বল দ্বারা কৃতকাজ)", importance: "high" },
      { id: "p1-c5-t2", name: "গতিশক্তি ও কাজ-শক্তি উপপাদ্য (Work-Energy Theorem)", importance: "high" },
      { id: "p1-c5-t3", name: "স্প্রিং এর স্থিতিশক্তি ও সংরক্ষণশীল বল", importance: "high" },
      { id: "p1-c5-t4", name: "যান্ত্রিক শক্তির নিত্যতা সূত্র (পড়ন্ত বস্তু ও সরল দোলক)", importance: "high" },
      { id: "p1-c5-t5", name: "ক্ষমতা (Power) ও কুয়ো/পাম্পের কর্মদক্ষতা (Efficiency)", importance: "high" }
    ]
  },
  {
    id: "p1-c6",
    number: 6,
    name: "মহাকর্ষ ও অভিকর্ষ",
    englishName: "Gravitation & Gravity",
    codeName: "মহাকর্ষ",
    description: "অভিকর্ষজ ত্বরণ, বিভব, মুক্তিবেগ ও কৃত্রিম উপগ্রহ",
    territoryPath: phy1Layout[5].path,
    labelCoord: phy1Layout[5].center,
    topics: [
      { id: "p1-c6-t1", name: "নিউটনের মহাকর্ষ সূত্র ও মহাকর্ষীয় ধ্রুবক (G)", importance: "high" },
      { id: "p1-c6-t2", name: "অভিকর্ষজ ত্বরণ (g) এর ওপর উচ্চতা, গভীরতা ও অক্ষাংশের প্রভাব", importance: "high" },
      { id: "p1-c6-t3", name: "মহাকর্ষীয় ক্ষেত্র প্রাবল্য ও মহাকর্ষীয় বিভব", importance: "high" },
      { id: "p1-c6-t4", name: "মুক্তিবেগ (Escape Velocity) সমীকরণ ও গণনা", importance: "high" },
      { id: "p1-c6-t5", name: "কেপলারের গ্রহীয় গতিসূত্রাবলী", importance: "medium" },
      { id: "p1-c6-t6", name: "কৃত্রিম উপগ্রহের বেগ, পর্যায়কাল ও ভূ-স্থির উপগ্রহ (Geostationary Satellite)", importance: "high" }
    ]
  },
  {
    id: "p1-c7",
    number: 7,
    name: "পদার্থের গাঠনিক ধর্ম",
    englishName: "Structural Properties of Matter",
    codeName: "গাঠনিক ধর্ম",
    description: "পীড়ন, বিকৃতি, স্থিতিস্থাপকতা, সান্দ্রতা ও পৃষ্ঠটান",
    territoryPath: phy1Layout[6].path,
    labelCoord: phy1Layout[6].center,
    topics: [
      { id: "p1-c7-t1", name: "পীড়ন, বিকৃতি ও হুকের স্থিতিস্থাপকতা সূত্র", importance: "high" },
      { id: "p1-c7-t2", name: "ইয়ং-এর গুণাঙ্ক (Young's Modulus), আয়তন ও দৃঢ়তার গুণাঙ্ক", importance: "high" },
      { id: "p1-c7-t3", name: "পয়সনের অনুপাত (Poisson's Ratio)", importance: "high" },
      { id: "p1-c7-t4", name: "স্থিতিস্থাপক স্থিতিশক্তি ও তারের প্রসারণে কৃতকাজ", importance: "high" },
      { id: "p1-c7-t5", name: "সান্দ্রতা ও সান্দ্রতা গুণাঙ্ক (নিউটন সূত্র)", importance: "high" },
      { id: "p1-c7-t6", name: "স্টোকসের সূত্র ও প্রান্তিক বেগ (Terminal Velocity)", importance: "high" },
      { id: "p1-c7-t7", name: "পৃষ্ঠটান (Surface Tension) ও কৈশিক নল", importance: "high" }
    ]
  },
  {
    id: "p1-c8",
    number: 8,
    name: "পর্যায়বৃত্ত গতি",
    englishName: "Periodic Motion",
    codeName: "পর্যায়বৃত্ত গতি",
    description: "সরল ছন্দিত স্পন্দন, সরল দোলক ও স্প্রিং দোলন",
    territoryPath: phy1Layout[7].path,
    labelCoord: phy1Layout[7].center,
    topics: [
      { id: "p1-c8-t1", name: "পর্যায়বৃত্ত গতি ও সরল ছন্দিত স্পন্দন (SHM) বৈশিষ্ট্য", importance: "high" },
      { id: "p1-c8-t2", name: "সরল ছন্দিত গতির অন্তরক সমীকরণ ও সমাধান", importance: "high" },
      { id: "p1-c8-t3", name: "সরল ছন্দিত গতির সরণ, বেগ, ত্বরণ ও পর্যায়কাল", importance: "high" },
      { id: "p1-c8-t4", name: "সরল ছন্দিত স্পন্দনে শক্তির নিত্যতা (গতিশক্তি ও স্থিতিশক্তি)", importance: "high" },
      { id: "p1-c8-t5", name: "সরল দোলকের সূত্রাবলী ও পর্যায়কালের সমীকরণ", importance: "high" },
      { id: "p1-c8-t6", name: "সেকেন্ড দোলক ও পাহাড়ের উচ্চতা নির্ণয়", importance: "high" },
      { id: "p1-c8-t7", name: "স্প্রিং-ভর তন্ত্রের দোলন ও স্প্রিং ধ্রুবক", importance: "high" }
    ]
  },
  {
    id: "p1-c9",
    number: 9,
    name: "তরঙ্গ",
    englishName: "Waves",
    codeName: "তরঙ্গ",
    description: "অগ্রগামী ও স্থির তরঙ্গ, বিট ও ডপলার ক্রিয়া",
    territoryPath: phy1Layout[8].path,
    labelCoord: phy1Layout[8].center,
    topics: [
      { id: "p1-c9-t1", name: "অনুপ্রস্থ ও অনুদৈর্ঘ্য তরঙ্গের বৈশিষ্ট্য", importance: "medium" },
      { id: "p1-c9-t2", name: "সরল ছন্দিত অগ্রগামী তরঙ্গের সমীকরণ ও গাণিতিক সমস্যা", importance: "high" },
      { id: "p1-c9-t3", name: "তরঙ্গের তীব্রতা ও তীব্রতা লেভেল (ডেসিবেল স্কেল)", importance: "high" },
      { id: "p1-c9-t4", name: "তরঙ্গের উপরিপাতন ও স্থির তরঙ্গের সমীকরণ", importance: "high" },
      { id: "p1-c9-t5", name: "সুস্পন্দ ও নিস্পন্দ বিন্দু এবং টানা তারের আড় কম্পন", importance: "high" },
      { id: "p1-c9-t6", name: "বিট (Beats) ও অজানা কম্পাঙ্ক নির্ণয়", importance: "high" },
      { id: "p1-c9-t7", name: "ডপলার ক্রিয়া (Doppler Effect) ও আপাত কম্পাঙ্ক", importance: "high" }
    ]
  },
  {
    id: "p1-c10",
    number: 10,
    name: "আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব",
    englishName: "Ideal Gas & Gas Kinetics",
    codeName: "আদর্শ গ্যাস",
    description: "গ্যাসের সূত্র, RMS বেগ, আপেক্ষিক আর্দ্রতা ও শিশিরাংক",
    territoryPath: phy1Layout[9].path,
    labelCoord: phy1Layout[9].center,
    topics: [
      { id: "p1-c10-t1", name: "গ্যাসের সূত্রসমূহ ও আদর্শ গ্যাস সমীকরণ (PV = nRT)", importance: "high" },
      { id: "p1-c10-t2", name: "গ্যাসের গতিতত্ত্বের স্বীকার্য ও চাপ সমীকরণ", importance: "high" },
      { id: "p1-c10-t3", name: "মূল গড় বর্গবেগ (RMS Velocity) ও গড় গতিশক্তি", importance: "high" },
      { id: "p1-c10-t4", name: "গ্যাসের মোলার আপেক্ষিক তাপ (Cp ও Cv এর সম্পর্ক)", importance: "high" },
      { id: "p1-c10-t5", name: "স্বাধীনতার মাত্রা ও গড় মুক্ত পথ (Mean Free Path)", importance: "high" },
      { id: "p1-c10-t6", name: "সম্পৃক্ত ও অসম্পৃক্ত বাষ্পচাপ", importance: "high" },
      { id: "p1-c10-t7", name: "শিশিরাংক, আপেক্ষিক আর্দ্রতা ও হাইগ্রোমিটার", importance: "high" }
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
    description: "১ম ও ২য় সূত্র, সমোষ্ণ-রুদ্ধতাপীয় প্রক্রিয়া, কার্নো চক্র ও এন্ট্রপি",
    territoryPath: phy2Layout[0].path,
    labelCoord: phy2Layout[0].center,
    topics: [
      { id: "p2-c1-t1", name: "তাপগতিবিদ্যার ১ম সূত্র (dq = du + dw)", importance: "high" },
      { id: "p2-c1-t2", name: "সমোষ্ণ ও রুদ্ধতাপীয় প্রক্রিয়া (Isothermal & Adiabatic)", importance: "high" },
      { id: "p2-c1-t3", name: "রুদ্ধতাপীয় পরিবর্তনে কৃতকাজ ও পিভি সমীকরণ", importance: "high" },
      { id: "p2-c1-t4", name: "কার্নো চক্র (Carnot Cycle) ও কার্নো ইঞ্জিন", importance: "high" },
      { id: "p2-c1-t5", name: "তাপ ইঞ্জিনের কর্মদক্ষতা ও রেফ্রিজারেটর", importance: "high" },
      { id: "p2-c1-t6", name: "তাপগতিবিদ্যার ২য় সূত্র (ক্লসিয়াস ও কেলভিন উক্তি)", importance: "high" },
      { id: "p2-c1-t7", name: "এন্ট্রপি (Entropy) ও এন্ট্রপির পরিবর্তন গণনা", importance: "high" }
    ]
  },
  {
    id: "p2-c2",
    number: 2,
    name: "স্থির তড়িৎ",
    englishName: "Electrostatics",
    codeName: "স্থির তড়িৎ",
    description: "কুলম্বের সূত্র, তড়িৎ ক্ষেত্র, বিভব, গাউসের সূত্র ও ধারক",
    territoryPath: phy2Layout[1].path,
    labelCoord: phy2Layout[1].center,
    topics: [
      { id: "p2-c2-t1", name: "কুলম্বের সূত্র ও ডাই-ইলেকট্রিক ধ্রুবক", importance: "high" },
      { id: "p2-c2-t2", name: "তড়িৎ ক্ষেত্র প্রাবল্য ও বলরেখা", importance: "high" },
      { id: "p2-c2-t3", name: "তড়িৎ দ্বিমেরু ও দ্বিমেরু ভ্রামক", importance: "medium" },
      { id: "p2-c2-t4", name: "গাউসের সূত্র (Gauss's Law) ও প্রয়োগ", importance: "high" },
      { id: "p2-c2-t5", name: "বিন্দু আধান ও চার্জিত গোলকের তড়িৎ বিভব", importance: "high" },
      { id: "p2-c2-t6", name: "ধারকত্ব ও সমান্তরাল পাত ধারকের ধারকত্ব", importance: "high" },
      { id: "p2-c2-t7", name: "ধারকের সমবায় ও সঞ্চিত শক্তি", importance: "high" }
    ]
  },
  {
    id: "p2-c3",
    number: 3,
    name: "চল তড়িৎ",
    englishName: "Current Electricity",
    codeName: "চল তড়িৎ",
    description: "ওহমের সূত্র, কার্শফের সূত্র, হুইটস্টোন ব্রিজ ও পটেনশিওমিটার",
    territoryPath: phy2Layout[2].path,
    labelCoord: phy2Layout[2].center,
    topics: [
      { id: "p2-c3-t1", name: "ওহমের সূত্র, রোধ ও রোধের উষ্ণতা সহগ", importance: "high" },
      { id: "p2-c3-t2", name: "আপেক্ষিক রোধ ও পরিবাহিতা", importance: "medium" },
      { id: "p2-c3-t3", name: "কোষের তড়িচ্চালক বল, অভ্যন্তরীণ রোধ ও প্রান্তীয় বিভব", importance: "high" },
      { id: "p2-c3-t4", name: "কার্শফের ১ম ও ২য় সূত্র (KCL & KVL)", importance: "high" },
      { id: "p2-c3-t5", name: "হুইটস্টোন ব্রিজ নীতি ও মিটার ব্রিজ", importance: "high" },
      { id: "p2-c3-t6", name: "পটেনশিওমিটার ও শান্টের সমীকরণ", importance: "high" }
    ]
  },
  {
    id: "p2-c4",
    number: 4,
    name: "তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব",
    englishName: "Magnetic Effects of Current",
    codeName: "চুম্বকত্ব",
    description: "বায়ো-স্যাভার্ট সূত্র, লরেঞ্জ বল, হল ক্রিয়া ও ভূ-চৌম্বকত্ব",
    territoryPath: phy2Layout[3].path,
    labelCoord: phy2Layout[3].center,
    topics: [
      { id: "p2-c4-t1", name: "বায়ো-স্যাভার্ট সূত্র ও বৃত্তাকার তারে চৌম্বক ক্ষেত্র", importance: "high" },
      { id: "p2-c4-t2", name: "অ্যাম্পিয়ারের সূত্র ও সলিনয়েড", importance: "high" },
      { id: "p2-c4-t3", name: "লরেঞ্জ বল ও চৌম্বক ক্ষেত্রে চার্জিত কণার গতি", importance: "high" },
      { id: "p2-c4-t4", name: "সমান্তরাল পরিবাহীতে আকর্ষণ-বিকর্ষণ বল", importance: "high" },
      { id: "p2-c4-t5", name: "হল ক্রিয়া (Hall Effect) ও হল বিভব", importance: "high" },
      { id: "p2-c4-t6", name: "ভূ-চৌম্বক উপাদানসমূহ (বিনতি, বিচ্যুতি, অনুভূমিক প্রাবল্য)", importance: "high" },
      { id: "p2-c4-t7", name: "প্যারা, ডায়া ও ফেরোচৌম্বক পদার্থ", importance: "medium" }
    ]
  },
  {
    id: "p2-c5",
    number: 5,
    name: "তাড়িতচৌম্বক আবেশ ও পরিবর্তী প্রবাহ",
    englishName: "EM Induction & AC",
    codeName: "তাড়িতচৌম্বক আবেশ",
    description: "ফ্যারাডের সূত্র, লেঞ্জের সূত্র, এসি বর্তনী ও ট্রান্সফরমার",
    territoryPath: phy2Layout[4].path,
    labelCoord: phy2Layout[4].center,
    topics: [
      { id: "p2-c5-t1", name: "ফ্যারাডের তাড়িতচৌম্বক আবেশের সূত্র ও লেঞ্জের সূত্র", importance: "high" },
      { id: "p2-c5-t2", name: "স্বকীয় আবেশ ও পারস্পরিক আবেশ গুণাঙ্ক", importance: "high" },
      { id: "p2-c5-t3", name: "পরিবর্তী প্রবাহের শীর্ষমান ও আরএমএস (RMS) মান", importance: "high" },
      { id: "p2-c5-t4", name: "এলসিআর (LCR) শ্রেণি অনুনাদী বর্তনী ও ইম্পিডেন্স", importance: "high" },
      { id: "p2-c5-t5", name: "ট্রান্সফরমার (Step-up & Step-down) নীতি ও ক্ষমতা", importance: "high" },
      { id: "p2-c5-t6", name: "এসি জেনারেটরের মূলনীতি", importance: "medium" }
    ]
  },
  {
    id: "p2-c6",
    number: 6,
    name: "জ্যামিতিক আলোকবিজ্ঞান",
    englishName: "Geometrical Optics",
    codeName: "জ্যামিতিক আলো",
    description: "প্রতিসরণ, প্রিজম, লেন্স প্রস্তুতকারকের সূত্র ও অণুবীক্ষণ",
    territoryPath: phy2Layout[5].path,
    labelCoord: phy2Layout[5].center,
    topics: [
      { id: "p2-c6-t1", name: "আলোর প্রতিসরণ, সংকট কোণ ও পূর্ণ অভ্যন্তরীণ প্রতিফলন", importance: "high" },
      { id: "p2-c6-t2", name: "প্রিজমে প্রতিসরণ ও ন্যূনতম বিচ্যুতি কোণ", importance: "high" },
      { id: "p2-c6-t3", name: "লেন্স প্রস্তুতকারকের সমীকরণ (Lens Maker's Formula)", importance: "high" },
      { id: "p2-c6-t4", name: "লেন্সের ক্ষমতা ও সংযুক্ত লেন্সের ফোকাস দূরত্ব", importance: "high" },
      { id: "p2-c6-t5", name: "সরল ও যৌগিক অণুবীক্ষণ যন্ত্রের বিবর্ধন ক্ষমতা", importance: "high" },
      { id: "p2-c6-t6", name: "নভোদূরবীক্ষণ যন্ত্রের গঠন ও বিবর্ধন সমীকরণ", importance: "high" }
    ]
  },
  {
    id: "p2-c7",
    number: 7,
    name: "ভৌত আলোকবিজ্ঞান",
    englishName: "Physical Optics",
    codeName: "ভৌত আলো",
    description: "ব্যতিচার, অপবর্তন, ইয়ং-এর দ্বি-চির ও সমবর্তন",
    territoryPath: phy2Layout[6].path,
    labelCoord: phy2Layout[6].center,
    topics: [
      { id: "p2-c7-t1", name: "হাইগেনসের তরঙ্গ নীতি ও তরঙ্গমুখ", importance: "medium" },
      { id: "p2-c7-t2", name: "আলোর ব্যতিচার (Interference) ও সুসংগত উৎস", importance: "high" },
      { id: "p2-c7-t3", name: "ইয়ং-এর দ্বি-চির পরীক্ষা ও ডোরার প্রস্থ নির্ণয়", importance: "high" },
      { id: "p2-c7-t4", name: "আলোর অপবর্তন (একক চির ও গ্রেটিং অপবর্তন)", importance: "high" },
      { id: "p2-c7-t5", name: "আলোর সমবর্তন (Polarization) ও ব্রুস্টারের সূত্র", importance: "high" }
    ]
  },
  {
    id: "p2-c8",
    number: 8,
    name: "আধুনিক পদার্থবিজ্ঞানের সূচনা",
    englishName: "Modern Physics",
    codeName: "আধুনিক পদার্থ",
    description: "আপেক্ষিকতার তত্ত্ব, ফটোতড়িৎ ক্রিয়া ও ডি-ব্রগলি তরঙ্গ",
    territoryPath: phy2Layout[7].path,
    labelCoord: phy2Layout[7].center,
    topics: [
      { id: "p2-c8-t1", name: "আইনস্টাইনের আপেক্ষিকতার বিশেষ তত্ত্ব ও স্বীকার্য", importance: "high" },
      { id: "p2-c8-t2", name: "কাল দীর্ঘায়ন (Time Dilation) সমীকরণ ও সমস্যা", importance: "high" },
      { id: "p2-c8-t3", name: "দৈর্ঘ্য সংকোচন (Length Contraction) ও ভর বৃদ্ধি", importance: "high" },
      { id: "p2-c8-t4", name: "ভর-শক্তি সম্পর্ক (E = mc²) ও আপেক্ষিক ভরবেগ", importance: "high" },
      { id: "p2-c8-t5", name: "ফটোতড়িৎ ক্রিয়া ও আইনস্টাইনের ফটোইলেকট্রিক সমীকরণ", importance: "high" },
      { id: "p2-c8-t6", name: "কম্পটন ক্রিয়া (Compton Effect)", importance: "medium" },
      { id: "p2-c8-t7", name: "দ্য ব্রগলি পদার্থ তরঙ্গ ও হাইজেনবার্গের অনিশ্চয়তা নীতি", importance: "high" }
    ]
  },
  {
    id: "p2-c9",
    number: 9,
    name: "পরমাণুর মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান",
    englishName: "Atomic Models & Nuclear Physics",
    codeName: "নিউক্লিয়ার পদার্থ",
    description: "বোর মডেল, হাইড্রোজেন বর্ণালী, তেজস্ক্রিয়তা ও নিউক্লিয়ার বিক্রিয়া",
    territoryPath: phy2Layout[8].path,
    labelCoord: phy2Layout[8].center,
    topics: [
      { id: "p2-c9-t1", name: "রাদারফোর্ড ও বোরের পরমাণু মডেলের স্বীকার্যসমূহ", importance: "high" },
      { id: "p2-c9-t2", name: "হাইড্রোজেন পরমাণুর শক্তিস্তর ও বর্ণালী সিরিজ", importance: "high" },
      { id: "p2-c9-t3", name: "নিউক্লিয়াসের গঠন, ভর ত্রুটি ও বন্ধন শক্তি", importance: "high" },
      { id: "p2-c9-t4", name: "তেজস্ক্রিয় ক্ষয় সূত্র ও তেজস্ক্রিয় ধ্রুবক", importance: "high" },
      { id: "p2-c9-t5", name: "অর্ধায়ু (Half-life) ও গড় আয়ুর সমীকরণ", importance: "high" },
      { id: "p2-c9-t6", name: "নিউক্লিয়ার ফিশন ও ফিউশন বিক্রিয়া", importance: "high" }
    ]
  },
  {
    id: "p2-c10",
    number: 10,
    name: "সেমিকন্ডাক্টর ও ইলেকট্রনিক্স",
    englishName: "Semiconductors & Electronics",
    codeName: "সেমিকন্ডাক্টর",
    description: "পি-এন জংশন, ট্রানজিস্টর, বিবর্ধক ও লজিক গেট",
    territoryPath: phy2Layout[9].path,
    labelCoord: phy2Layout[9].center,
    topics: [
      { id: "p2-c10-t1", name: "p-টাইপ ও n-টাইপ অর্ধপরিবাহী", importance: "high" },
      { id: "p2-c10-t2", name: "পি-এন জংশন ডায়োড ও বায়াসিং (Forward & Reverse)", importance: "high" },
      { id: "p2-c10-t3", name: "একমুখীকরণ (পূর্ণ তরঙ্গ ও অর্ধ তরঙ্গ রেকটিফিকেশন)", importance: "high" },
      { id: "p2-c10-t4", name: "জেনার ডায়োড ও ভোল্টেজ নিয়ন্ত্রণ", importance: "medium" },
      { id: "p2-c10-t5", name: "ট্রানজিস্টরের গঠন ও সাধারণ নিঃসারক (CE) বিন্যাস", importance: "high" },
      { id: "p2-c10-t6", name: "ট্রানজিস্টর বিবর্ধক ও সুইচ হিসেবে ব্যবহার", importance: "high" },
      { id: "p2-c10-t7", name: "লজিক গেট (AND, OR, NOT, NAND, NOR, XOR, XNOR)", importance: "high" }
    ]
  },
  {
    id: "p2-c11",
    number: 11,
    name: "জ্যোতির্বিজ্ঞান",
    englishName: "Astronomy",
    codeName: "জ্যোতির্বিজ্ঞান",
    description: "মহাবিশ্ব, তারার বিবর্তন, ব্ল্যাক হোল ও হাবলের সূত্র",
    territoryPath: phy2Layout[10].path,
    labelCoord: phy2Layout[10].center,
    topics: [
      { id: "p2-c11-t1", name: "মহাবিশ্বের গঠন ও গ্যালাক্সির প্রকারভেদ", importance: "medium" },
      { id: "p2-c11-t2", name: "তারার জন্ম, বিবর্তন ও শ্বেত বামন (White Dwarf)", importance: "high" },
      { id: "p2-c11-t3", name: "সুপারনোভা ও নিউট্রন তারা", importance: "high" },
      { id: "p2-c11-t4", name: "ব্ল্যাক হোল (কৃষ্ণগহ্বর) ও সোয়ার্জশিল্ড ব্যাসার্ধ", importance: "high" },
      { id: "p2-c11-t5", name: "বিগ ব্যাং তত্ত্ব ও মহাবিশ্বের প্রসারণ", importance: "medium" },
      { id: "p2-c11-t6", name: "হাবলের সূত্র (Hubble's Law) ও দূরত্ব নির্ণয়", importance: "high" }
    ]
  }
];

const chem1Layout = generateContiguousLayout(5);
const CHEM_1_CHAPTERS: Chapter[] = [
  {
    id: "c1-c1",
    number: 1,
    name: "ল্যাবরেটরির নিরাপদ ব্যবহার",
    englishName: "Safe Use of Laboratory",
    codeName: "ল্যাব নিরাপত্তা",
    description: "সুরক্ষা সামগ্রী, হ্যাজার্ড প্রতীক, কাচ সামগ্রী ও সবুজ রসায়ন",
    territoryPath: chem1Layout[0].path,
    labelCoord: chem1Layout[0].center,
    topics: [
      { id: "c1-c1-t1", name: "ল্যাবরেটরির সুরক্ষা বিধি ও ব্যক্তিগত সুরক্ষা সামগ্রী (PPE)", importance: "high" },
      { id: "c1-c1-t2", name: "রাসায়নিক দ্রব্যের হ্যাজার্ড প্রতীক ও ঝুঁকি সতর্কতা", importance: "high" },
      { id: "c1-c1-t3", name: "কাচ সামগ্রী পরিষ্কার ও পরিমাপক যন্ত্রপাতি (পিপেট, ব্যুরেট)", importance: "medium" },
      { id: "c1-c1-t4", name: "সেমি-মাইক্রো ও মাইক্রো বিশ্লেষণ পদ্ধতি", importance: "high" },
      { id: "c1-c1-t5", name: "সবুজ রসায়ন (Green Chemistry) এর মূলনীতি", importance: "medium" },
      { id: "c1-c1-t6", name: "রাসায়নিক বর্জ্য ব্যবস্থাপনা ও প্রাথমিক চিকিৎসা", importance: "medium" }
    ]
  },
  {
    id: "c1-c2",
    number: 2,
    name: "গুণগত রসায়ন",
    englishName: "Qualitative Chemistry",
    codeName: "গুণগত রসায়ন",
    description: "কোয়ান্টাম সংখ্যা, বর্ণালী, দ্রাব্যতা গুণফল ও আয়ন শনাক্তকরণ",
    territoryPath: chem1Layout[1].path,
    labelCoord: chem1Layout[1].center,
    topics: [
      { id: "c1-c2-t1", name: "রাদারফোর্ড ও বোরের পরমাণু মডেলের তুলনা", importance: "medium" },
      { id: "c1-c2-t2", name: "কোয়ান্টাম সংখ্যা (n, l, m, s) ও অরবিটাল ধারণা", importance: "high" },
      { id: "c1-c2-t3", name: "আউফবাউ নীতি, পাউলির বর্জন নীতি ও হুন্ডের নিয়ম", importance: "high" },
      { id: "c1-c2-t4", name: "তড়িৎচৌম্বকীয় বর্ণালী ও হাইড্রোজেন পরমাণুর রেখা বর্ণালী (রিডবার্গ সমীকরণ)", importance: "high" },
      { id: "c1-c2-t5", name: "দ্রাব্যতা ও দ্রাব্যতা গুণফল (Ksp & Kip) সংক্রান্ত গাণিতিক সমস্যা", importance: "high" },
      { id: "c1-c2-t6", name: "সম-আয়ন প্রভাব ও অধঃক্ষেপণ শর্ত", importance: "high" },
      { id: "c1-c2-t7", name: "শিখা পরীক্ষা ও ক্যাটায়ন-অ্যানায়ন শনাক্তকরণ (Cu2+, Fe2+, Fe3+, Al3+, Zn2+, Ca2+, NH4+, Cl-, SO4 2-)", importance: "high" },
      { id: "c1-c2-t8", name: "পেপার ক্রোমাটোগ্রাফি ও Rf মান নির্ণয়", importance: "medium" }
    ]
  },
  {
    id: "c1-c3",
    number: 3,
    name: "মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন",
    englishName: "Periodic Properties & Chemical Bonding",
    codeName: "পর্যায়বৃত্ত ধর্ম",
    description: "ব্লক বিন্যাস, সংকরায়ন, VSEPR তত্ত্ব, পোলারিটি ও ফাজানের নিয়ম",
    territoryPath: chem1Layout[2].path,
    labelCoord: chem1Layout[2].center,
    topics: [
      { id: "c1-c3-t1", name: "পর্যায় সারণির ব্লক বিন্যাস (s, p, d, f ব্লক মৌল)", importance: "high" },
      { id: "c1-c3-t2", name: "পর্যায়বৃত্ত ধর্মসমূহ (পরমাণুর আকার, আয়নিকরণ শক্তি, ইলেকট্রন আসক্তি, তড়িৎ ঋণাত্মকতা)", importance: "high" },
      { id: "c1-c3-t3", name: "অবস্থান্তর মৌলের বৈশিষ্ট্য ও রঙিন জটিল যৌগ গঠন", importance: "high" },
      { id: "c1-c3-t4", name: "অরবিটাল সংকরায়ন (sp, sp2, sp3, sp3d, sp3d2) নির্ণয়", importance: "high" },
      { id: "c1-c3-t5", name: "VSEPR তত্ত্ব ও মুক্তজোড় ইলেকট্রনের প্রভাবে অণুর আকৃতি", importance: "high" },
      { id: "c1-c3-t6", name: "ফাজানের নিয়ম (আয়নিক যৌগের সমযোজী বৈশিষ্ট্য)", importance: "high" },
      { id: "c1-c3-t7", name: "ডাইপোল ভ্রামক ও বন্ধনের পোলারিটি", importance: "high" },
      { id: "c1-c3-t8", name: "হাইড্রোজেন বন্ধন ও ভ্যান ডার ওয়ালস বল", importance: "high" }
    ]
  },
  {
    id: "c1-c4",
    number: 4,
    name: "রাসায়নিক পরিবর্তন",
    englishName: "Chemical Changes",
    codeName: "রাসায়নিক পরিবর্তন",
    description: "লা শাতেলিয়ার নীতি, Kp ও Kc, pH স্কেল, বাফার দ্রবণ ও হেসের সূত্র",
    territoryPath: chem1Layout[3].path,
    labelCoord: chem1Layout[3].center,
    topics: [
      { id: "c1-c4-t1", name: "লা শাতেলিয়ার নীতি (তাপমাত্রা, চাপ ও ঘনমাত্রার প্রভাব)", importance: "high" },
      { id: "c1-c4-t2", name: "ভরক্রিয়া সূত্র ও সাম্যধ্রুবক (Kp ও Kc) এর রাশিমালা", importance: "high" },
      { id: "c1-c4-t3", name: "Kp ও Kc এর সম্পর্ক ও গাণিতিক সমস্যা", importance: "high" },
      { id: "c1-c4-t4", name: "পানির আয়নিক গুণফল (Kw) ও pH স্কেল", importance: "high" },
      { id: "c1-c4-t5", name: "বাফার দ্রবণ ও রক্তের বাফার ক্রিয়া কৌশল", importance: "high" },
      { id: "c1-c4-t6", name: "হেন্ডারসন-হ্যাসেলবাক সমীকরণ ও pH গণনা", importance: "high" },
      { id: "c1-c4-t7", name: "বিক্রিয়ার হার, সক্রিয়ণ শক্তি ও আরহেনিয়াস সমীকরণ", importance: "high" },
      { id: "c1-c4-t8", name: "হেসের তাপসমষ্টির নিত্যতা সূত্র ও বন্ধন শক্তি", importance: "high" }
    ]
  },
  {
    id: "c1-c5",
    number: 5,
    name: "কর্মমুখী রসায়ন",
    englishName: "Applied Chemistry",
    codeName: "কর্মমুখী রসায়ন",
    description: "খাদ্য সংরক্ষণ, প্রিজারভেটিভস, ভিনেগার, প্রসাধন ও সাবান",
    territoryPath: chem1Layout[4].path,
    labelCoord: chem1Layout[4].center,
    topics: [
      { id: "c1-c5-t1", name: "খাদ্য নষ্টের কারণ ও খাদ্য সংরক্ষণ কৌশল", importance: "medium" },
      { id: "c1-c5-t2", name: "প্রাকৃতিক ও কৃত্রিম খাদ্য প্রিজারভেটিভস", importance: "high" },
      { id: "c1-c5-t3", name: "ভিনেগার প্রস্তুত প্রণালী ও খাদ্য সংরক্ষণে ভিনেগারের ভূমিকা", importance: "high" },
      { id: "c1-c5-t4", name: "টয়লেট্রিজ ও প্রসাধন সামগ্রী (ট্যালকম পাউডার, কোল্ড ক্রিম)", importance: "medium" },
      { id: "c1-c5-t5", name: "সাবান ও ডিটারজেন্টের গঠন ও পরিচ্ছন্নকরণ কৌশল", importance: "high" },
      { id: "c1-c5-t6", name: "কাচ পরিষ্কারক ও টয়লেট ক্লিনার প্রস্তুতি", importance: "medium" }
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
    description: "বায়ুমণ্ডল, গ্যাসের সূত্র, ডাল্টনের সূত্র, গ্রাহামের সূত্র ও দূষণ",
    territoryPath: chem2Layout[0].path,
    labelCoord: chem2Layout[0].center,
    topics: [
      { id: "c2-c1-t1", name: "বায়ুমণ্ডলের স্তরবিন্যাস ও গঠন", importance: "medium" },
      { id: "c2-c1-t2", name: "গ্যাসের সূত্রসমূহ (বয়েল, চার্লস ও অ্যাভোগাড্রো)", importance: "high" },
      { id: "c2-c1-t3", name: "ডাল্টনের আংশিক চাপ সূত্র ও গাণিতিক সমস্যা", importance: "high" },
      { id: "c2-c1-t4", name: "গ্রাহামের গ্যাস ব্যাপন সূত্র ও আণবিক ভর নির্ণয়", importance: "high" },
      { id: "c2-c1-t5", name: "আদর্শ ও বাস্তব গ্যাস (ভ্যান ডার ওয়ালস সমীকরণ)", importance: "high" },
      { id: "c2-c1-t6", name: "গ্রিনহাউস গ্যাস, বৈশ্বিক উষ্ণায়ন ও অ্যাসিড বৃষ্টি", importance: "high" },
      { id: "c2-c1-t7", name: "সিএফসি (CFC) ও ওজোন স্তরের ক্ষয়কৌশল", importance: "high" },
      { id: "c2-c1-t8", name: "পানির বিশুদ্ধতার মানদণ্ড (DO, BOD, COD, TDS)", importance: "high" },
      { id: "c2-c1-t9", name: "আর্সেনিক ও ভারী ধাতু দূষণ (Pb, Cd, Cr, Hg)", importance: "high" },
      { id: "c2-c1-t10", name: "লুইস ও ব্রনস্টেড-লাউরি অ্যাসিড-ক্ষার মতবাদ", importance: "high" }
    ]
  },
  {
    id: "c2-c2",
    number: 2,
    name: "জৈব রসায়ন",
    englishName: "Organic Chemistry",
    codeName: "জৈব রসায়ন",
    description: "নামকরণ, সমাণুতা, হাইড্রোকার্বন, বেনজিন, অ্যালকাইল হ্যালাইড ও পলিমার",
    territoryPath: chem2Layout[1].path,
    labelCoord: chem2Layout[1].center,
    topics: [
      { id: "c2-c2-t1", name: "জৈব যৌগের শ্রেণিবিভাগ ও কার্যকরী মূলক", importance: "high" },
      { id: "c2-c2-t2", name: "জৈব যৌগের IUPAC নামকরণ পদ্ধতি", importance: "high" },
      { id: "c2-c2-t3", name: "গাঠনিক সমাণুতা (চেইন, অবস্থান, কার্যকরী মূলক, মেটামারিজম, টটোমারিজম)", importance: "high" },
      { id: "c2-c2-t4", name: "জ্যামিতিক ও আলোক সমাণুতা (Chiral Carbon & Enantiomer)", importance: "high" },
      { id: "c2-c2-t5", name: "মুক্ত মূলক, কার্বোক্যাটায়ন ও কার্বঅ্যানায়নের স্থায়িত্ব", importance: "high" },
      { id: "c2-c2-t6", name: "অ্যালকেন, অ্যালকিন ও অ্যালকাইন প্রস্তুতি ও বিক্রিয়া", importance: "high" },
      { id: "c2-c2-t7", name: "মারকনিকভ ও বিপরীত মারকনিকভ নিয়ম", importance: "high" },
      { id: "c2-c2-t8", name: "হাকেল নিয়ম ও অ্যারোমেটিসিটি", importance: "high" },
      { id: "c2-c2-t9", name: "বেনজিনের ইলেকট্রনাকর্ষী প্রতিস্থাপন (নাইট্রেশন, হ্যালোজেনেশন, ফ্রিডেল-ক্রাফটস)", importance: "high" },
      { id: "c2-c2-t10", name: "অর্থো-প্যারা ও মেটা নির্দেশক গ্রুপ", importance: "high" },
      { id: "c2-c2-t11", name: "অ্যালকাইল হ্যালাইড ও নিউক্লিওফিলিক প্রতিস্থাপন (SN1 ও SN2 কৌশল)", importance: "high" },
      { id: "c2-c2-t12", name: "অ্যালকোহল ও ফেনলের অম্লধর্মিতা ও শনাক্তকরণ", importance: "high" },
      { id: "c2-c2-t13", name: "অ্যালডিহাইড ও কিটোনের নিউক্লিওফিলিক যুত বিক্রিয়া", importance: "high" },
      { id: "c2-c2-t14", name: "ক্যানিজারো বিক্রিয়া ও অ্যালডল ঘনীভবন", importance: "high" },
      { id: "c2-c2-t15", name: "টলেন বিকারক ও ফেহলিং দ্রবণ পরীক্ষা", importance: "high" },
      { id: "c2-c2-t16", name: "কার্বক্সিলিক অ্যাসিড ও জাতকসমূহ", importance: "high" },
      { id: "c2-c2-t17", name: "অ্যামিন শ্রেণিবিভাগ, কার্বিলঅ্যামিন পরীক্ষা ও ডায়াজোনিয়াম লবণ", importance: "high" },
      { id: "c2-c2-t18", name: "পলিমার ও পলিমারাকরণ বিক্রিয়া", importance: "high" }
    ]
  },
  {
    id: "c2-c3",
    number: 3,
    name: "পরিমাণগত রসায়ন",
    englishName: "Quantitative Chemistry",
    codeName: "পরিমাণগত রসায়ন",
    description: "মোলারিটি, টাইট্রেশন, জারণ-বিজারণ সমতাকরণ ও বিয়ার-ল্যাম্বার্ট সূত্র",
    territoryPath: chem2Layout[2].path,
    labelCoord: chem2Layout[2].center,
    topics: [
      { id: "c2-c3-t1", name: "মোলার দ্রবণ ও ঘনমাত্রার একক (Molarity, Molality, ppm, %)", importance: "high" },
      { id: "c2-c3-t2", name: "স্টয়কিওমিতি ও লিমিটিং বিক্রিয়ক গণনা", importance: "high" },
      { id: "c2-c3-t3", name: "অ্যাসিড-ক্ষার টাইট্রেশন ও নির্দেশক নির্বাচন", importance: "high" },
      { id: "c2-c3-t4", name: "জারণ সংখ্যা নির্ণয় ও জারণ-বিজারণের আধুনিক ধারণা", importance: "high" },
      { id: "c2-c3-t5", name: "আয়ন-ইলেকট্রন পদ্ধতিতে জারণ-বিজারণ সমীকরণ সমতাকরণ", importance: "high" },
      { id: "c2-c3-t6", name: "পারম্যাঙ্গানোমিতি ও ডাইক্রোমোমিতি টাইট্রেশন", importance: "high" },
      { id: "c2-c3-t7", name: "আয়োডিমিতি ও আয়োডোমিতি টাইট্রেশন", importance: "high" },
      { id: "c2-c3-t8", name: "বিয়ার-ল্যাম্বার্ট সূত্র ও স্পেকট্রোফোটোমেট্রি", importance: "high" }
    ]
  },
  {
    id: "c2-c4",
    number: 4,
    name: "তড়িৎ রসায়ন",
    englishName: "Electrochemistry",
    codeName: "তড়িৎ রসায়ন",
    description: "ফ্যারাডের সূত্র, গ্যালভানিক কোষ, নার্নস্ট সমীকরণ ও ব্যাটারি",
    territoryPath: chem2Layout[3].path,
    labelCoord: chem2Layout[3].center,
    topics: [
      { id: "c2-c4-t1", name: "ফ্যারাডের তড়িৎ বিশ্লেষণের সূত্রাবলী ও গানিতিক সমস্যা", importance: "high" },
      { id: "c2-c4-t2", name: "তড়িৎ রাসায়নিক কোষ (গ্যালভানিক / ড্যানিয়েল কোষ) গঠন", importance: "high" },
      { id: "c2-c4-t3", name: "প্রমাণ হাইড্রোজেন তড়িৎদ্বার ও তড়িৎদ্বার বিভব", importance: "high" },
      { id: "c2-c4-t4", name: "তড়িৎ রাসায়নিক সক্রিয়তা সারি ও বিক্রিয়ার সম্ভাব্যতা", importance: "high" },
      { id: "c2-c4-t5", name: "নার্নস্ট সমীকরণ (Nernst Equation) ও কোষের EMF নির্ণয়", importance: "high" },
      { id: "c2-c4-t6", name: "লেড-অ্যাসিড সঞ্চয়ী ব্যাটারি ও রিচার্জিং কৌশল", importance: "high" },
      { id: "c2-c4-t7", name: "লিথিয়াম-আয়ন ব্যাটারি ও হাইড্রোজেন ফুয়েল সেল", importance: "high" },
      { id: "c2-c4-t8", name: "ধাতুর ক্ষয়রোধ ও গ্যালভানাইজিং", importance: "medium" }
    ]
  },
  {
    id: "c2-c5",
    number: 5,
    name: "অর্থনৈতিক রসায়ন",
    englishName: "Economic Chemistry",
    codeName: "অর্থনৈতিক রসায়ন",
    description: "ইউরিয়া সার, সিমেন্ট, কাচ, কাগজ, চামড়া ট্যানিং ও ইটিপি",
    territoryPath: chem2Layout[4].path,
    labelCoord: chem2Layout[4].center,
    topics: [
      { id: "c2-c5-t1", name: "প্রাকৃতিক গ্যাস ও কয়লার উপাদান এবং প্রক্রিয়াকরণ", importance: "medium" },
      { id: "c2-c5-t2", name: "ইউরিয়া সার উৎপাদনের মূলনীতি ও কারখানা প্রণালী", importance: "high" },
      { id: "c2-c5-t3", name: "পোর্টল্যান্ড সিমেন্ট তৈরির কাঁচামাল ও ক্লিঙ্কার রসায়ন", importance: "high" },
      { id: "c2-c5-t4", name: "কাচ তৈরির কাঁচামাল ও উৎপাদন পদ্ধতি", importance: "medium" },
      { id: "c2-c5-t5", name: "পাল্প ও কাগজ তৈরির রসায়ন (ক্রাফট প্রক্রিয়া)", importance: "high" },
      { id: "c2-c5-t6", name: "চামড়া প্রক্রিয়াকরণ (ট্যানিং) ও ক্রোম ট্যানিং", importance: "high" },
      { id: "c2-c5-t7", name: "শিল্প বর্জ্য ব্যবস্থাপনা ও ইটিপি (ETP) ব্যবস্থা", importance: "high" },
      { id: "c2-c5-t8", name: "ন্যানো প্রযুক্তি ও ন্যানো কণার ব্যবহার", importance: "medium" }
    ]
  }
];

const math1Layout = generateContiguousLayout(10);
const MATH_1_CHAPTERS: Chapter[] = [
  {
    id: "m1-c1",
    number: 1,
    name: "ম্যাট্রিক্স ও নির্ণায়ক",
    englishName: "Matrices & Determinants",
    codeName: "ম্যাট্রিক্স-নির্ণায়ক",
    description: "ম্যাট্রিক্সের গুণ, বিপরীত ম্যাট্রিক্স ও ক্র্যামারের নিয়ম",
    territoryPath: math1Layout[0].path,
    labelCoord: math1Layout[0].center,
    topics: [
      { id: "m1-c1-t1", name: "ম্যাট্রিক্সের প্রকারভেদ ও ট্রেস নির্ণয়", importance: "medium" },
      { id: "m1-c1-t2", name: "ম্যাট্রিক্সের যোগ, বিয়োগ ও স্কেলার গুণ", importance: "medium" },
      { id: "m1-c1-t3", name: "ম্যাট্রিক্সের গুণন ও শর্তাবলী", importance: "high" },
      { id: "m1-c1-t4", name: "নির্ণায়কের মান ও ধর্মাবলী প্রয়োগ", importance: "high" },
      { id: "m1-c1-t5", name: "অনুরাশি, সহগুণক ও সংলগ্ন (Adjoint) ম্যাট্রিক্স", importance: "high" },
      { id: "m1-c1-t6", name: "ব্যতিক্রমী ম্যাট্রিক্স ও বিপরীত ম্যাট্রিক্স (Inverse Matrix) নির্ণয়", importance: "high" },
      { id: "m1-c1-t7", name: "ক্র্যামারের নিয়মে (Cramer's Rule) সমীকরণ জোট সমাধান", importance: "high" }
    ]
  },
  {
    id: "m1-c2",
    number: 2,
    name: "ভেক্টর",
    englishName: "Vectors",
    codeName: "ভেক্টর",
    description: "একক ভেক্টর, ডট ও ক্রস গুণন, ক্ষেত্রফল ও ত্রিক গুণন",
    territoryPath: math1Layout[1].path,
    labelCoord: math1Layout[1].center,
    topics: [
      { id: "m1-c2-t1", name: "সমতলীয় ও ত্রিমাত্রিক ভেক্টর ও একক ভেক্টর", importance: "medium" },
      { id: "m1-c2-t2", name: "ভেক্টরের স্কেলার গুণন (ডট গুণন) ও কোণ নির্ণয়", importance: "high" },
      { id: "m1-c2-t3", name: "ভেক্টরের ভেক্টর গুণন (ক্রস গুণন) ও লম্ব একক ভেক্টর", importance: "high" },
      { id: "m1-c2-t4", name: "ত্রিভুজ ও সামান্তরিকের ক্ষেত্রফল নির্ণয়", importance: "high" },
      { id: "m1-c2-t5", name: "তিনটি ভেক্টরের স্কেলার ত্রিক গুণন ও এক-সমতলীয় শর্ত", importance: "high" }
    ]
  },
  {
    id: "m1-c3",
    number: 3,
    name: "সরলরেখা",
    englishName: "Straight Lines",
    codeName: "সরলরেখা",
    description: "স্থানাঙ্ক রূপান্তর, বিভক্তিকরণ, ঢাল, সমীকরণ ও লম্ব দূরত্ব",
    territoryPath: math1Layout[2].path,
    labelCoord: math1Layout[2].center,
    topics: [
      { id: "m1-c3-t1", name: "কার্তেসীয় ও পোলার স্থানাঙ্ক রূপান্তর", importance: "high" },
      { id: "m1-c3-t2", name: "দুই বিন্দুর দূরত্ব ও অন্তর্বিভক্ত-বহির্বিভক্ত সূত্র", importance: "high" },
      { id: "m1-c3-t3", name: "ত্রিভুজের ক্ষেত্রফল ও ভরকেন্দ্র নির্ণয়", importance: "high" },
      { id: "m1-c3-t4", name: "সরলরেখার ঢাল ও বিভিন্ন আকারের সমীকরণ", importance: "high" },
      { id: "m1-c3-t5", name: "দুটি সরলরেখার ছেদবিন্দু ও মধ্যবর্তী কোণ", importance: "high" },
      { id: "m1-c3-t6", name: "সমান্তরাল ও লম্ব সরলরেখার সমীকরণ", importance: "high" },
      { id: "m1-c3-t7", name: "বিন্দু হতে সরলরেখার লম্ব দূরত্ব ও সমান্তরাল রেখার দূরত্ব", importance: "high" },
      { id: "m1-c3-t8", name: "কোণের সমদ্বিখণ্ডকের সমীকরণ", importance: "high" }
    ]
  },
  {
    id: "m1-c4",
    number: 4,
    name: "বৃত্ত",
    englishName: "Circles",
    codeName: "বৃত্ত",
    description: "বৃত্তের সমীকরণ, স্পর্শক, অভিলম্ব ও সাধারণ জ্যা",
    territoryPath: math1Layout[3].path,
    labelCoord: math1Layout[3].center,
    topics: [
      { id: "m1-c4-t1", name: "বৃত্তের প্রমাণ সমীকরণ, কেন্দ্র ও ব্যাসার্ধ", importance: "high" },
      { id: "m1-c4-t2", name: "বৃত্তের সাধারণ সমীকরণ ও অক্ষদ্বয়ের খণ্ডিতাংশ", importance: "high" },
      { id: "m1-c4-t3", name: "নির্দিষ্ট বিন্দুগামী ও নির্দিষ্ট শর্তাধীনে বৃত্তের সমীকরণ", importance: "high" },
      { id: "m1-c4-t4", name: "বৃত্তের স্পর্শক হওয়ার শর্ত ও স্পর্শকের সমীকরণ", importance: "high" },
      { id: "m1-c4-t5", name: "স্পর্শকের দৈর্ঘ্য ও স্পর্শ জ্যা এর সমীকরণ", importance: "high" },
      { id: "m1-c4-t6", name: "দুটি বৃত্তের সাধারণ জ্যা ও স্পর্শ বিন্দু", importance: "high" }
    ]
  },
  {
    id: "m1-c5",
    number: 5,
    name: "বিন্যাস ও সমাবেশ",
    englishName: "Permutations & Combinations",
    codeName: "বিন্যাস-সমাবেশ",
    description: "গণনার নীতি, ফ্যাক্টোরিয়াল, শব্দ গঠন ও দল নির্বাচন",
    territoryPath: math1Layout[4].path,
    labelCoord: math1Layout[4].center,
    topics: [
      { id: "m1-c5-t1", name: "গণনার মৌলিক নীতি ও ফ্যাক্টোরিয়াল ধারণা", importance: "medium" },
      { id: "m1-c5-t2", name: "ভিন্ন ভিন্ন ও একজাতীয় বস্তুর বিন্যাস (nPr)", importance: "high" },
      { id: "m1-c5-t3", name: "শর্তাধীন বিন্যাস (পাশাপাশি রাখা ও না রাখা)", importance: "high" },
      { id: "m1-c5-t4", name: "চক্রবিন্যাস ও পুনরাবৃত্তিমূলক বিন্যাস", importance: "high" },
      { id: "m1-c5-t5", name: "সমাবেশের মৌলিক ধারণা ও nCr সূত্রাবলী", importance: "high" },
      { id: "m1-c5-t6", name: "দল গঠন ও কমিটি নির্বাচন সংক্রান্ত সমস্যা", importance: "high" },
      { id: "m1-c5-t7", name: "জ্যামিতিক সমাবেশ (ত্রিভুজ, কর্ণ ও সরলরেখা সংখ্যা)", importance: "high" }
    ]
  },
  {
    id: "m1-c6",
    number: 6,
    name: "ত্রিকোণমিতিক অনুপাত",
    englishName: "Trigonometric Ratios",
    codeName: "ত্রিকোণমিতি ১",
    description: "কোণ পরিমাপ, চতুর্ভাগ ও মৌলিক অনুপাত",
    territoryPath: math1Layout[5].path,
    labelCoord: math1Layout[5].center,
    topics: [
      { id: "m1-c6-t1", name: "ডিগ্রি ও রেডিয়ান কোণ পরিমাপের সম্পর্ক", importance: "medium" },
      { id: "m1-c6-t2", name: "চতুর্ভাগ ও চিহ্নের নিয়ম (All sin tan cos)", importance: "high" },
      { id: "m1-c6-t3", name: "সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত (n.90° ± θ)", importance: "high" },
      { id: "m1-c6-t4", name: "মৌলিক ত্রিকোণমিতিক অভেদাবলী ও প্রমাণ", importance: "high" }
    ]
  },
  {
    id: "m1-c7",
    number: 7,
    name: "সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত",
    englishName: "Trigonometric Ratios of Associated Angles",
    codeName: "ত্রিকোণমিতি ২",
    description: "যৌগিক কোণ, গুণিতক কোণ ও ত্রিভুজের ধর্ম",
    territoryPath: math1Layout[6].path,
    labelCoord: math1Layout[6].center,
    topics: [
      { id: "m1-c7-t1", name: "যৌগিক কোণের ত্রিকোণমিতিক অনুপাত [sin(A±B), cos(A±B), tan(A±B)]", importance: "high" },
      { id: "m1-c7-t2", name: "যোগফল ও গুণফলের রূপান্তর সূত্রাবলী", importance: "high" },
      { id: "m1-c7-t3", name: "গুণিতক কোণের ত্রিকোণমিতিক অনুপাত (2A, 3A)", importance: "high" },
      { id: "m1-c7-t4", name: "উপগুণিতক কোণের ত্রিকোণমিতিক অনুপাত (A/2)", importance: "high" },
      { id: "m1-c7-t5", name: "ত্রিভুজের গুণাবলী: সাইন সূত্র ও কোসাইন সূত্র", importance: "high" },
      { id: "m1-c7-t6", name: "ত্রিভুজের ক্ষেত্রফল ও অর্ধকোণের সূত্রাবলী", importance: "high" }
    ]
  },
  {
    id: "m1-c8",
    number: 8,
    name: "ফাংশন ও ফাংশনের লেখচিত্র",
    englishName: "Functions & Graphs",
    codeName: "ফাংশন",
    description: "ডোমেন, রেঞ্জ, এক-এক, বিপরীত ফাংশন ও লেখচিত্র",
    territoryPath: math1Layout[7].path,
    labelCoord: math1Layout[7].center,
    topics: [
      { id: "m1-c8-t1", name: "ফাংশনের সংজ্ঞা, ডোমেন, কোডোমেন ও রেঞ্জ নির্ণয়", importance: "high" },
      { id: "m1-c8-t2", name: "এক-এক ফাংশন ও সার্বিক (Onto) ফাংশন প্রমাণ", importance: "high" },
      { id: "m1-c8-t3", name: "সংযোজিত ফাংশন (Composite Function - fog, gof)", importance: "high" },
      { id: "m1-c8-t4", name: "বিপরীত ফাংশন (Inverse Function) নির্ণয়", importance: "high" },
      { id: "m1-c8-t5", name: "পরমমান ফাংশন ও খণ্ডায়িত ফাংশন", importance: "medium" },
      { id: "m1-c8-t6", name: "দ্বিঘাত ও ত্রিকোণমিতিক ফাংশনের লেখচিত্র", importance: "medium" }
    ]
  },
  {
    id: "m1-c9",
    number: 9,
    name: "অন্তরীকরণ",
    englishName: "Differentiation / Calculus",
    codeName: "অন্তরীকরণ",
    description: "লিমিট, মূল নিয়মে অন্তরজ, চেইন রুল, স্পর্শক ও চরম মান",
    territoryPath: math1Layout[8].path,
    labelCoord: math1Layout[8].center,
    topics: [
      { id: "m1-c9-t1", name: "লিমিট (Limits) এর মৌলিক ধর্ম ও এল-হসপিটাল নিয়ম", importance: "high" },
      { id: "m1-c9-t2", name: "মূল নিয়মে বিভিন্ন ফাংশনের অন্তরজ নির্ণয়", importance: "high" },
      { id: "m1-c9-t3", name: "গুণ ও ভাগ নিয়মে অন্তরীকরণ (Product & Quotient Rule)", importance: "high" },
      { id: "m1-c9-t4", name: "চেইন রুল ও বিপরীত ত্রিকোণমিতিক ফাংশনের অন্তরজ", importance: "high" },
      { id: "m1-c9-t5", name: "অব্যক্ত ও পরামিতিক সমীকরণের অন্তরীকরণ", importance: "high" },
      { id: "m1-c9-t6", name: "পর্যায়ক্রমিক অন্তরীকরণ (Successive Differentiation)", importance: "high" },
      { id: "m1-c9-t7", name: "স্পর্শক ও অভিলম্বের সমীকরণ নির্ণয়", importance: "high" },
      { id: "m1-c9-t8", name: "ফাংশনের চরম মান: গুরুমান ও লঘুমান (Maxima & Minima)", importance: "high" }
    ]
  },
  {
    id: "m1-c10",
    number: 10,
    name: "যোগজীকরণ",
    englishName: "Integration / Calculus",
    codeName: "যোগজীকরণ",
    description: "অনির্দিষ্ট যোগজ, প্রতিস্থাপন, আংশিক ভগ্নাংশ, নির্দিষ্ট যোগজ ও ক্ষেত্রফল",
    territoryPath: math1Layout[9].path,
    labelCoord: math1Layout[9].center,
    topics: [
      { id: "m1-c10-t1", name: "অনির্দিষ্ট যোগজের মৌলিক সূত্র ও প্রমাণ", importance: "high" },
      { id: "m1-c10-t2", name: "প্রতিস্থাপন পদ্ধতি (Method of Substitution)", importance: "high" },
      { id: "m1-c10-t3", name: "আংশিক ভগ্নাংশের সাহায্যে যোগজীকরণ", importance: "high" },
      { id: "m1-c10-t4", name: "অংশে অংশে যোগজীকরণ (Integration by Parts - LIATE)", importance: "high" },
      { id: "m1-c10-t5", name: "নির্দিষ্ট যোগজ (Definite Integral) ও ধর্মাবলী", importance: "high" },
      { id: "m1-c10-t6", name: "নির্দিষ্ট যোগজের সাহায্যে বক্ররেখা দ্বারা আবদ্ধ ক্ষেত্রের ক্ষেত্রফল নির্ণয়", importance: "high" }
    ]
  }
];

const math2Layout = generateContiguousLayout(10);
const MATH_2_CHAPTERS: Chapter[] = [
  {
    id: "m2-c1",
    number: 1,
    name: "বাস্তব সংখ্যা ও অসমতা",
    englishName: "Real Numbers & Inequalities",
    codeName: "বাস্তব সংখ্যা",
    description: "পরমমান, অসমতার সমাধান ও সুপ্রিমাম-ইনফিমাম",
    territoryPath: math2Layout[0].path,
    labelCoord: math2Layout[0].center,
    topics: [
      { id: "m2-c1-t1", name: "বাস্তব সংখ্যার স্বীকার্য ও পরমমানের ধর্মাবলী", importance: "medium" },
      { id: "m2-c1-t2", name: "পরমমান সম্বলিত অসমতার সমাধান ও সংখ্যারেখায় প্রকাশ", importance: "high" },
      { id: "m2-c1-t3", name: "ভগ্নাংশ ও দ্বিঘাত অসমতার সমাধান", importance: "high" },
      { id: "m2-c1-t4", name: "সুপ্রিমাম (লঘিষ্ঠ ঊর্ধ্বসীমা) ও ইনফিমাম (গরিষ্ঠ নিম্নসীমা)", importance: "high" }
    ]
  },
  {
    id: "m2-c2",
    number: 2,
    name: "যোগাশ্রয়ী প্রোগ্রাম",
    englishName: "Linear Programming",
    codeName: "যোগাশ্রয়ী প্রোগ্রাম",
    description: "সীResource limitations, গ্রাফ অঙ্কন, অনুকূল অঞ্চল ও সমাধান",
    territoryPath: math2Layout[1].path,
    labelCoord: math2Layout[1].center,
    topics: [
      { id: "m2-c2-t1", name: "যোগাশ্রয়ী প্রোগ্রামের গঠন ও উদ্দেশ্যমূলক ফাংশন (Z)", importance: "high" },
      { id: "m2-c2-t2", name: "অসমতার লেখচিত্র অঙ্কন ও সম্ভাব্য সমাধান অঞ্চল (Feasible Region)", importance: "high" },
      { id: "m2-c2-t3", name: "প্রান্তিক বিন্দু পদ্ধতিতে সর্বোচ্চ ও সর্বনিম্ন মান নির্ণয়", importance: "high" }
    ]
  },
  {
    id: "m2-c3",
    number: 3,
    name: "জটিল সংখ্যা",
    englishName: "Complex Numbers",
    codeName: "জটিল সংখ্যা",
    description: "মডুলাস, আর্গুমেন্ট, এককের ঘনমূল, বর্গমূল ও সঞ্চারপথ",
    territoryPath: math2Layout[2].path,
    labelCoord: math2Layout[2].center,
    topics: [
      { id: "m2-c3-t1", name: "জটিল সংখ্যার বাস্তব ও কাল্পনিক অংশ, অনুবন্ধী সংখ্যা", importance: "medium" },
      { id: "m2-c3-t2", name: "আর্গ্যান্ড চিত্র ও মডুলাস-আর্গুমেন্ট (মুখ্য মান) নির্ণয়", importance: "high" },
      { id: "m2-c3-t3", name: "জটিল সংখ্যার পোলার ও অয়লার আকার (Euler form)", importance: "high" },
      { id: "m2-c3-t4", name: "এককের কাল্পনিক ঘনমূল (ω) ও এর ধর্মাবলী", importance: "high" },
      { id: "m2-c3-t5", name: "জটিল সংখ্যার বর্গমূল, ঘনমূল ও চতুর্মূল নির্ণয়", importance: "high" },
      { id: "m2-c3-t6", name: "জটিল সংখ্যার সঞ্চারপথ (Locus Equations)", importance: "high" }
    ]
  },
  {
    id: "m2-c4",
    number: 4,
    name: "বহুপদী ও বহুপদী সমীকরণ",
    englishName: "Polynomials & Polynomial Equations",
    codeName: "বহুপদী",
    description: "দ্বিঘাত সমীকরণ, নিশ্চয়ক, মূল ও সহগের সম্পর্ক, ত্রিঘাত সমীকরণ",
    territoryPath: math2Layout[3].path,
    labelCoord: math2Layout[3].center,
    topics: [
      { id: "m2-c4-t1", name: "দ্বিঘাত সমীকরণের মূলের প্রকৃতি ও নিশ্চয়ক (Discriminant)", importance: "high" },
      { id: "m2-c4-t2", name: "মূল ও সহগের সম্পর্ক সংক্রান্ত গাণিতিক সমস্যা", importance: "high" },
      { id: "m2-c4-t3", name: "নির্দিষ্ট মূলবিশিষ্ট নতুন দ্বিঘাত সমীকরণ গঠন", importance: "high" },
      { id: "m2-c4-t4", name: "সাধারণ মূল থাকার শর্ত ও প্রতিসম মূল", importance: "high" },
      { id: "m2-c4-t5", name: "ত্রিঘাত ও চতুর্ঘাত সমীকরণের মূল ও সহগের সম্পর্ক", importance: "high" },
      { id: "m2-c4-t6", name: "বহুপদী উৎপাদক উপপাদ্য ও ভাগশেষ উপপাদ্য", importance: "medium" }
    ]
  },
  {
    id: "m2-c5",
    number: 5,
    name: "দ্বিপদী বিস্তার",
    englishName: "Binomial Expansion",
    codeName: "দ্বিপদী বিস্তার",
    description: "দ্বিপদী উপপাদ্য, সাধারণ পদ, মধ্যপদ ও ঋণাত্মক ঘাত",
    territoryPath: math2Layout[4].path,
    labelCoord: math2Layout[4].center,
    topics: [
      { id: "m2-c5-t1", name: "প্যাসকেলের ত্রিভুজ ও দ্বিপদী সহগ", importance: "medium" },
      { id: "m2-c5-t2", name: "ধনাত্মক পূর্ণসংখ্যা ঘাতের জন্য দ্বিপদী উপপাদ্য", importance: "high" },
      { id: "m2-c5-t3", name: "সাধারণ পদ (Tr+1) ও মধ্যপদ নির্ণয়", importance: "high" },
      { id: "m2-c5-t4", name: "x-বর্জিত বা ধ্রুব পদ ও নির্দিষ্ট ঘাতের সহগ নির্ণয়", importance: "high" },
      { id: "m2-c5-t5", name: "ঋণাত্মক ও ভগ্নাংশ ঘাতের দ্বিপদী বিস্তার ও আসন্ন মান", importance: "high" }
    ]
  },
  {
    id: "m2-c6",
    number: 6,
    name: "কণিক",
    englishName: "Conics",
    codeName: "কণিক",
    description: "পরাবৃত্ত, উপবৃত্ত ও অধিবৃত্তের সমীকরণ ও বৈশিষ্ট্য",
    territoryPath: math2Layout[5].path,
    labelCoord: math2Layout[5].center,
    topics: [
      { id: "m2-c6-t1", name: "কণিকের সাধারণ সমীকরণ ও উৎকেন্দ্রিকতা (e)", importance: "high" },
      { id: "m2-c6-t2", name: "পরাবৃত্তের (Parabola) প্রমাণ সমীকরণ, উপকেন্দ্র, শীর্ষ ও নিয়ামক রেখা", importance: "high" },
      { id: "m2-c6-t3", name: "উপবৃত্তের (Ellipse) প্রমাণ সমীকরণ, অক্ষদ্বয়, উপকেন্দ্র ও দ্বিকাক্ষ", importance: "high" },
      { id: "m2-c6-t4", name: "অধিবৃত্তের (Hyperbola) প্রমাণ সমীকরণ, অসীমমুখী রেখা ও স্পর্শক", importance: "high" },
      { id: "m2-c6-t5", name: "প্রদত্ত শর্তাধীনে পরাবৃত্ত, উপবৃত্ত ও অধিবৃত্তের সমীকরণ গঠন", importance: "high" },
      { id: "m2-c6-t6", name: "কণিকের স্পর্শক হওয়ার শর্ত ও স্পর্শকের সমীকরণ", importance: "high" }
    ]
  },
  {
    id: "m2-c7",
    number: 7,
    name: "বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ",
    englishName: "Inverse Trig Functions & Trig Equations",
    codeName: "বিপরীত ত্রিকোণমিতি",
    description: "মুখ্য মান, বিপরীত অভেদ ও ত্রিকোণমিতিক সমীকরণ সমাধান",
    territoryPath: math2Layout[6].path,
    labelCoord: math2Layout[6].center,
    topics: [
      { id: "m2-c7-t1", name: "বিপরীত ত্রিকোণমিতিক ফাংশনের ডোমেন, রেঞ্জ ও মুখ্য মান", importance: "high" },
      { id: "m2-c7-t2", name: "বিপরীত ত্রিকোণমিতিক অভেদাবলী ও প্রমাণ [sin⁻¹x, cos⁻¹x, tan⁻¹x]", importance: "high" },
      { id: "m2-c7-t3", name: "2tan⁻¹x রূপান্তরের সূত্রাবলী ও প্রয়োগ", importance: "high" },
      { id: "m2-c7-t4", name: "সাধারণ কোণের ত্রিকোণমিতিক সমীকরণের সমাধান", importance: "high" },
      { id: "m2-c7-t5", name: "নির্দিষ্ট ব্যবধিতে [0, 2π] ত্রিকোণমিতিক সমীকরণের সমাধান", importance: "high" }
    ]
  },
  {
    id: "m2-c8",
    number: 8,
    name: "স্থিতিবিদ্যা",
    englishName: "Statics",
    codeName: "স্থিতিবিদ্যা",
    description: "বলের সামান্তরিক সূত্র, লামির সূত্র, সমান্তরাল বল ও যুগল",
    territoryPath: math2Layout[7].path,
    labelCoord: math2Layout[7].center,
    topics: [
      { id: "m2-c8-t1", name: "বলের সামান্তরিক সূত্র ও লব্ধির মান-দিক নির্ণয়", importance: "high" },
      { id: "m2-c8-t2", name: "লম্বাংশ উপপাদ্য (Theorem of Resolved Parts)", importance: "high" },
      { id: "m2-c8-t3", name: "তিন বলের সাম্যাবস্থা ও লামির সূত্র (Lami's Theorem)", importance: "high" },
      { id: "m2-c8-t4", name: "বল ত্রিভুজ সূত্র ও বল বহুভুজ সূত্র", importance: "high" },
      { id: "m2-c8-t5", name: "সদৃশ ও অসদৃশ সমান্তরাল বল এবং লব্ধির বিন্দু", importance: "high" },
      { id: "m2-c8-t6", name: "বলের ভ্রামক, কাপল/যুগল (Couple) ও সাম্যাবস্থা", importance: "high" }
    ]
  },
  {
    id: "m2-c9",
    number: 9,
    name: "সমতলে বস্তুকণার গতি",
    englishName: "Dynamics / Particle Motion",
    codeName: "কণার গতি",
    description: "উল্লম্ব গতি, আপেক্ষিক বেগ, প্রাসের গতি ও সংঘর্ষ",
    territoryPath: math2Layout[8].path,
    labelCoord: math2Layout[8].center,
    topics: [
      { id: "m2-c9-t1", name: "সরলরেখায় সমত্বরণে ও পরিবর্তনশীল ত্বরণে গতি", importance: "high" },
      { id: "m2-c9-t2", name: "মহাকর্ষের অধীনে উল্লম্ব তলে নিক্ষিপ্ত বস্তুর গতি", importance: "high" },
      { id: "m2-c9-t3", name: "আপেক্ষিক বেগ ও বৃষ্টির ছাতা সংক্রান্ত সমস্যা", importance: "high" },
      { id: "m2-c9-t4", name: "প্রাসের গতির সমীকরণ ও ট্র্যাজেক্টরি বিশ্লেষণ", importance: "high" },
      { id: "m2-c9-t5", name: "আনত তলে বস্তুর গতি", importance: "high" },
      { id: "m2-c9-t6", name: "ভরবেগের সংরক্ষণ ও এক-মাত্রিক স্থিতিস্থাপক সংঘর্ষ", importance: "high" }
    ]
  },
  {
    id: "m2-c10",
    number: 10,
    name: "সম্ভাবনা ও বিস্তার পরিমাপ",
    englishName: "Probability & Measures of Dispersion",
    codeName: "সম্ভাবনা",
    description: "ভেদাঙ্ক, পরিমিত ব্যবধান, সম্ভাবনার সূত্র ও দ্বিপদী বিন্যাস",
    territoryPath: math2Layout[9].path,
    labelCoord: math2Layout[9].center,
    topics: [
      { id: "m2-c10-t1", name: "বিস্তার পরিমাপ (গড় ব্যবধান, পরিমিত ব্যবধান ও ভেদাঙ্ক)", importance: "high" },
      { id: "m2-c10-t2", name: "বিভেদাঙ্ক (Coefficient of Variation) নির্ণয়", importance: "high" },
      { id: "m2-c10-t3", name: "নমুনা ক্ষেত্র, ঘটনা ও সম্ভাবনার মৌলিক ধারণা", importance: "medium" },
      { id: "m2-c10-t4", name: "সম্ভাবনার যোগ সূত্র ও গুণন সূত্র", importance: "high" },
      { id: "m2-c10-t5", name: "শর্তাধীন সম্ভাবনা ও স্বাধীন ঘটনা", importance: "high" },
      { id: "m2-c10-t6", name: "মুদ্রা, ছক্কা ও মার্বেল সংক্রান্ত সম্ভাবনার সমস্যা", importance: "high" },
      { id: "m2-c10-t7", name: "দ্বিপদী বিন্যাস (Binomial Distribution)", importance: "high" }
    ]
  }
];

const ictLayout = generateContiguousLayout(6);
const ICT_CHAPTERS: Chapter[] = [
  {
    id: "ict-c1",
    number: 1,
    name: "তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত",
    englishName: "ICT: World & BD Perspective",
    codeName: "বিশ্ব ও বাংলাদেশ",
    description: "গ্লোবাল ভিলেজ, এআই, ক্রায়োসার্জারি, বায়োমেট্রিক্স, ন্যানোটেক ও সাইবার নিরাপত্তা",
    territoryPath: ictLayout[0].path,
    labelCoord: ictLayout[0].center,
    topics: [
      { id: "ict-c1-t1", name: "গ্লোবাল ভিলেজ (Global Village) ধারণা ও উপাদানসমূহ", importance: "high" },
      { id: "ict-c1-t2", name: "কৃত্রিম বুদ্ধিমত্তা (AI) ও রোবোটিক্স", importance: "high" },
      { id: "ict-c1-t3", name: "ক্রায়োসার্জারি (Cryosurgery) ও চিকিৎসা ক্ষেত্রে আইসিটি", importance: "high" },
      { id: "ict-c1-t4", name: "বায়োমেট্রিক্স ও বায়োইনফরমেটিক্স", importance: "high" },
      { id: "ict-c1-t5", name: "জেনেটিক ইঞ্জিনিয়ারিং ও ন্যানোটেকনোলজি", importance: "high" },
      { id: "ict-c1-t6", name: "ভার্চুয়াল রিয়েলিটি (VR) ও অগমেন্টেড রিয়েলিটি (AR)", importance: "high" },
      { id: "ict-c1-t7", name: "ই-কমার্স, ই-লার্নিং ও আউটসোর্সিং", importance: "medium" },
      { id: "ict-c1-t8", name: "সাইবার অপরাধ, সাইবার নিরাপত্তা ও কপিরাইট আইন", importance: "medium" }
    ]
  },
  {
    id: "ict-c2",
    number: 2,
    name: "কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং",
    englishName: "Communication Systems & Networking",
    codeName: "কমিউনিকেশন ও নেটওয়ার্ক",
    description: "ব্যান্ডউইথ, ট্রান্সমিশন মোড, মাধ্যম, ওয়্যারলেস, টপোলজি ও ক্লাউড কম্পিউটিং",
    territoryPath: ictLayout[1].path,
    labelCoord: ictLayout[1].center,
    topics: [
      { id: "ict-c2-t1", name: "ডেটা কমিউনিকেশনের উপাদান ও ব্যান্ডউইথ (Narrow, Voice, Broadband)", importance: "high" },
      { id: "ict-c2-t2", name: "ডেটা ট্রান্সমিশন মোড (Simplex, Half-Duplex, Full-Duplex)", importance: "high" },
      { id: "ict-c2-t3", name: "ডেটা ট্রান্সমিশন মেথড (Asynchronous, Synchronous, Isochronous)", importance: "high" },
      { id: "ict-c2-t4", name: "তারযুক্ত মাধ্যম (টুইস্টেড পেয়ার, কো-অ্যাক্সিয়াল, অপটিক্যাল ফাইবার)", importance: "high" },
      { id: "ict-c2-t5", name: "তারবিহীন মাধ্যম ও ওয়্যারলেস স্ট্যান্ডার্ড (Bluetooth, Wi-Fi, WiMAX)", importance: "high" },
      { id: "ict-c2-t6", name: "মোবাইল প্রজন্মের বৈশিষ্ট্য (1G, 2G, 3G, 4G, 5G)", importance: "high" },
      { id: "ict-c2-t7", name: "কম্পিউটার নেটওয়ার্কের প্রকারভেদ (PAN, LAN, MAN, WAN)", importance: "high" },
      { id: "ict-c2-t8", name: "নেটওয়ার্ক টপোলজি (বাস, স্টার, রিং, ট্রি, মেশ, হাইব্রিড)", importance: "high" },
      { id: "ict-c2-t9", name: "ক্লাউড কম্পিউটিং ও নেটওয়ার্ক ডিভাইস (Router, Switch, Gateway)", importance: "high" }
    ]
  },
  {
    id: "ict-c3",
    number: 3,
    name: "সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস",
    englishName: "Number Systems & Digital Devices",
    codeName: "সংখ্যা পদ্ধতি",
    description: "রূপান্তর, ২ এর পরিপূরক, বুলিয়ান অ্যালজেবরা, লজিক গেট ও অ্যাডার",
    territoryPath: ictLayout[2].path,
    labelCoord: ictLayout[2].center,
    topics: [
      { id: "ict-c3-t1", name: "সংখ্যা পদ্ধতির প্রকারভেদ (দশমিক, বাইনারি, অক্টাল, হেক্সাডেসিমেল)", importance: "medium" },
      { id: "ict-c3-t2", name: "সংখ্যা পদ্ধতির পারস্পরিক রূপান্তর", importance: "high" },
      { id: "ict-c3-t3", name: "বাইনারি যোগ, বিয়োগ ও ২ এর পরিপূরক (2's Complement) পদ্ধতি", importance: "high" },
      { id: "ict-c3-t4", name: "কোডিং সিস্টেম (BCD, ASCII, EBCDIC, Unicode)", importance: "high" },
      { id: "ict-c3-t5", name: "বুলিয়ান অ্যালজেবরা ও ডি-মরগ্যানের উপপাদ্য প্রয়োগ", importance: "high" },
      { id: "ict-c3-t6", name: "মৌলিক লজিক গেট (AND, OR, NOT)", importance: "high" },
      { id: "ict-c3-t7", name: "সার্বজনীন গেট (NAND, NOR) দ্বারা অন্যান্য গেট বাস্তবায়ন", importance: "high" },
      { id: "ict-c3-t8", name: "বিশেষ গেট (XOR, XNOR) ও সত্যক সারণি", importance: "high" },
      { id: "ict-c3-t9", name: "হাফ অ্যাডার ও ফুল অ্যাডার বর্তনী তৈরি", importance: "high" },
      { id: "ict-c3-t10", name: "এনকোডার ও ডিকোডার বর্তনী", importance: "high" },
      { id: "ict-c3-t11", name: "রেজিস্টার ও কাউন্টার প্রাথমিক ধারণা", importance: "medium" }
    ]
  },
  {
    id: "ict-c4",
    number: 4,
    name: "ওয়েব ডিজাইন পরিচিতি এবং HTML",
    englishName: "Web Design & HTML",
    codeName: "ওয়েব ডিজাইন-HTML",
    description: "ওয়েবসাইটের কাঠামো, HTML ট্যাগ, ফরম্যাটিং, লিংক, টেবিল ও ফর্ম",
    territoryPath: ictLayout[3].path,
    labelCoord: ictLayout[3].center,
    topics: [
      { id: "ict-c4-t1", name: "ওয়েব পেজ, ওয়েবসাইট ও ওয়েবসাইটের কাঠামো (লিনিয়ার, ট্রি, মেশ)", importance: "high" },
      { id: "ict-c4-t2", name: "ডোমেন নেম, আইপি অ্যাড্রেস ও হোস্টিং", importance: "high" },
      { id: "ict-c4-t3", name: "HTML এর মৌলিক কাঠামো ও হেডিং-প্যারাগ্রাফ ট্যাগ", importance: "high" },
      { id: "ict-c4-t4", name: "টেক্সট ফরম্যাটিং ট্যাগ ও ফন্ট স্টাইলিং", importance: "high" },
      { id: "ict-c4-t5", name: "হাইপারলিংক (<a>) তৈরি ও ছবি (<img>) সংযোজন", importance: "high" },
      { id: "ict-c4-t6", name: "HTML টেবিল (<table>, <tr>, <td>, <th>, colspan, rowspan) তৈরি", importance: "high" },
      { id: "ict-c4-t7", name: "HTML ফর্ম (<form>, input, select) ও নিয়ন্ত্রণ", importance: "high" },
      { id: "ict-c4-t8", name: "ওয়েবসাইট পাবলিশিং ধাপসমূহ", importance: "medium" }
    ]
  },
  {
    id: "ict-c5",
    number: 5,
    name: "প্রোগ্রামিং ভাষা (C Programming)",
    englishName: "Programming Language (C)",
    codeName: "সি প্রোগ্রামিং",
    description: "অ্যালগরিদম, ফ্লোচার্ট, ডেটা টাইপ, শর্ত, লুপ, অ্যারে ও ফাংশন",
    territoryPath: ictLayout[4].path,
    labelCoord: ictLayout[4].center,
    topics: [
      { id: "ict-c5-t1", name: "প্রোগ্রামিং ভাষার স্তর ও অনুবাদক প্রোগ্রাম (কম্পাইলার, ইন্টারপ্রেটার)", importance: "high" },
      { id: "ict-c5-t2", name: "অ্যালগরিদম ও ফ্লোচার্ট (Flowchart) অঙ্কন", importance: "high" },
      { id: "ict-c5-t3", name: "সি প্রোগ্রামের মৌলিক গঠন, হেডার ফাইল ও মেইন ফাংশন", importance: "high" },
      { id: "ict-c5-t4", name: "ডেটা টাইপ, চলক (Variable), ধ্রুবক ও অপারেটর", importance: "high" },
      { id: "ict-c5-t5", name: "ইনপুট ও আউটপুট ফাংশন (printf, scanf, ফরম্যাট স্পেসিফায়ার)", importance: "high" },
      { id: "ict-c5-t6", name: "শর্তযুক্ত স্টেটমেন্ট (if, if-else, nested if, switch-case)", importance: "high" },
      { id: "ict-c5-t7", name: "লুপ স্টেটমেন্ট (for, while, do-while loop) ও ধারা যোগফল", importance: "high" },
      { id: "ict-c5-t8", name: "অ্যারে (একমাত্রিক ও দ্বিমাত্রিক অ্যারে) সমস্যা সমাধান", importance: "high" },
      { id: "ict-c5-t9", name: "ফাংশন (User-defined Functions) ও রিকার্শন", importance: "high" }
    ]
  },
  {
    id: "ict-c6",
    number: 6,
    name: "ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)",
    englishName: "Database Management System",
    codeName: "ডেটাবেজ-DBMS",
    description: "ফিল্ড, রেকর্ড, প্রাইমারি কি, রিলেশন, SQL কোয়েরি ও নিরাপত্তা",
    territoryPath: ictLayout[5].path,
    labelCoord: ictLayout[5].center,
    topics: [
      { id: "ict-c6-t1", name: "ডেটাবেজের উপাদান (ফিল্ড, রেকর্ড, ফাইল, টেবিল)", importance: "medium" },
      { id: "ict-c6-t2", name: "কি ফিল্ড (প্রাইমারি কি, কম্পোজিট কি, ফরেন কি)", importance: "high" },
      { id: "ict-c6-t3", name: "ডেটাবেজ রিলেশনশিপ (1:1, 1:N, M:N)", importance: "high" },
      { id: "ict-c6-t4", name: "আরডিবিএমএস (RDBMS) ও এর সুবিধা", importance: "medium" },
      { id: "ict-c6-t5", name: "SQL কমান্ড (SELECT, INSERT, UPDATE, DELETE)", importance: "high" },
      { id: "ict-c6-t6", name: "শর্তযুক্ত কোয়েরি (WHERE, ORDER BY, GROUP BY)", importance: "high" },
      { id: "ict-c6-t7", name: "ডেটাবেজ নিরাপত্তা, এনক্রিপশন ও ব্যাকআপ", importance: "medium" }
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
    icon: "solar:bolt-circle-bold-duotone",
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
    icon: "solar:flame-bold-duotone",
    chapters: CHEM_2_CHAPTERS,
  },
  {
    id: "math-1",
    name: "উচ্চতর গণিত ১ম পত্র",
    shortName: "উচ্চতর গণিত ১ম",
    code: "২৬৫",
    icon: "solar:calculator-minimalistic-bold-duotone",
    chapters: MATH_1_CHAPTERS,
  },
  {
    id: "math-2",
    name: "উচ্চতর গণিত ২য় পত্র",
    shortName: "উচ্চতর গণিত ২য়",
    code: "২৬৬",
    icon: "solar:pie-chart-2-bold-duotone",
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
