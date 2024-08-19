export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  workoutCount: number,
  weight: number,
  pulse: number,
  isAuthenticated: boolean,
  avatarUrl: string | null | ArrayBuffer,
  fitnessLevel: string,
}
