import { apiClient } from '@/api/client'
import type { Profile } from '@/types'

interface ProfileResponse {
    profile: Profile
}

export async function fetchProfile(username: string): Promise<Profile> {
    const { data } = await apiClient.get<ProfileResponse>(`/profiles/${username}`)
    return data.profile
}

export async function followUser(username: string): Promise<Profile> {
    const { data } = await apiClient.post<ProfileResponse>(`/profiles/${username}/follow`)
    return data.profile
}

export async function unfollowUser(username: string): Promise<Profile> {
    const { data } = await apiClient.delete<ProfileResponse>(`/profiles/${username}/follow`)
    return data.profile
}
