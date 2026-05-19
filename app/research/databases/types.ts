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