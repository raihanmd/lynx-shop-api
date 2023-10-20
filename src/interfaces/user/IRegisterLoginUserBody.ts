export interface IRegisterLoginUserBody {
  userId?: string;
  userOAuthId: string;
  userEmail: string;
  userName: string;
  userProvider: string;
  userImage: string;
}
