import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
    username: z.string().min(1, '사용자명을 입력하세요.'),
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
})

type FormValues = z.infer<typeof schema>

const Register = () => {
    const navigate = useNavigate()
    const { setUser } = useAuthStore()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) })

    const onSubmit = async (values: FormValues) => {
        try {
            const user = await registerUser(values.username, values.email, values.password)
            setUser(user)
            navigate('/')
        } catch (err: unknown) {
            const data = (err as { response?: { data?: { errors?: Record<string, string[]> } } })
                ?.response?.data?.errors
            if (data) {
                Object.entries(data).forEach(([field, messages]) => {
                    const key = field === 'username' ? 'username' : field === 'email' ? 'email' : 'password'
                    setError(key as keyof FormValues, { message: `${field} ${messages[0]}` })
                })
            } else {
                setError('root', { message: '회원가입에 실패했습니다. 다시 시도해주세요.' })
            }
        }
    }

    return (
        <div className="max-w-sm mx-auto px-4 py-10 text-left">
            <div className="text-center mb-6">
                <h2 className="text-[#211922]">Sign up</h2>
                <p className="text-sm text-[#62625b] mt-2">
                    <Link to="/login" className="text-[#e60023] hover:underline">
                        Have an account?
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {errors.root && (
                    <p className="text-[#9e0a0a] text-sm text-center">{errors.root.message}</p>
                )}

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

                <div className="flex flex-col gap-1">
                    <input
                        type="password"
                        className="form-control w-full"
                        placeholder="Password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-[#9e0a0a] text-xs">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary lg self-end disabled:opacity-50"
                >
                    {isSubmitting ? '처리 중...' : 'Sign up'}
                </button>
            </form>
        </div>
    )
}

export default Register
