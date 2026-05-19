export type NewsItem = {
  title: string;
  description: string;
  image: string;
  extern_url: string;
  categories: string[];
  date: string;
  author: string;
};

export type JournalItem = {
  item_type: string;
  publication_year: string;
  author: string;
  title: string;
  publication_title: string;
  doi: string;
  abstract_note: string;
  date: string;
  keywords: string;
  // backward-compatible aliases
  type: string;
  journal: string;
  abstract: string;
  doi_link: string;
  link?: string;
};

export type Member = {
  name: string;
  avatar: string;
  research_topic?: string;
  email?: string;
  extern_url?: string;
  title?: string;
  role?: string;
  office?: string;
  introduction?: string[];
  year?: string;
};

export type MembersData = {
  teacher: Member[];
  doctor: Member[];
  master: Member[];
  alumni: Member[];
};

export type LinkItem = {
  name: string;
  url: string;
  logo: string;
};

export type ResearchLink = {
  href: string;
  icon: string;
  title: string;
};

export type ConditionDetail = {
  condition: string | null;
  reac_heat: number | null;
  eq_solubility: number | null;
  peak_time: number | null;
  data_source: string | null;
  condition_id: number;
};

export type AminoRecord = {
  item_id: number;
  category: string;
  name: string;
  cas: string;
  abbr: string;
  conditions_details: ConditionDetail[];
};
