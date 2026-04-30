import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { fetchArticles, favoriteArticle, unfavoriteArticle } from '@/api/articles'
import type { ArticleParams } from '@/api/articles'
import type { Article } from '@/types'

export function useArticles(params?: ArticleParams) {
    return useQuery({
        queryKey: ['articles', params],
        queryFn: () => fetchArticles(params),
        placeholderData: keepPreviousData,
    })
}

export function useFavoriteMutation(slug: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (favorited: boolean) =>
            favorited ? unfavoriteArticle(slug) : favoriteArticle(slug),

        onMutate: async (favorited) => {
            await queryClient.cancelQueries({ queryKey: ['article', slug] })
            const prev = queryClient.getQueryData(['article', slug])
            queryClient.setQueryData(['article', slug], (old: Article) => ({
                ...old,
                favorited: !favorited,
                favoritesCount: favorited
                    ? old.favoritesCount - 1
                    : old.favoritesCount + 1,
            }))
            return { prev }
        },
        onError: (_err, _vars, ctx) => {
            queryClient.setQueryData(['article', slug], ctx?.prev)
        },
    })
}
