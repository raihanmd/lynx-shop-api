export interface IResponseUserServiceAccount {
  userId: string;
  userProvince: string | null;
  userProvinceId: number | null;
  userCity: string | null;
  userCityId: number | null;
}

export interface IResponseUserUnverified {
  userImage: string;
  userName: string;
}
