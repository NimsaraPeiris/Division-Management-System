export interface Adult {
  id?: number;
  name: string;
  nic: string;
  gender: string;
  dob: string;
  address: string;
  occupation: string;
  contact: string;
  created_at?: string;
}

export interface Child {
  id?: number;
  name: string;
  gender: string;
  dob: string;
  parent_nic: string;
  school: string;
  grade: string;
  created_at?: string;
}

export type Person = Adult | Child;