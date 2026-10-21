import { Chapter, Subject } from "./hsc-syllabus";
import { getAtlasGeometries } from "./map-geometries";
import {
  BIO_1_CHAPTERS,
  BIO_2_CHAPTERS,
  CHEM_1_CHAPTERS,
  CHEM_2_CHAPTERS,
  PHY_1_CHAPTERS,
  PHY_2_CHAPTERS
} from "./hsc-syllabus";

export interface MedicalSubjectMetadata {
  id: string;
  marks: number;
  weightPercent: number;
  badge: string;
}

export const MEDICAL_WEIGHTS: Record<string, MedicalSubjectMetadata> = {
  "med-bio": { id: "med-bio", marks: 30, weightPercent: 30, badge: "৩০ নম্বর (৩০%)" },
  "med-chem": { id: "med-chem", marks: 25, weightPercent: 25, badge: "২৫ নম্বর (২৫%)" },
  "med-phy": { id: "med-phy", marks: 15, weightPercent: 15, badge: "১৫ নম্বর (১৫%)" },
  "med-eng": { id: "med-eng", marks: 15, weightPercent: 15, badge: "১৫ নম্বর (১৫%)" },
  "med-gk-bd": { id: "med-gk-bd", marks: 8, weightPercent: 8, badge: "৮ নম্বর (৮%)" },
  "med-gk-int": { id: "med-gk-int", marks: 2, weightPercent: 2, badge: "২ নম্বর (২%)" },
  "med-ethics": { id: "med-ethics", marks: 5, weightPercent: 5, badge: "৫ নম্বর (৫%)" },
};

function generateContiguousLayout(count: number, width = 620, height = 430) {
  return getAtlasGeometries(count, width, height);
}

const engLayout = generateContiguousLayout(3);
export const ENGLISH_CHAPTERS: Chapter[] = [
  {
    id: "med-eng-c1",
    number: 1,
    name: "Grammar- Parts Of Speech",
    englishName: "Parts of Speech",
    codeName: "Parts Of Speech",
    description: "Identification, Interchange, Noun, Pronoun, Adjective, Adverb, Verb, Preposition, Conjunction & Interjection",
    territoryPath: engLayout[0].path,
    labelCoord: engLayout[0].center,
    topics: [
      { id: "med-eng-c1-t1", name: "Identification of Parts of Speech", importance: "high" },
      { id: "med-eng-c1-t2", name: "Interchange of Parts of Speech", importance: "high" },
      { id: "med-eng-c1-t3", name: "Noun and Pronoun (Classification & Usage)", importance: "high" },
      { id: "med-eng-c1-t4", name: "Adjective and Adverb (Positions & Degrees)", importance: "high" },
      { id: "med-eng-c1-t5", name: "Verb (Finite, Non-Finite, Gerund, Participle, Infinitive)", importance: "high" },
      { id: "med-eng-c1-t6", name: "Preposition (Simple, Compound & Phrasal)", importance: "high" },
      { id: "med-eng-c1-t7", name: "Conjunction & Interjection", importance: "medium" }
    ]
  },
  {
    id: "med-eng-c2",
    number: 2,
    name: "Grammar- Others",
    englishName: "Applied Grammar",
    codeName: "Grammar Others",
    description: "Tense, Sentence, Right Form of Verbs, Subject Verb Agreement, Voice, Narration, Modifiers ও বিবিধ ব্যাকরণ",
    territoryPath: engLayout[1].path,
    labelCoord: engLayout[1].center,
    topics: [
      { id: "med-eng-c2-t1", name: "Tense (Structure, Identification & Sequence of Tense)", importance: "high" },
      { id: "med-eng-c2-t2", name: "Sentence (Structure & Clause Analysis)", importance: "high" },
      { id: "med-eng-c2-t3", name: "Right Form of Verbs (All Rules & Exceptions)", importance: "high" },
      { id: "med-eng-c2-t4", name: "Subject Verb Agreement (Inversion & Collective Nouns)", importance: "high" },
      { id: "med-eng-c2-t5", name: "Changing Sentences (Simple, Complex, Compound)", importance: "high" },
      { id: "med-eng-c2-t6", name: "Sentence Correction (Error Hunting & Pinpointing)", importance: "high" },
      { id: "med-eng-c2-t7", name: "Voice Change (Active to Passive Rules & Exceptions)", importance: "high" },
      { id: "med-eng-c2-t8", name: "Narration (Direct & Indirect Speech)", importance: "high" },
      { id: "med-eng-c2-t9", name: "Modifiers (Pre-modifiers & Post-modifiers)", importance: "high" },
      { id: "med-eng-c2-t10", name: "Miscellaneous (Article, Tag Questions, Conditionals)", importance: "medium" }
    ]
  },
  {
    id: "med-eng-c3",
    number: 3,
    name: "Vocabulary",
    englishName: "Vocabulary Mastery",
    codeName: "Vocabulary",
    description: "Appropriate Preposition, Group Verbs, Synonym Antonym, Idioms Phrases, Spelling ও বিবিধ শব্দভাণ্ডার",
    territoryPath: engLayout[2].path,
    labelCoord: engLayout[2].center,
    topics: [
      { id: "med-eng-c3-t1", name: "Appropriate Preposition (Medical Exam Focus)", importance: "high" },
      { id: "med-eng-c3-t2", name: "Group Verbs / Phrasal Verbs", importance: "high" },
      { id: "med-eng-c3-t3", name: "Synonym and Antonym (Medical High-Frequency)", importance: "high" },
      { id: "med-eng-c3-t4", name: "Idioms, Phrases and Clauses", importance: "high" },
      { id: "med-eng-c3-t5", name: "Spelling (Confusing & Tricky Spellings)", importance: "high" },
      { id: "med-eng-c3-t6", name: "Others (Analogy, One Word Substitution, Diction)", importance: "high" }
    ]
  }
];

