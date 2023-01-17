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
  rewardTitle: string;
  pointsValue: string;
  endTime: string;
  isDone: boolean;
  hasRequest: boolean;
  asignedProfileId: string;
}

export interface ProfileInterface {
  avatar: string;
  id: string;
  mainUserId: string;
  name: string;
  parent?: boolean;
  pin: string;
  room: string;
}
