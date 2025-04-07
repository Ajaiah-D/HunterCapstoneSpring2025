export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignup {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}
