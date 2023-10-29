export interface ILoginUserBody {
  userOAuthId: string;
  userEmail: string;
  userProvider: string;
}

export interface IRegisterUserBody {
  userId?: string;
  userOAuthId: string;
  userEmail: string;
  userName: string;
  userProvider: string;
  userImage: string;
}

export interface IVerifyUserBody {
  userId: string;
  userProvince: string;
  userProvinceId: number;
  userCity: string;
  userCityId: number;
  userBio: string;
  userShopDesc: string;
}
