import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer style={{ background: '#33332e' }} className="mt-auto">
            <div className="max-w-[1360px] mx-auto px-6 py-8 flex flex-col items-center gap-4">
                <Link
                    to="/"
                    className="text-white font-bold text-lg"
                    style={{ letterSpacing: '-0.5px' }}
                >
                    conduit
                </Link>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <Link
                        to="/"
                        className="text-[#91918c] hover:text-white text-xs transition-colors"
                    >
                        Home
                    </Link>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#91918c] hover:text-white text-xs transition-colors"
                    >
                        GitHub
                    </a>
                    <Link
                        to="/register"
                        className="text-[#91918c] hover:text-white text-xs transition-colors"
                    >
                        Sign up
                    </Link>
                </div>
                <p className="text-[#91918c] text-xs">
                    © {new Date().getFullYear()} conduit. An interactive learning project.
                </p>
            </div>
        </footer>
    )
}

export default Footer
