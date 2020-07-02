export interface User {
  firstName: string;
  lastName: string;
  document?: string;
  age: number;
  email: string;
  isPlace: boolean;
  isPlaceAdmin?: boolean;
  placeId?: string;
}

export interface UserState {
  user: User;
  isSignIn: boolean;
  setUser: any;
}
