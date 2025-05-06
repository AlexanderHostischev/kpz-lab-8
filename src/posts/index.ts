import type { Post, CreatePostDTO, ApiErrorResponse, ApiSuccessResponse } from "../types";
import { api } from "../server";
import type { AxiosResponse, AxiosError } from 'axios';

type PostResponse = AxiosResponse<ApiSuccessResponse<Post>>;

export const getAllEntities = async (): Promise<Array<Post>> => {
  try {
    const response: AxiosResponse<ApiSuccessResponse<Array<Post>>> = await api.get("/posts");
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return [];
  }
};

export const getEntityById = async (id: number): Promise<Post | null> => {
  try {
    const response: PostResponse = await api.get(`/posts/${id}`);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
};

export const createEntity = async (postDTO: CreatePostDTO): Promise<Post | null> => {
  try {
    const response: PostResponse = await api.post('/posts', postDTO);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
};

export const updateEntity = async (id: number, data: Partial<Post>): Promise<Post | null> => {
  try {
    const response: PostResponse = await api.patch(`/posts/${id}`, data);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return null;
  }
}

export const deleteEntity = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/posts/${id}`);
    return true;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      console.error('API Errors:', axiosError.response.data.errors);
    }
    return false;
  }
}