const gkBdLayout = generateContiguousLayout(6);
export const GK_BD_CHAPTERS: Chapter[] = [
  {
    id: "med-gk-c1",
    number: 1,
    name: "বাংলার প্রাচীন ইতিহাস",
    englishName: "Ancient History of Bengal",
    codeName: "প্রাচীন ইতিহাস",
    description: "প্রাচীন জনপদ, মৌর্য ও গুপ্ত যুগ, পাল ও সেন শাসন, মুসলিম দিল্লি ও বাংলা সালতানাত, মোঘল ও নবাবি শাসন",
    territoryPath: gkBdLayout[0].path,
    labelCoord: gkBdLayout[0].center,
    topics: [
      { id: "med-gk-c1-t1", name: "প্রাচীন জনপদ, মৌর্য ও গুপ্ত যুগ", importance: "high" },
      { id: "med-gk-c1-t2", name: "পাল শাসন, সেন শাসন ও মাৎস্যন্যায়", importance: "high" },
      { id: "med-gk-c1-t3", name: "ভারতবর্ষে মুসলিম শাসন - দিল্লি সালতানাত", importance: "high" },
      { id: "med-gk-c1-t4", name: "ভারতবর্ষে মুসলিম শাসন - বাংলা সালতানাত ও ফখরুদ্দীন মুবারক শাহ", importance: "high" },
      { id: "med-gk-c1-t5", name: "মোঘল শাসন, বারোভূঁইয়া ও সুবেদারি আমল", importance: "high" },
      { id: "med-gk-c1-t6", name: "নবাবি শাসন ও পলাশীর যুদ্ধ (১৭৫৭)", importance: "high" }
    ]
  },
  {
    id: "med-gk-c2",
    number: 2,
    name: "ব্রিটিশ শাসনামল",
    englishName: "British Colonial Rule",
    codeName: "ব্রিটিশ আমল",
    description: "কোম্পানির শাসন, চিরস্থায়ী বন্দোবস্ত, ব্রিটিশ রাজ, বঙ্গভঙ্গ ও ব্রিটিশ বিরোধী ঐতিহাসিক আন্দোলনসমূহ",
    territoryPath: gkBdLayout[1].path,
    labelCoord: gkBdLayout[1].center,
    topics: [
      { id: "med-gk-c2-t1", name: "ইস্ট ইন্ডিয়া কোম্পানির শাসন ও দ্বৈত শাসন", importance: "high" },
      { id: "med-gk-c2-t2", name: "ব্রিটিশ ঔপনিবেশিক শাসন ও প্রশাসনিক সংস্কার", importance: "high" },
      { id: "med-gk-c2-t3", name: "বঙ্গভঙ্গ (১৯০৫) ও বঙ্গভঙ্গ রদ (১৯১১)", importance: "high" },
      { id: "med-gk-c2-t4", name: "ব্রিটিশ বিরোধী আন্দোলন (সিপাহি বিদ্রোহ, ফরায়েজি, স্বদেশী আন্দোলন)", importance: "high" },
      { id: "med-gk-c2-t5", name: "তৎকালীন বিখ্যাত ব্যক্তিগণ ও সমাজ সংস্কারক", importance: "high" }
    ]
  },
  {
    id: "med-gk-c3",
    number: 3,
    name: "পাকিস্তান আমল: ১৯৪৭-১৯৭১",
    englishName: "Pakistan Era (1947-1971)",
    codeName: "পাকিস্তান আমল",
    description: "দেশভাগ, বায়ান্নর ভাষা আন্দোলন, যুক্তফ্রন্ট নির্বাচন, ছয় দফা আন্দোলন, উনসত্তরের গণ-অভ্যুত্থান ও সত্তরের নির্বাচন",
    territoryPath: gkBdLayout[2].path,
    labelCoord: gkBdLayout[2].center,
    topics: [
      { id: "med-gk-c3-t1", name: "শুরু থেকে ১৯৫২ (দেশভাগ ও সূচনা পর্ব)", importance: "high" },
      { id: "med-gk-c3-t2", name: "ভাষা আন্দোলনের ঘটনাপ্রবাহ (১৯৪৮-১৯৫২)", importance: "high" },
      { id: "med-gk-c3-t3", name: "ভাষা শহীদ ও স্মারক ভাস্কর্য", importance: "high" },
      { id: "med-gk-c3-t4", name: "ভাষা আন্দোলনের সাহিত্য ও স্থাপত্য", importance: "high" },
      { id: "med-gk-c3-t5", name: "যুক্তফ্রন্ট থেকে ঐতিহাসিক ছয় দফা পর্যন্ত ঘটনাপ্রবাহ", importance: "high" },
      { id: "med-gk-c3-t6", name: "১৯৬৯ এর ঐতিহাসিক গণ-অভ্যুত্থান", importance: "high" },
      { id: "med-gk-c3-t7", name: "আগরতলা মামলা ও ১৯৭০ এর সাধারণ নির্বাচন", importance: "high" },
      { id: "med-gk-c3-t8", name: "১৯৭১ এর যুদ্ধ-পূর্ববর্তী উত্তাল ঘটনাপ্রবাহ (মার্চ ১৯৭১ ও অসহযোগ আন্দোলন)", importance: "high" }
    ]
  },
  {
    id: "med-gk-c4",
    number: 4,
    name: "মুক্তিযুদ্ধ ও জাতীয় বিষয়াবলি",
    englishName: "Liberation War & National Affairs",
    codeName: "মুক্তিযুদ্ধ",
    description: "অপারেশন সার্চলাইট, মুজিবনগর সরকার, সেক্টরসমূহ, বীরশ্রেষ্ঠ, বুদ্ধিজীবী হত্যা, আত্মসমর্পণ ও সংবিধান",
    territoryPath: gkBdLayout[3].path,
    labelCoord: gkBdLayout[3].center,
    topics: [
      { id: "med-gk-c4-t1", name: "অপারেশন সার্চলাইট ও স্বাধীনতার আনুষ্ঠানিক ঘোষণা", importance: "high" },
      { id: "med-gk-c4-t2", name: "মুজিবনগর সরকার গঠন ও শপথ গ্রহণ", importance: "high" },
      { id: "med-gk-c4-t3", name: "যুদ্ধের নিয়মিত বাহিনী (কে-ফোর্স, এস-ফোর্স, জেড-ফোর্স)", importance: "high" },
      { id: "med-gk-c4-t4", name: "যুদ্ধের অনিয়মিত বাহিনী (গেরিলা, ক্র্যাক প্ল্যাটুন ও অন্যান্য)", importance: "high" },
      { id: "med-gk-c4-t5", name: "মুক্তিযুদ্ধের ১১টি সেক্টর ও সেক্টর কমান্ডারগণ", importance: "high" },
      { id: "med-gk-c4-t6", name: "যুদ্ধের বিখ্যাত সফল অপারেশনসমূহ (অপারেশন জ্যাকপট ইত্যাদি)", importance: "high" },
      { id: "med-gk-c4-t7", name: "যুদ্ধ-সংক্রান্ত বিখ্যাত ব্যক্তিত্ব ও বিদেশী বন্ধুদের অবদান", importance: "high" },
      { id: "med-gk-c4-t8", name: "মুক্তিযুদ্ধের বীরত্বসূচক রাষ্ট্রীয় খেতাবসমূহ", importance: "high" },
      { id: "med-gk-c4-t9", name: "৭ জন বীরশ্রেষ্ঠের বিস্তারিত জীবনী ও আত্মত্যাগ", importance: "high" },
      { id: "med-gk-c4-t10", name: "যৌথবাহিনী গঠন থেকে ১৬ ডিসেম্বর আত্মসমর্পণ পর্যন্ত ঘটনাপ্রবাহ", importance: "high" },
      { id: "med-gk-c4-t11", name: "১৪ ডিসেম্বর বুদ্ধিজীবী হত্যা দিবস - বিস্তারিত বিবরণ", importance: "high" },
      { id: "med-gk-c4-t12", name: "মুক্তিযুদ্ধভিত্তিক সাহিত্য, কবিতা, গ্রন্থ ও উপন্যাস", importance: "high" },
      { id: "med-gk-c4-t13", name: "মুক্তিযুদ্ধভিত্তিক চলচ্চিত্র, তথ্যচিত্র ও নাটক", importance: "high" },
      { id: "med-gk-c4-t14", name: "মুক্তিযুদ্ধভিত্তিক স্থাপত্য ও স্মৃতিসৌধসমূহ", importance: "high" },
      { id: "med-gk-c4-t15", name: "যুদ্ধ-পরবর্তী ঘটনাপ্রবাহ ও ১৯৭২ এর সংবিধান রচনার বিস্তারিত ইতিহাস", importance: "high" },
      { id: "med-gk-c4-t16", name: "জাতীয় বিষয়াবলি (জাতীয় প্রতীক, পতাকা, সংগীত ও রাষ্ট্রীয় প্রতিষ্ঠান)", importance: "high" }
    ]
  },
  {
    id: "med-gk-c5",
    number: 5,
    name: "বাংলাদেশ বিষয়াবলি: ভূগোল ও সম্পদ",
    englishName: "Geography & Natural Resources",
    codeName: "ভূগোল ও সম্পদ",
    description: "ভৌগোলিক অবস্থান, সীমারেখা, ছিটমহল চুক্তি, আবহাওয়া, সমুদ্রসীমা, নদ-নদী, দ্বীপ-পাহাড়, কৃষি ও খনিজ সম্পদ",
    territoryPath: gkBdLayout[4].path,
    labelCoord: gkBdLayout[4].center,
    topics: [
      { id: "med-gk-c5-t1", name: "বাংলাদেশের ভূ-প্রকৃতি, ভৌগোলিক অবস্থান ও আয়তন", importance: "high" },
      { id: "med-gk-c5-t2", name: "সীমারেখা ও সীমান্তবর্তী অবস্থান (সীমান্তবর্তী জেলা ও অঞ্চল)", importance: "high" },
      { id: "med-gk-c5-t3", name: "ছোটবড় অঞ্চল ও ভারতের সাথে বিভিন্ন ঐতিহাসিক ও সীমান্ত চুক্তি", importance: "high" },
      { id: "med-gk-c5-t4", name: "আবহাওয়া, জলবায়ু ও ভূ-উপগ্রহ (বঙ্গবন্ধু স্যাটেলাইট-১)", importance: "high" },
      { id: "med-gk-c5-t5", name: "সমুদ্রসীমা বিজয়, বঙ্গোপসাগর ও বিখ্যাত সমুদ্রসৈকত", importance: "high" },
      { id: "med-gk-c5-t6", name: "নদী, হ্রদ, ঝর্ণা, বিল, হাওড় ও বাঁওড় (নদী সংযোগ ও উৎপত্তি)", importance: "high" },
      { id: "med-gk-c5-t7", name: "দ্বীপ, পর্বত, উপত্যকা ও চর অঞ্চল", importance: "high" },
      { id: "med-gk-c5-t8", name: "কৃষি, বনজ ও শিল্প সম্পদ (প্রধান ফসল ও বনভূমি)", importance: "high" },
      { id: "med-gk-c5-t9", name: "প্রাণী, পানি ও মৎস্য সম্পদ", importance: "medium" },
      { id: "med-gk-c5-t10", name: "খনিজ ও বিদ্যুৎ সম্পদ এবং ইপিজেড (EPZ) ও অর্থনৈতিক অঞ্চল", importance: "high" }
    ]
  },
  {
    id: "med-gk-c6",
    number: 6,
    name: "বাংলাদেশ বিষয়াবলি: সমাজ, রাষ্ট্র ও সংস্কৃতি",
    englishName: "Society, State & Culture",
    codeName: "সমাজ ও রাষ্ট্র",
    description: "জনসংখ্যা ও উপজাতি, ভাষা-সংস্কৃতি, পরিবহন, স্বাস্থ্য-চিকিৎসা, অর্থনীতি-বাণিজ্য, বিজ্ঞান-প্রযুক্তি ও বৈশ্বিক অঙ্গন",
    territoryPath: gkBdLayout[5].path,
    labelCoord: gkBdLayout[5].center,
    topics: [
      { id: "med-gk-c6-t1", name: "বাংলাদেশের জনসংখ্যা, জনমিতি ও ক্ষুদ্র নৃগোষ্ঠী/উপজাতি", importance: "high" },
      { id: "med-gk-c6-t2", name: "বাংলাদেশের ভাষা, সাহিত্য, সংস্কৃতি, স্থাপত্য ও রাষ্ট্রীয় পুরস্কার", importance: "high" },
      { id: "med-gk-c6-t3", name: "বাংলাদেশের পরিবহন ও যোগাযোগ ব্যবস্থা (মেট্রোরেল, কর্ণফুলী টানেল, মেগা প্রকল্প)", importance: "high" },
      { id: "med-gk-c6-t4", name: "বাংলাদেশের শিক্ষা ব্যবস্থা ও প্রাচীন ও আধুনিক শিক্ষাপ্রতিষ্ঠান", importance: "medium" },
      { id: "med-gk-c6-t5", name: "বাংলাদেশের স্বাস্থ্য ও চিকিৎসা ব্যবস্থা (মেডিকেল কলেজ ও স্বাস্থ্যসেবা কাঠামো)", importance: "high" },
      { id: "med-gk-c6-t6", name: "বাংলাদেশের অর্থনীতি ও বাণিজ্য (বাজেট, ব্যাংক ও রিজার্ভ)", importance: "high" },
      { id: "med-gk-c6-t7", name: "বাংলাদেশের বিচার ব্যবস্থা ও সংবিধানের ধারা", importance: "high" },
      { id: "med-gk-c6-t8", name: "বাংলাদেশের বিজ্ঞান ও প্রযুক্তি ক্ষেত্র", importance: "medium" },
      { id: "med-gk-c6-t9", name: "বাংলাদেশের খেলাধুলা ও বিশিষ্ট ব্যক্তিবর্গ", importance: "medium" },
      { id: "med-gk-c6-t10", name: "আন্তর্জাতিক অঙ্গনে বাংলাদেশ ও শান্তিমিশনে অবদান", importance: "high" }
    ]
  }
];

