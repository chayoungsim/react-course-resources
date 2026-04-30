import { apiClient } from '@/api/client'
import type { User } from '@/types'

interface UserResponse {
    user: {
        email: string
        token: string
        username: string
        bio: string | null
        image: string | null
    }
}

function mapUser(raw: UserResponse['user']): User {
    return {
        email: raw.email,
        token: raw.token,
        userName: raw.username,
        bio: raw.bio,
        image: raw.image,
    }
}

export async function registerUser(
    username: string,
    email: string,
    password: string,
): Promise<User> {
    const { data } = await apiClient.post<UserResponse>('/users', {
        user: { username, email, password },
    })
    return mapUser(data.user)
}

export async function loginUser(email: string, password: string): Promise<User> {
    const { data } = await apiClient.post<UserResponse>('/users/login', {
        user: { email, password },
    })
    return mapUser(data.user)
}

export interface UpdateUserInput {
    image?: string
    username?: string
    bio?: string
    email?: string
    password?: string
}

export async function updateUser(input: UpdateUserInput): Promise<User> {
    const { data } = await apiClient.put<UserResponse>('/user', { user: input })
    return mapUser(data.user)
}
