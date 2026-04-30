

import type { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (partial: Partial<User>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기값
      user: null,

      // 로그인 성공 시 유저 정보 저장
      setUser: (user) => set({ user }),

      // 설정 페이지에서 프로필 일부만 수정할 때
      updateUser: (partial) => {
        const current = get().user
        if (!current) return
        set({ user: { ...current, ...partial } })
      },

      // 로그아웃
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',                    // localStorage 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
)