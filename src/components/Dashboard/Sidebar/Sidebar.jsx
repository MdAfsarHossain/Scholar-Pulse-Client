import { useState } from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import { FcSettings } from 'react-icons/fc'
import { GrLogout } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Shared/LoadingSpinner'
import AdminMenu from './Menu/AdminMenu'
import MenuItem from './Menu/MenuItem'
import ModeratorMenu from './Menu/ModeratorMenu'
import UserMenu from './Menu/UserMenu'

const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(false)
    const [role, isLoading] = useRole()

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='z-10 bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to="/" className={`text-2xl lg:text-3xl uppercase font-bold`}>
                            Scholar<span className="text-[#0AB99D]">Pulse</span>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div
                            // md:flex
                            className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-white mx-auto z-10'>
                            <Link to="/" className={`text-2xl uppercase font-bold`}>
                                Scholar<span className="text-[#0AB99D]">Pulse</span>
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6 z-10'>
                        <nav>
                            {role === 'Admin' && <AdminMenu />}
                            {role === 'Moderator' && <ModeratorMenu />}
                            {role === 'User' && <UserMenu />}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    <MenuItem
                        icon={FcSettings}
                        label='Profile'
                        address='/dashboard'
                    />
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar
