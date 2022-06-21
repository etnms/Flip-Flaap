export const conceptTypeText = (type: string) => {
  if (type === "concept") return "Concept";
  if (type === "language") return "Word";
 
};

export const defTypeText = (type: string) => {
  if (type === "concept") return "Description";
  if (type === "language") return "Translation";
  if (type === "to-do") return "To do";
};

export const placeHolderConcept = (type: string) => {
  if (type === "concept") return "Name of the concept";
  if (type === "language") return "Word";
}

export const placeHolderDef = (type: string) => {
  if (type === "concept") return "Definition to remember";
  if (type === "language") return "Translation or definition of the word.";
  if (type === "to-do") return "Description of the to do";
}



export const formatDate = (value: Date) => {
  const date: Date = new Date(value);
  const year: number= date.getFullYear();
  const month: number = date.getMonth();
  const day: number = date.getDate();

  return `${year}/${month}/${day}`;
};