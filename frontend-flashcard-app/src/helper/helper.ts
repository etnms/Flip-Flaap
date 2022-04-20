export const conceptTypeText = (type: string) => {
  if (type === "concept") return "Concept";
  if (type === "language") return "Word";
};

export const defTypeText = (type: string) => {
  if (type === "concept") return "Description";
  if (type === "language") return "Translation/Definition";
};
