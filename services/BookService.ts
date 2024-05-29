import * as ApiService from './ApiService';

export const getAllAsync = (params: {page?: number, per_page?: number, free?: boolean, category_ids?: string, sort_by?:string}) => {
  return ApiService.get('/app/books', {params: {per_page: 20, sort_by: 'created_at-desc', ...params}});
}

export const getDetailAsync = (id: number) => ApiService.get(`/app/books/${id}`);

export const getFavoritedAsync = (params: {page?: number, per_page?: number}) => {
  return ApiService.get('/app/books/favorited', {params: {per_page: 20, ...params}});
}

export const getUpComingAsync = (params: {page?: number, per_page?: number}) => {
  return ApiService.get('/app/books/up_coming', {params: {per_page: 20, ...params}});
}

export const getReadAsync = (params: {page?: number, per_page?: number}) => {
  return ApiService.get('/app/books/read', {params: {per_page: 20, ...params}});
}

export const favoriteAsync = (id: number, like: boolean) => {
  return like ? ApiService.post(`/app/books/${id}/favorite`) : ApiService.delete(`/app/books/${id}/unfavorite`);
}

export const getChapterAsync = (chapter_id: number) => ApiService.get(`/app/chapters/${chapter_id}`);

export const getSuggestKeywordsAsync = (query: string) => ApiService.get(`/app/books/searching`, {params: {query}});