const gkIntLayout = generateContiguousLayout(4);
export const GK_INT_CHAPTERS: Chapter[] = [
  {
    id: "med-gk-int-c1",
    number: 1,
    name: "বিশ্ব পরিচিতি ও দেশ-অঞ্চল",
    englishName: "World Overview & Regions",
    codeName: "বিশ্ব পরিচিতি",
    description: "মহাসাগর ও মহাদেশ, মহাদেশভিত্তিক দেশসমূহ, রাজধানী-মুদ্রা, পূর্বনাম-বর্তমান নাম ও বিশেষ সীমারেখা",
    territoryPath: gkIntLayout[0].path,
    labelCoord: gkIntLayout[0].center,
    topics: [
      { id: "med-gk-int-c1-t1", name: "মহাসাগর ও মহাদেশ পরিচিতি", importance: "high" },
      { id: "med-gk-int-c1-t2", name: "মহাদেশভিত্তিক দেশসমূহ ও ভৌগোলিক বিন্যাস", importance: "high" },
      { id: "med-gk-int-c1-t3", name: "স্বাধীন দেশ ও সাবেক উপনিবেশসমূহ", importance: "high" },
      { id: "med-gk-int-c1-t4", name: "বিভিন্ন দেশের পূর্বনাম ও বর্তমান নাম", importance: "high" },
      { id: "med-gk-int-c1-t5", name: "ভৌগোলিক উপনাম (Cities of the World & Nicknames)", importance: "high" },
      { id: "med-gk-int-c1-t6", name: "বিভিন্ন দেশের রাজধানী ও মুদ্রা", importance: "high" },
      { id: "med-gk-int-c1-t7", name: "আন্তর্জাতিক বিশেষ অঞ্চল ও সীমারেখা (Green Line, Radcliffe ইত্যাদি)", importance: "high" },
      { id: "med-gk-int-c1-t8", name: "বিশ্বের ঐতিহাসিক ও গুরুত্বপূর্ণ স্থানসমূহ", importance: "high" }
    ]
  },
  {
    id: "med-gk-int-c2",
    number: 2,
    name: "বিশ্ব বৈচিত্র্য, বিপ্লব ও বৈশ্বিক ব্যবস্থা",
    englishName: "Geographical Wonders & Revolutions",
    codeName: "বিশ্ব বৈচিত্র্য",
    description: "সাগর-হ্রদ-প্রণালী, পর্বত-মরুভূমি, সুড়ঙ্গ-স্থাপত্য, প্রাচীন সভ্যতা, বিপ্লব ও বৈশ্বিক স্বাস্থ্য-ব্যাংকিং",
    territoryPath: gkIntLayout[1].path,
    labelCoord: gkIntLayout[1].center,
    topics: [
      { id: "med-gk-int-c2-t1", name: "সাগর, নদী, হ্রদ, খাল ও আন্তর্জাতিক প্রণালীসমূহ", importance: "high" },
      { id: "med-gk-int-c2-t2", name: "জলপ্রপাত, সেতু, বাঁধ ও অন্তরীপ", importance: "high" },
      { id: "med-gk-int-c2-t3", name: "দ্বীপ, পর্বত, মরুভূমি ও আগ্নেয়গিরি", importance: "high" },
      { id: "med-gk-int-c2-t4", name: "বন্দর, আন্তর্জাতিক রুট, সুড়ঙ্গপথ ও গিরিপথ", importance: "high" },
      { id: "med-gk-int-c2-t5", name: "বিখ্যাত লাইব্রেরী, চিড়িয়াখানা, জাদুঘর ও অট্টালিকা", importance: "medium" },
      { id: "med-gk-int-c2-t6", name: "প্রাচীন সভ্যতা (মেসোপটেমিয়া, সিন্ধু, মিশরীয়, গ্রিক, রোমান)", importance: "high" },
      { id: "med-gk-int-c2-t7", name: "গুরুত্বপূর্ণ ঐতিহাসিক বিপ্লব (ফরাসি, রুশ, শিল্প বিপ্লব)", importance: "high" },
      { id: "med-gk-int-c2-t8", name: "বিশ্ব অর্থনীতি ও কেন্দ্রীয় ব্যাংকিং ব্যবস্থা", importance: "high" },
      { id: "med-gk-int-c2-t9", name: "আন্তর্জাতিক শিক্ষা ও চিকিৎসাব্যবস্থা (WHO ও স্বাস্থ্যকাঠামো)", importance: "high" }
    ]
  },
  {
    id: "med-gk-int-c3",
    number: 3,
    name: "আন্তর্জাতিক সংস্থা, যুদ্ধ, চুক্তি ও জাতিসংঘ",
    englishName: "Global Organizations, Treaties & Wars",
    codeName: "সংস্থা ও যুদ্ধ",
    description: "সংবাদ-গোয়েন্দা সংস্থা, আন্তর্জাতিক চুক্তি, ১ম ও ২য় বিশ্বযুদ্ধ, জাতিসংঘ ও বিশেষায়িত সংস্থাসমূহ",
    territoryPath: gkIntLayout[2].path,
    labelCoord: gkIntLayout[2].center,
    topics: [
      { id: "med-gk-int-c3-t1", name: "আন্তর্জাতিক বিমান, সংবাদ, গোয়েন্দা ও গেরিলা সংস্থা", importance: "high" },
      { id: "med-gk-int-c3-t2", name: "বিভিন্ন চুক্তি, আন্তর্জাতিক কনভেনশন ও প্রটোকল", importance: "high" },
      { id: "med-gk-int-c3-t3", name: "বিভিন্ন গুরুত্বপূর্ণ যুদ্ধ ও সংঘাত", importance: "high" },
      { id: "med-gk-int-c3-t4", name: "প্রথম ও দ্বিতীয় বিশ্বযুদ্ধ (কারণ, জোট ও পরিণতি)", importance: "high" },
      { id: "med-gk-int-c3-t5", name: "জাতিপুঞ্জ বা League of Nations", importance: "high" },
      { id: "med-gk-int-c3-t6", name: "জাতিসংঘ বা United Nations (গঠন, মূল অঙ্গ ও নিরাপত্তা পরিষদ)", importance: "high" },
      { id: "med-gk-int-c3-t7", name: "জাতিসংঘের বিশেষায়িত সংস্থাসমূহ (WHO, UNESCO, UNICEF ইত্যাদি)", importance: "high" },
      { id: "med-gk-int-c3-t8", name: "আন্তর্জাতিক রাজনৈতিক সংস্থা (Commonwealth, NAM, OIC ইত্যাদি)", importance: "high" },
      { id: "med-gk-int-c3-t9", name: "অর্থনৈতিক ও বাণিজ্যিক সংস্থা (WTO, World Bank, IMF, ADB)", importance: "high" },
      { id: "med-gk-int-c3-t10", name: "আঞ্চলিক সংস্থা (SAARC, ASEAN, BIMSTEC, EU)", importance: "high" },
      { id: "med-gk-int-c3-t11", name: "স্বেচ্ছাসেবী ও সামরিক সংস্থা (Red Cross, NATO ইত্যাদি)", importance: "high" },
      { id: "med-gk-int-c3-t12", name: "পরিবেশ বিষয়ক আন্তর্জাতিক সংস্থা ও জলবায়ু সম্মেলন (COP, UNEP)", importance: "high" }
    ]
  },
  {
    id: "med-gk-int-c4",
    number: 4,
    name: "বিশ্ব প্রযুক্তি, ব্যক্তিত্ব, সম্মাননা ও খেলাধুলা",
    englishName: "Tech, Personalities, Awards & Sports",
    codeName: "প্রযুক্তি ও সম্মাননা",
    description: "বিখ্যাত ব্যক্তিদের অবদান, আন্তর্জাতিক দিবস, বিশ্ব প্রযুক্তি, নোবেল ও অন্যান্য পুরস্কার, অলিম্পিক ও খেলাধুলা",
    territoryPath: gkIntLayout[3].path,
    labelCoord: gkIntLayout[3].center,
    topics: [
      { id: "med-gk-int-c4-t1", name: "বিখ্যাত ব্যক্তিদের অবদান ও ঐতিহাসিক ভূমিকা", importance: "high" },
      { id: "med-gk-int-c4-t2", name: "বিখ্যাত লেখকের কালজয়ী গ্রন্থসমূহ", importance: "high" },
      { id: "med-gk-int-c4-t3", name: "আন্তর্জাতিক দিবসসমূহ (সাম্প্রতিক ও গুরুত্বপূর্ণ দিবস)", importance: "high" },
      { id: "med-gk-int-c4-t4", name: "তথ্য ও যোগাযোগ প্রযুক্তি ও কৃত্রিম বুদ্ধিমত্তা", importance: "high" },
      { id: "med-gk-int-c4-t5", name: "বিভিন্ন প্রযুক্তি, শাস্ত্র ও বৈজ্ঞানিক তত্ত্বের জনক", importance: "high" },
      { id: "med-gk-int-c4-t6", name: "বিজ্ঞানের বিভিন্ন যুগান্তকারী আবিষ্কার ও আবিষ্কারক", importance: "high" },
      { id: "med-gk-int-c4-t7", name: "নোবেল পুরস্কার (চিকিৎসা, শান্তি, সাহিত্য ও সাম্প্রতিক নোবেল)", importance: "high" },
      { id: "med-gk-int-c4-t8", name: "অন্যান্য আন্তর্জাতিক পুরস্কার ও সম্মাননা (অস্কার, ম্যাগসেসে ইত্যাদি)", importance: "medium" },
      { id: "med-gk-int-c4-t9", name: "অলিম্পিক, ক্রিকেট, ফুটবল বিশ্বকাপ ও অন্যান্য খেলাধুলা", importance: "high" },
      { id: "med-gk-int-c4-t10", name: "আন্তর্জাতিক ভূগোল ও মানচিত্রের বিশেষ রেখা", importance: "medium" },
      { id: "med-gk-int-c4-t11", name: "গুরুত্বপূর্ণ Abbreviation ও তার পূর্ণরূপ", importance: "high" }
    ]
  }
];

