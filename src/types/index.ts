export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CreatePostDTO = Pick<Post, 'title' | 'content'>;

export interface ApiErrorResponse {
  errors: Array<string>;
}

export interface ApiSuccessResponse<T> {
  message: string;
  data: T;
}
