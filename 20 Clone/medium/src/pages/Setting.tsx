import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
    image: z.string().url('올바른 URL 형식이 아닙니다.').or(z.literal('')),
    username: z.string().min(1, '사용자명을 입력하세요.'),
    bio: z.string(),
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

const Setting = () => {
    const navigate = useNavigate()
    const { user, setUser, logout } = useAuthStore()

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            image: user?.image ?? '',
            username: user?.userName ?? '',
            bio: user?.bio ?? '',
            email: user?.email ?? '',
            password: '',
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            const payload = {
                image: values.image || undefined,
                username: values.username,
                bio: values.bio || undefined,
                email: values.email,
                password: values.password || undefined,
            }
            const updated = await updateUser(payload)
            setUser(updated)
            navigate(`/profile/${updated.userName}`)
        } catch (err: unknown) {
            const data = (err as { response?: { data?: { errors?: Record<string, string[]> } } })
                ?.response?.data?.errors
            if (data) {
                Object.entries(data).forEach(([field, messages]) => {
                    const key = (['image', 'username', 'bio', 'email', 'password'] as const)
                        .find((k) => k === field) ?? 'root'
                    setError(key as keyof FormValues, { message: `${field} ${messages[0]}` })
                })
            } else {
                setError('root', { message: '설정 저장에 실패했습니다. 다시 시도해주세요.' })
            }
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    if (!user) return null

    return (
        <div className="max-w-lg mx-auto px-4 py-10 text-left">
            <h2 className="text-[#211922] text-center mb-8">Your Settings</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {errors.root && (
                    <p className="text-[#9e0a0a] text-sm text-center">{errors.root.message}</p>
                )}

                {/* 프로필 이미지 URL */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        className="form-control w-full"
                        placeholder="URL of profile picture"
                        {...register('image')}
                    />
                    {errors.image && (
                        <p className="text-[#9e0a0a] text-xs">{errors.image.message}</p>
                    )}
                </div>

                {/* 사용자명 */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        className="form-control w-full"
                        placeholder="Username"
                        {...register('username')}
                    />
                    {errors.username && (
                        <p className="text-[#9e0a0a] text-xs">{errors.username.message}</p>
                    )}
                </div>

                {/* 자기소개 */}
                <div className="flex flex-col gap-1">
                    <textarea
                        rows={5}
                        className="form-control w-full resize-none"
                        placeholder="Short bio about you"
                        {...register('bio')}
                    />
                    {errors.bio && (
                        <p className="text-[#9e0a0a] text-xs">{errors.bio.message}</p>
                    )}
                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        className="form-control w-full"
                        placeholder="Email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-[#9e0a0a] text-xs">{errors.email.message}</p>
                    )}
                </div>

                {/* 새 비밀번호 */}
                <div className="flex flex-col gap-1">
                    <input
                        type="password"
                        className="form-control w-full"
                        placeholder="New Password (변경할 경우에만 입력)"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-[#9e0a0a] text-xs">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || !isDirty}
                        className="btn-primary lg disabled:opacity-50"
                    >
                        {isSubmitting ? '저장 중...' : 'Update Settings'}
                    </button>
                </div>
            </form>

            <hr className="my-8 border-[#e5e5e0]" />

            <button
                onClick={handleLogout}
                className="text-sm text-[#9e0a0a] hover:underline"
            >
                Or click here to logout.
            </button>
        </div>
    )
}

export default Setting