const ethLayout = generateContiguousLayout(3);
export const ETHICS_CHAPTERS: Chapter[] = [
  {
    id: "med-eth-c1",
    number: 1,
    name: "মূল্যবোধ ও সদাচরণ",
    englishName: "Values & Personal Integrity",
    codeName: "মূল্যবোধ",
    description: "মানবিক মূল্যবোধ, সততা, নিষ্ঠা, শিষ্টাচার, পারস্পরিক শ্রদ্ধাবোধ, শৃঙ্খলা ও আত্মনিয়ন্ত্রণ",
    territoryPath: ethLayout[0].path,
    labelCoord: ethLayout[0].center,
    topics: [
      { id: "med-eth-c1-t1", name: "মূল্যবোধ ও মানবিক আচরণ (Human Values & Conduct)", importance: "high" },
      { id: "med-eth-c1-t2", name: "সততা, নিষ্ঠা ও চারিত্রিক দৃঢ়তা (Honesty & Moral Integrity)", importance: "high" },
      { id: "med-eth-c1-t3", name: "সদাচরণ, শিষ্টাচার ও পারস্পরিক শ্রদ্ধাবোধ (Etiquette & Respect)", importance: "high" },
      { id: "med-eth-c1-t4", name: "শৃঙ্খলা, আত্মনিয়ন্ত্রণ ও সময়ানুবর্তিতা (Discipline & Punctuality)", importance: "high" }
    ]
  },
  {
    id: "med-eth-c2",
    number: 2,
    name: "চিকিৎসা নৈতিকতা ও রোগীর অধিকার",
    englishName: "Medical Ethics & Patient Rights",
    codeName: "চিকিৎসা নৈতিকতা",
    description: "চিকিৎসা সেবার আদর্শ, হিপোক্রেটিক শপথ, রোগীর প্রতি সহমর্মিতা, তথ্যের গোপনীয়তা ও জরুরি নৈতিক সিদ্ধান্ত",
    territoryPath: ethLayout[1].path,
    labelCoord: ethLayout[1].center,
    topics: [
      { id: "med-eth-c2-t1", name: "চিকিৎসা সেবার আদর্শ ও নৈতিকতা (Ideals of Medical Practice)", importance: "high" },
      { id: "med-eth-c2-t2", name: "হিপোক্রেটিক শপথ ও চিকিৎসকের পেশাগত অঙ্গীকার (Hippocratic Oath)", importance: "high" },
      { id: "med-eth-c2-t3", name: "রোগীর অধিকার ও সহানুভূতিশীল আচরণ (Patient Rights & Empathy)", importance: "high" },
      { id: "med-eth-c2-t4", name: "রোগীর তথ্যের গোপনীয়তা রক্ষা ও বিশ্বাসযোগ্যতা (Patient Confidentiality)", importance: "high" },
      { id: "med-eth-c2-t5", name: "জরুরি চিকিৎসা সেবায় তাৎক্ষণিক নৈতিক সিদ্ধান্ত (Emergency Medical Ethics)", importance: "high" }
    ]
  },
  {
    id: "med-eth-c3",
    number: 3,
    name: "সামাজিক দায়বদ্ধতা ও মানবিক মূল্যবোধ",
    englishName: "Social Responsibility & Compassion",
    codeName: "সামাজিক দায়বদ্ধতা",
    description: "সুবিধাবঞ্চিত মানুষের সেবায় অঙ্গীকার, সামাজিক দায়িত্ববোধ, দেশপ্রেম ও বৈষম্যহীন মানবিক দৃষ্টিভঙ্গি",
    territoryPath: ethLayout[2].path,
    labelCoord: ethLayout[2].center,
    topics: [
      { id: "med-eth-c3-t1", name: "সুবিধাবঞ্চিত মানুষের স্বাস্থ্যসেবায় মানবিক মনোভাব (Healthcare for Underprivileged)", importance: "high" },
      { id: "med-eth-c3-t2", name: "সামাজিক দায়িত্ববোধ ও জনকল্যাণে ভূমিকা (Social Responsibility)", importance: "high" },
      { id: "med-eth-c3-t3", name: "দেশপ্রেম, মানবিক সহানুভূতি ও নৈতিক বিচারবোধ (Patriotism & Medical Altruism)", importance: "high" }
    ]
  }
];

