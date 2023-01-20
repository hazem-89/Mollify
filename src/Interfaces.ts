export interface Tasks {
  id: string;
  taskDescription: string;
  pointsValue: string;
  endTime: string;
  category: string;
  isDone: boolean;
  hasRequest: boolean;
  profileId: string;
}

export interface Rewards {
  id: string;
  title: string;
  points: string;
  endTime: string;
  isDone: boolean;
  assignedProfileId: string;
}

export interface ProfileInterface {
  id: string;
  avatar: string;
  mainUserId: string;
  name: string;
  parent?: boolean;
  pin: string;
  room: string;
  points: string;
}
