export interface JwtPayload {
  username: string;
  role: 'Admin' | 'User';
}