const medBioLayout = generateContiguousLayout(24);
export const MEDICAL_BIOLOGY_CHAPTERS: Chapter[] = [
  ...BIO_1_CHAPTERS.map((ch: Chapter, idx: number) => ({
    ...ch,
    id: `med-bio-b1-${ch.id}`,
    name: `উদ্ভিদ: ${ch.name}`,
    codeName: ch.codeName,
    territoryPath: medBioLayout[idx].path,
    labelCoord: medBioLayout[idx].center,
  })),
  ...BIO_2_CHAPTERS.map((ch: Chapter, idx: number) => ({
    ...ch,
    id: `med-bio-b2-${ch.id}`,
    name: `প্রাণী: ${ch.name}`,
    codeName: ch.codeName,
    territoryPath: medBioLayout[12 + idx].path,
    labelCoord: medBioLayout[12 + idx].center,
  }))
];

const medChemLayout = generateContiguousLayout(10);
export const MEDICAL_CHEMISTRY_CHAPTERS: Chapter[] = [
  ...CHEM_1_CHAPTERS.map((ch: Chapter, idx: number) => ({
    ...ch,
    id: `med-chem-c1-${ch.id}`,
    name: `রসায়ন ১ম: ${ch.name}`,
    codeName: ch.codeName,
    territoryPath: medChemLayout[idx].path,
    labelCoord: medChemLayout[idx].center,
  })),
  ...CHEM_2_CHAPTERS.map((ch: Chapter, idx: number) => ({
    ...ch,
    id: `med-chem-c2-${ch.id}`,
    name: `রসায়ন ২য়: ${ch.name}`,
    codeName: ch.codeName,
    territoryPath: medChemLayout[5 + idx].path,
    labelCoord: medChemLayout[5 + idx].center,
  }))
];

