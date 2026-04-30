import { apiClient } from '@/api/client'
import type { Article } from '@/types'

export interface ArticleParams {
    tag?: string
    author?: string
    favorited?: string
    limit?: number
    offset?: number
}

interface ArticlesResponse {
    articles: Article[]
    articlesCount: number
}

export async function fetchArticles(params?: ArticleParams): Promise<ArticlesResponse> {
    const { data } = await apiClient.get<ArticlesResponse>('/articles', { params })
    return data
}

export async function fetchArticle(slug: string): Promise<Article> {
    const { data } = await apiClient.get<{ article: Article }>(`/articles/${slug}`)
    return data.article
}

export interface CreateArticleInput {
    title: string
    description: string
    body: string
    tagList: string[]
}

export async function createArticle(input: CreateArticleInput): Promise<Article> {
    const { data } = await apiClient.post<{ article: Article }>('/articles', { article: input })
    return data.article
}

export async function favoriteArticle(slug: string): Promise<Article> {
    const { data } = await apiClient.post<{ article: Article }>(`/articles/${slug}/favorite`)
    return data.article
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
    const { data } = await apiClient.delete<{ article: Article }>(`/articles/${slug}/favorite`)
    return data.article
}
