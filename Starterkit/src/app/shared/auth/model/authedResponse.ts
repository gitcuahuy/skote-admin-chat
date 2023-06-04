export interface AuthedResponse {
  accessToken: string;
  refreshToken: string;
  userId?: string;
  signInMethod?: string;
  providerId?: string;
}
