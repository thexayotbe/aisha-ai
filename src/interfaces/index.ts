// interfaces/Message.ts
export interface IMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  chat_id?: number;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  birth_date: string;
  phone_number: string;
  consent: string;
  id?: number;
}
export interface ApiResponse {
  user: User;
  access_token: string;
  // Add other response properties as needed
}

export interface IChat {
  created_at: string;
  id: number;
  name: string;
  thread_id: string;
  updated_at: string;
  user_id: number;
}
