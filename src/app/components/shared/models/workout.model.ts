export interface Workout {
  id: number;
  name: string;
}


export interface WorkoutHistory {
  userId: number;
  workoutId: number;
  type: string;
  date: string;
  pulse: number;
}
