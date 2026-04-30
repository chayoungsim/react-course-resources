import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(1, '비밀번호를 입력하세요.'),
})

type FormValues = z.infer<typeof schema>

const Login = () => {
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
            const user = await loginUser(values.email, values.password)
            setUser(user)
            navigate('/')
        } catch {
            setError('root', { message: '이메일 또는 비밀번호가 올바르지 않습니다.' })
        }
    }

    return (
        <div className="max-w-sm mx-auto px-4 py-10 text-left">
            <div className="text-center mb-6">
                <h2 className="text-[#211922]">Sign in</h2>
                <p className="text-sm text-[#62625b] mt-2">
                    <Link to="/register" className="text-[#e60023] hover:underline">
                        Need an account?
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
                    {isSubmitting ? '처리 중...' : 'Sign in'}
                </button>
            </form>
        </div>
    )
}

export default Login
