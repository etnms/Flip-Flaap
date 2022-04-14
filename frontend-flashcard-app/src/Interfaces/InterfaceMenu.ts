export interface IMenuProps {
  setShowCollectionForm: Function;
  collectionNames: Array<Collection>;
  setCurrentCollection: Function;
  setLeftMenuChange: Function;

}

type Collection = {
    name: string;
    _id: string;
  };
