export interface IPOSTCartBody {
  idCart?: string;
  idUser: string;
  idProduct: string;
  quantityProduct: number;
}

export interface IPUTCartBody extends IPOSTCartBody {
  idCart: string;
}

export interface IDELETECartBody {
  idCart: string;
  idUser: string;
}
