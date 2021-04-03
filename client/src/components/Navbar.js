import React, { useState, useEffect } from "react"
import { NavLink, Link, useHistory } from "react-router-dom"
import logo from "../assests/logo.png"
import mobileLogo from "../assests/mobileLogo.png"
import hamburger from "../assests/hamburger.png"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux'
import { AccountDropdown } from './AccountDropdown'
import AdminMenu from './AdminMenu'
import SearchGame from './boardGames/SearchGame'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false)

  const history = useHistory()

  const logout = () => {
    dispatch(logoutUser())
    .then(() => {
      setIsMobile(false)
      toast.success('Signed out Successfully')
      history.push('/')
    })
  }

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile)
  }

  const closeMobileMenu = () => {
    setIsMobile(false)
  }

  useEffect(() => {
    window.addEventListener('resize', (() => {
      if(window.innerWidth >= 768) setIsMobile(false)
    }))
  }, [])

  return (
    <nav className="sm:h-16 bg-gray-200 font-body">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-2">
            {/* logo */}
            <div>
              <NavLink
                to="/" exact
                className="flex items-center py-5 px-2 transform hover:scale-125 transition-all duration-300 ease-in-out"
              >
                <img className="h-6 w-19 mr-1 hidden sm:block" src={logo} alt="BoardGameLab" />
                <img className="h-6 w-19 mr-1 sm:hidden" src={mobileLogo} alt="BoardGameLab" />
              </NavLink>
            </div>

            {/* primary nav */}
            <div className="hidden sm:flex items-center space-x-1">
              <NavLink
                to="/games"
                className="py-5 px-2 text-gray-500 hover:bg-gray-500 hover:text-gray-100 uppercase text-sm"
                activeClassName="active-navbar"
              >
                Games
              </NavLink>
              <NavLink
                to="/about"
                className="py-5 px-2 text-gray-500 hover:bg-gray-500 hover:text-gray-100 uppercase text-sm"
                activeClassName="active-navbar"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="py-5 px-2 text-gray-500 hover:bg-gray-500 hover:text-gray-100 uppercase text-sm"
                activeClassName="active-navbar"
              >
                Contact
              </NavLink>
              { (user.isLogin && user.userData.role === 'admin') && 
                <AdminMenu />
              }
            </div>
          </div>

          <div className='mt-1'>
            <SearchGame />
          </div>
          {/* secondary nav */}

          <div className="hidden md:flex items-center space-x-1">
            {user.isLogin 
            ? ( <AccountDropdown user={user.userData} onLogout={logout} /> ) 
            : (
              <>
                <Link
                  to="/login"
                  className="my-2 btn-round text-primary  hover:bg-primary"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="my-2 btn-round text-primary  hover:bg-primary"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* mobile button goes here */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button focus:outline-none" onClick={toggleMobileMenu}>
              {isMobile ? (
                  <svg 
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                ) : (
                  // <svg
                  //   className="w-6 h-6"
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   fill="none"
                  //   viewBox="0 0 24 24"
                  //   stroke="currentColor"
                  // >
                  //   <path
                  //     strokeLinecap="round"
                  //     strokeLinejoin="round"
                  //     strokeWidth="2"
                  //     d="M4 6h16M4 12h16M4 18h16"
                  //   />
                  // </svg>
                  <img className='w-6 h-6' src={hamburger} alt="hamburger"/>
                )
              }
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {isMobile && (
        <div className="mobile-menu md:hidden flex flex-col items-center justify-start">
          <NavLink
            to="/games"
            className="py-1 px-3 text-gray-500 hover:bg-gray-500 hover:text-gray-100 rounded-full uppercase text-sm"
            activeClassName="active-navbar" onClick={closeMobileMenu}
          >
            Games
          </NavLink>
          <NavLink
            to="/about"
            className="py-1 px-3 text-gray-500 hover:bg-gray-500 hover:text-gray-100 rounded-full uppercase text-sm"
            activeClassName="active-navbar" onClick={closeMobileMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="mb-2 py-1 px-3 text-gray-500 hover:bg-gray-500 hover:text-gray-100 rounded-full uppercase text-sm"
            activeClassName="active-navbar" onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
          {(user.isLogin && user.userData.role === 'admin') && 
            <>
              <NavLink
                to='/admin/users'
                className="mb-2 py-1 px-3 text-gray-500 hover:bg-primary hover:text-white rounded-full uppercase text-sm"
                onClick={closeMobileMenu}
              >
                User Management
              </NavLink>
              {/* <NavLink
                to='/admin/settings'
                className="mb-2 py-1 px-3 text-gray-500 hover:bg-primary hover:text-white rounded-full uppercase text-sm"
                onClick={closeMobileMenu}
              >
                Settings
              </NavLink> */}
            </>
          }
          

          <div className=" mb-2  px-4 py-3 border-t border-gray-800">
            {user.isLogin 
            ? (
                <>
                  <div className='flex items-center justify-center space-x-3'>
                    <img className="w-8 h-8 rounded-full object-cover border-2 border-gray-600" src={`${process.env.REACT_APP_PROFILE_URL}/${user.userData.avatar}`} alt="Profile"/>
                    <span className='text-gray-600 text-sm'>{user.userData.name}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Link
                      to='/profile'
                      className="my-2 btn-round text-primary border-primary hover:bg-primary"
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                    <Link
                      to='/'
                      className="my-2 btn-round text-primary border-primary hover:bg-primary"
                      onClick={() => {
                        closeMobileMenu()
                        logout()
                      }}
                    >
                      Sign out
                    </Link>
                  </div>
                </>
              ) 
            : (                
                <div className='flex items-center space-x-2'>
                  <Link
                    to="/login"
                    className="my-2 btn-round text-primary border-primary hover:bg-primary"
                    onClick={closeMobileMenu}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="my-2 btn-round text-primary border-primary hover:bg-primary"
                    onClick={closeMobileMenu}
                  >
                    Sign up
                  </Link>
                </div>
            )}
          </div>
        </div>
      )}
      
    </nav>
  )
}


export default Navbar
