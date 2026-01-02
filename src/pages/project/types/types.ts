export type SectionType = "ENV" | "VPN" | "SERVER" | "CUSTOM";

export interface FieldForm {
  fieldKey: string;
  fieldValue: string;
}

export interface SectionForm {
  type: SectionType;
  title: string;
  orderIndex: number;
  fields: FieldForm[];
}
