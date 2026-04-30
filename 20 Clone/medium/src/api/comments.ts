import { apiClient } from '@/api/client'
import type { Comment } from '@/types'

interface CommentsResponse {
    comments: Comment[]
}

export async function fetchComments(slug: string): Promise<Comment[]> {
    const { data } = await apiClient.get<CommentsResponse>(`/articles/${slug}/comments`)
    return data.comments
}

export async function addComment(slug: string, body: string): Promise<Comment> {
    const { data } = await apiClient.post<{ comment: Comment }>(`/articles/${slug}/comments`, {
        comment: { body },
    })
    return data.comment
}

export async function deleteComment(slug: string, commentId: number): Promise<void> {
    await apiClient.delete(`/articles/${slug}/comments/${commentId}`)
}
