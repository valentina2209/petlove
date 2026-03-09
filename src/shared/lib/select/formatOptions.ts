export interface Option {
  value: string;
  label: string;
}

export const formatOptions = (data: string[]): Option[] => [
  { value: "", label: "Show all" },
  ...data.map((item) => ({
    value: item,
    label: item,
  })),
];