const medPhyLayout = generateContiguousLayout(21);
export const MEDICAL_PHYSICS_CHAPTERS: Chapter[] = [
  ...PHY_1_CHAPTERS.map((ch: Chapter, idx: number) => ({
    ...ch,
    id: `med-phy-p1-${ch.id}`,
    name: `পদার্থ ১ম: ${ch.name}`,
    codeName: ch.codeName,
    territoryPath: medPhyLayout[idx].path,
    labelCoord: medPhyLayout[idx].center,
  })),
  ...PHY_2_CHAPTERS.map((ch: Chapter, idx: number) => ({
    ...ch,
    id: `med-phy-p2-${ch.id}`,
    name: `পদার্থ ২য়: ${ch.name}`,
    codeName: ch.codeName,
    territoryPath: medPhyLayout[10 + idx].path,
    labelCoord: medPhyLayout[10 + idx].center,
  }))
];

export const MEDICAL_SUBJECTS: Subject[] = [
  {
    id: "med-bio",
    name: "জীববিজ্ঞান (উদ্ভিদ ও প্রাণী)",
    shortName: "জীববিজ্ঞান",
    code: "৩০ নম্বর",
    icon: "solar:dna-bold-duotone",
    chapters: MEDICAL_BIOLOGY_CHAPTERS,
  },
  {
    id: "med-chem",
    name: "রসায়ন (১ম ও ২য় পত্র)",
    shortName: "রসায়ন",
    code: "২৫ নম্বর",
    icon: "solar:test-tube-minimalistic-bold-duotone",
    chapters: MEDICAL_CHEMISTRY_CHAPTERS,
  },
  {
    id: "med-phy",
    name: "পদার্থবিজ্ঞান (১ম ও ২য় পত্র)",
    shortName: "পদার্থবিজ্ঞান",
    code: "১৫ নম্বর",
    icon: "solar:atom-bold-duotone",
    chapters: MEDICAL_PHYSICS_CHAPTERS,
  },
  {
    id: "med-eng",
    name: "ইংরেজি (English Grammar & Vocab)",
    shortName: "ইংরেজি",
    code: "১৫ নম্বর",
    icon: "solar:book-bookmark-bold",
    chapters: ENGLISH_CHAPTERS,
  },
  {
    id: "med-gk-bd",
    name: "সাধারণ জ্ঞান: বাংলাদেশ বিষয়াবলি",
    shortName: "বাংলাদেশ বিষয়াবলি",
    code: "৮ নম্বর",
    icon: "solar:flag-bold-duotone",
    chapters: GK_BD_CHAPTERS,
  },
  {
    id: "med-gk-int",
    name: "সাধারণ জ্ঞান: আন্তর্জাতিক বিষয়াবলি",
    shortName: "আন্তর্জাতিক বিষয়াবলী",
    code: "২ নম্বর",
    icon: "solar:globus-bold-duotone",
    chapters: GK_INT_CHAPTERS,
  },
  {
    id: "med-ethics",
    name: "মানবিক গুণাবলি ও চিকিৎসা নৈতিকতা",
    shortName: "মানবিক গুণাবলি",
    code: "৫ নম্বর",
    icon: "solar:heart-angle-bold-duotone",
    chapters: ETHICS_CHAPTERS,
  }
];
