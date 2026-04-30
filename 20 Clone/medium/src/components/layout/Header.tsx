import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const Header = () => {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-[#e5e5e0]">
            <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.5px' }}>
                <Link to="/" style={{ color: '#e60023' }}>Medium clone</Link>
            </h1>
            <nav className="flex items-center gap-4">
                <Link to="/" className="text-sm text-[#62625b] hover:text-[#211922]">
                    Home
                </Link>

                {user ? (
                    <>
                        <Link
                            to="/editor"
                            className="text-sm text-[#62625b] hover:text-[#211922] flex items-center gap-1"
                        >
                            ✏ New Article
                        </Link>
                        <Link
                            to="/settings"
                            className="text-sm text-[#62625b] hover:text-[#211922] flex items-center gap-1"
                        >
                            ⚙ Settings
                        </Link>
                        <Link
                            to={`/profile/${user.userName}`}
                            className="flex items-center gap-1.5 text-sm text-[#211922] hover:text-[#e60023]"
                        >
                            <img
                                src={user.image ?? 'https://www.gravatar.com/avatar/?d=mp'}
                                alt={user.userName}
                                className="w-6 h-6 rounded-full"
                            />
                            {user.userName}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-[#62625b] hover:text-[#211922]"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm text-[#62625b] hover:text-[#211922]">
                            Sign in
                        </Link>
                        <Link to="/register" className="btn-primary">
                            Sign up
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
