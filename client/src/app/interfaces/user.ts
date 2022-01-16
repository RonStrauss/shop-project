export interface User {
  name: {
    first: string;
    last: string;
  };
  address: {
    city: string;
    street: string;
  };
  _id: number;
  email: string;
  role: string;
  carts: [
    {
      _id: string;
      userID: number;
      total: number;
      createdAt: string;
      items: [{
          productID: string;
          quantity: number;
          _id: string;
        }];
    orderID: {
            shipping: {
                city: string,
                street: string,
                date: string
        };
        _id: string;
        cartID: string;
        total: number;
        lastFourCardDigits: string;
        dateMade: string;
      } | undefined
    } | undefined
  ];
}
