export interface IResponseGetProduct {
  userName: string;
  userImage: string;
  userBanner: string;
  userBio: string;
  userShopDescription: string;
  userProvince: string;
  userCity: string;
  totalRating: string;
  userProduct: any;
}

export interface IResponseUserUnverified {
  userImage: string;
  userName: string;
}

export interface IResponseProductServicesGetDetail {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productBlurhash: string;
  productDescription: string;
  productQuantity: number;
  productWeight: number;
  productRating: number | null;
  totalReviews: number;
  totalOrders: number;
  ownedBy: string;
  ownerImage: string;
  ownerShopDescription: string;
  ownerProvince: string;
  ownerProvinceId: number;
  ownerCity: string;
  ownerCityId: number;
  ownerTotalRating: number;
}
