export type SignUpParams = {
  email: string;
  password: string;
}

export type SignInParams = {
  email: string;
  password: string;
}

export type Tokens = {
  refresh_token: string;
  access_token: string;
}

export type User = {
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  avatar_url: string;
  current_plan: null | Purchase;
}

export type Purchase = {
  id: number;
  plan: Plan;
  price: number;
  effective_date: Date;
  expiry_date: Date;
  payment_method: string;
}

export type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  value: number;
}

export type Category = {
  id: number;
  name: string;
}

export type Book = {
  id: number;
  name: string;
  other_names: string;
  author: string;
  description: string;
  image_url: string;
  liked?: boolean;
  categories?: Array<Category>;
  chapters?: Array<Chapter>;
  favorited?: boolean;
  reading_chapter?: null | Chapter;
  free?: boolean;
}

export type Chapter = {
  id: number;
  name: string;
  content: string;
}

export type PaymentMethod = {
  key: string;
  name: string;
}

export type Notification = {
  id: number;
  message: {
    title: string;
    body: string;
    data?: any;
  },
  seen: boolean;
  created_at: Date;
}
