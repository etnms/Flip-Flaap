export interface IFlashcard {
  _id: string;
  collectionName: string;
  concept: string;
  date: Date;
  definition: string;
  setItemChange: Function;
}


