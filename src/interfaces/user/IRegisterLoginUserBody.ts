export interface IRegisterUserBody {
  userId?: string;
  userOAuthId: string;
  userEmail: string;
  userName: string;
  userProvider: string;
  userImage: string;
}
