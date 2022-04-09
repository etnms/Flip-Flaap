export interface IResults {
  currentCollection: string;
  results: Array<ICollection>;
}
export interface ICollection {
 // collections: Array<Object>;
  flashcards: Array<Object>;
  name: string;
}


