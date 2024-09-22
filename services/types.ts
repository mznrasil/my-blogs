import { JSONContent } from "novel";

type UpdatePaymentStatusPayloadType = {
  pidx: string;
  transaction_id: string;
  amount: number;
  total_amount: number;
  mobile: string;
  status: string;
  plan_id: number;
};

type InitiatePaymentResponse = {
  pidx: string;
  payment_url: string;
  expires_at: string;
  expires_in: number;
};

type InitiatePaymentPayloadType = {
  plan_id: number;
};

type SubscriptionType = {
  id: string;
  start_date: Date;
  end_date: Date;
  user_id: string;
  plan_id: number;
  payment_id: string;
  created_at: Date;
  updated_at: Date;
};

type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  created_at: Date;
  updated_at: Date;
  customer_id: string | null;
};

type CreateUserType = Pick<
  UserType,
  "id" | "first_name" | "last_name" | "email" | "profile_image"
>;

type UpdateUserType = Pick<UserType, "id" | "customer_id">;

type SiteType = {
  id: string;
  name: string;
  description: string;
  subdirectory: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

type CreateSiteType = Pick<
  SiteType,
  "name" | "description" | "subdirectory" | "image_url"
>;

type PostType = {
  id: string;
  title: string;
  article_content: JSONContent;
  small_description: string;
  image: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  site_id: string;
};

type CreatePostType = Pick<
  PostType,
  | "title"
  | "article_content"
  | "small_description"
  | "image"
  | "slug"
  | "site_id"
>;

type PostSummaryType = Pick<PostType, "id" | "title" | "image" | "created_at">;

type PostSiteType = {
  posts: PostSummaryType[];
  site: Pick<SiteType, "id" | "subdirectory">;
};

type SitePostsType = {
  site: Pick<SiteType, "id" | "name">;
  posts: PostType[];
};

export type {
  CreateUserType,
  UpdateUserType,
  UserType,
  CreateSiteType,
  SiteType,
  CreatePostType,
  PostType,
  PostSummaryType,
  PostSiteType,
  SitePostsType,
  SubscriptionType,
  InitiatePaymentPayloadType,
  InitiatePaymentResponse,
  UpdatePaymentStatusPayloadType,
};
