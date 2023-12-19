import { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { DarkThemeToggle } from 'flowbite-react';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [mealsDropdown, setMealsDropdown] = useState(false);
    const [ingredientsDropdown, setIngredientsDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [width, setWidth] = useState(window.innerWidth);
    let navigate = useNavigate();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const handleSearch = (e) => {
        e.preventDefault();
        const processedQuery = searchQuery.replace(/[,#/]/g, '').split(' ').join('-');
        navigate(`/search/${processedQuery}`);
    };
    const handleDropdownItemClick = (mealType) => {
        closeMobileMenu();
        navigate(`/meals/${mealType}`);
      };

    const toggleMealsDropdown = () => {
        setMealsDropdown(!mealsDropdown);
        setIngredientsDropdown(false);
    };

    const toggleIngredientsDropdown = () => {
        setIngredientsDropdown(!ingredientsDropdown);
        setMealsDropdown(false);
    };

    window.addEventListener("resize", () => setWidth(window.innerWidth));

    return (
        <>
            <nav className="bg-beveled-edge shadow-inner-highlight">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={closeMobileMenu}>
                        <img src='/images/logo_s.png' className='navbar-icon' alt="Logo" />
                        <span className="navbar-logo self-center text-2xl whitespace-nowrap">Eatsy</span>
                    </Link>
                    <div className="flex md:order-2">
                        <DarkThemeToggle className='bg-transparent shadow-none text-gray-400'/>
                        <div className="relative hidden md:block">
                            <form onSubmit={handleSearch} className="flex items-center rounded-lg bg-white border border-gray-300 ">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-4 py-2 w-full rounded-lg rounded-r-none focus:outline-none dark:bg-gray-800 dark:text-gray-100"
                                    name="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="px-4 rounded-lg rounded-l-none text-gray-500 bg-green-300 hover:bg-green-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300"
                                >
                                    <MdSearch className="h-10 w-5" />
                                </button>
                            </form>
                        </div>

                        <div style={width > 768 ? { display: "none" } : {}} className="menu-icon p-2 inline-flex text-gray-400 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                    </div>
                    <div style={click || width > 768 ? { display: "block" } : { display: "none" }} className='items-center justify-between w-full md:flex md:w-auto md:order-1'>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium text-xl md:space-x-9 lg:space-x-12 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li className="relative">
                                <NavLink to="/" onClick={closeMobileMenu} className="block py-2 px-3 text-orange-100 hover:text-green-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-950 md:p-0 md:dark:hover:text-green-950 dark:text-orange-100 dark:hover:bg-gray-700 dark:hover:text-orange-100 md:dark:hover:bg-transparent dark:border-gray-700">
                                    Meals
                                    <button onClick={toggleMealsDropdown} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
                                    ▼
                                </button>
                                </NavLink>
                                {/* Dropdown Menu */}
                                {mealsDropdown && (
                                    <div className="absolute z-10 bg-white rounded shadow-lg py-1 mt-1">
                                    <a href="#" onClick={() => handleDropdownItemClick('breakfast')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Breakfast</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('lunch')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lunch</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('dinner')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dinner</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('appetizers-snacks')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Appetizers & Snacks</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('salads')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Salads</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('side-dishes')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Side Dishes</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('soups')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Soups</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('bread')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bread</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('drinks')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Drinks</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('desserts')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Desserts</a>
                                    <a href="#" onClick={() => handleDropdownItemClick('all')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold">View All</a>
                                  </div>                                  
                                )}
                            </li>
                            <li>
                                <NavLink to="/" onClick={closeMobileMenu} className="block py-2 px-3 text-orange-100 hover:text-green-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-950 md:p-0 md:dark:hover:text-green-950 dark:text-orange-100 dark:hover:bg-gray-700 dark:hover:text-orange-100 md:dark:hover:bg-transparent dark:border-gray-700">
                                    Ingredients
                                    <button onClick={toggleIngredientsDropdown} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
                                    ▼
                                    </button>
                                </NavLink>
                                {ingredientsDropdown && (
                                    <div className="absolute z-10 bg-white rounded shadow-lg py-1 mt-1">
                                        <a href="#" onClick={() => handleDropdownItemClick('fruits')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fruits</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('vegetables')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vegetables</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('meats')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meats</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('dairy')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dairy</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('grains')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Grains</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('spices')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Spices</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('herbs')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Herbs</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('nuts-seeds')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nuts & Seeds</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('oils')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Oils</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('sweeteners')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sweeteners</a>
                                        <a href="#" onClick={() => handleDropdownItemClick('all-ingredients')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold">View All</a>
                                </div>
                                )}
                            </li>
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
                            {/* Add other navigation links as needed */}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
