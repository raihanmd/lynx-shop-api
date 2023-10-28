export interface IPOSTCartBody {
  idUser: string;
  idProduct: string;
  quantityProduct: number;
}

export interface IPUTCartBody extends IPOSTCartBody {
  idCart: string;
}

export interface IDELETEProductBody {
  idCart: string;
  idUser: string;
}
