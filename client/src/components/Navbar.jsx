
    import  {useState} from 'react'
    import { Link, useNavigate } from 'react-router-dom'
    import { NavLink } from 'react-router-dom'
    import "./Navbar.css"
    import {FaBars, FaTimes} from "react-icons/fa"
    
import {  DarkThemeToggle } from 'flowbite-react'
import { MdSearch } from 'react-icons/md'
    
    
    const Navbar = () => {
      const[click, setClick] = useState(false)
      const[searchQuery, setSearchQuery] = useState('')
      const[width, setWidth] = useState(window.innerWidth)
      let navigate = useNavigate() 
      
      const handleClick = () =>  setClick(!click)
      const closeMobileMenu = () => {setClick(false); window.scrollTo(0, 0)}
      const handleSearch = (e) => {
        e.preventDefault()
        const processedQuery = searchQuery.replace(/[,#/]/g, '').split(' ').join('-');
        navigate(`/search/${processedQuery}`)
      }
     
      
    window.addEventListener("resize", ()=>{setWidth(window.innerWidth)});
     
      return (
        <>
        
<nav className="bg-beveled-edge shadow-inner-highlight">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={closeMobileMenu} >
      <img src='/images/logo_s.png' className='navbar-icon'
      />
      <span className="navbar-logo self-center text-2xl whitespace-nowrap ">Eatsy</span>
  </Link>
  <div className="flex md:order-2">
   
   
    <DarkThemeToggle className='bg-transparent shadow-none text-gray-400'/>
    <div className="relative hidden md:block">
    
      <form onSubmit={(e)=>handleSearch(e)} className="flex items-center rounded-lg bg-white border border-gray-300 ">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 w-full rounded-lg rounded-r-none focus:outline-none dark:bg-gray-800 dark:text-gray-100"
        name="search"
        value={searchQuery} 
        onChange={(e)=>setSearchQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="px-4 rounded-lg rounded-l-none text-gray-500 bg-green-300 hover:bg-green-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
      >
        <MdSearch className="h-10 w-5" />
      </button>  
    </form>
    </div>
   
    <div style={width>768? {display:"none"}: {} } className="menu-icon p-2 inline-flex text-gray-400 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={handleClick}>
                  {click? <FaTimes/>:<FaBars/>}
                </div>
  </div>
    <div style={click||width>768 ? {display:"block"}:{display:"none"}} className='items-center justify-between w-full md:flex md:w-auto md:order-1 float'>
      <div className="relative mt-3 md:hidden">
        
        <form onSubmit={(e)=>handleSearch(e)} className="flex items-center rounded-lg bg-white border border-gray-300">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 w-full rounded-lg rounded-r-none focus:outline-none border dark:bg-gray-800"
        name="search"
        value={searchQuery} 
        onChange={(e)=>setSearchQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="px-4 h-11 rounded-lg rounded-l-none text-gray-500 bg-green-300 hover:bg-green-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
      >
        <MdSearch className="h-5 w-5" />
      </button> 
    </form>   
       </div>
      <ul style={{fontFamily:'CormorantGaramond-SemiBold'}} className="flex flex-col p-4 md:p-0 mt-4 font-medium text-xl  md:space-x-9 lg:space-x-12 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0    ">
        <li>
        <NavLink to="/" onClick={closeMobileMenu}  className={({isActive})=>{return `block py-2 px-3 text-orange-100 hover:text-green-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-950 md:p-0 md:dark:hover:text-green-950 dark:text-orange-100 dark:hover:bg-gray-700 dark:hover:text-orange-100 md:dark:hover:bg-transparent dark:border-gray-700 ${isActive? ' md:underline-custom ': ' '}`}} >
           Home
        </NavLink>
        </li>
        <li >
            <NavLink onClick={closeMobileMenu} to="/login" className={({isActive})=>{return `block py-2 px-3 text-orange-100 hover:text-green-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-950 md:p-0 md:dark:hover:text-green-950 dark:text-orange-100 dark:hover:bg-gray-700 dark:hover:text-orange-100 md:dark:hover:bg-transparent dark:border-gray-700 ${isActive? ' md:underline-custom ': ' '}`}}>
              Log-In
            </NavLink>
        </li>
        <li >
          <NavLink onClick={closeMobileMenu} to="/signup" className={({isActive})=>{return `block py-2 px-3 text-orange-100 hover:text-green-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-950 md:p-0 md:dark:hover:text-green-950 dark:text-orange-100 dark:hover:bg-gray-700 dark:hover:text-orange-100 md:dark:hover:bg-transparent dark:border-gray-700 ${isActive? ' md:underline-custom ': ' '}`}}>
            Sign-Up
          </NavLink>
        </li>
                  
      </ul>
  </div>
    </div>
</nav>




        </>
      )
    }
    
    export default Navbar
    