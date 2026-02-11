
export type Role = 'owner' | 'consultant' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
  businessField?: string; // For owners
  specialty?: string;     // For consultants
  intro?: string;         // For consultants
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Consultant {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  rating: number;
  reviews: number;
  image: string;
  reviewList?: Review[]; // Array of actual reviews
}

export interface MatchRequest {
  id: string;
  ownerName: string;
  consultantName: string;
  status: '대기중' | '연결됨' | '종료됨';
  timestamp: Date;
}

export type View = 'landing' | 'signup' | 'main' | 'detail' | 'admin' | 'chat' | 'review' | 'myinfo';
