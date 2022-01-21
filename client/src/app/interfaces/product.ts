export interface Product {
  _id: string;
  name: string;
  categoryID: {
    _id: string;
  };
  priceInteger: number;
  priceDecimal: number;
  imageURL: string;
  isInWeight: boolean;
}
