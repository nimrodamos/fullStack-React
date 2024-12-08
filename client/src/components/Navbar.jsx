import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";

const menuLinks = [
  { to: "/Home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/", label: "LogOut" },
];

const MenuItems = ({ onClick }) => (
  <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-center">
    {menuLinks.map((link, index) => (
      <li
        key={index}
        className="transition-transform duration-200 hover:scale-110"
      >
        <Link
          to={link.to}
          className="text-white text-lg transition-transform duration-200 hover:text-gray-300"
          onClick={onClick}
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Alternar Dark Mode
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  }, [darkMode]);

  // Carregar o estado inicial do Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Função para alternar o estado do menu
  const toggleMenu = useCallback(() => {
    setIsHovered((prev) => !prev);
  }, []);

  // Função para fechar o menu clicando fora dele
  const closeMenu = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <nav className="bg-project-color dark:bg-project-color-dark text-white p-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo no canto esquerdo */}
        <h1 className="text-2xl font-bold flex-shrink-0 pl-4 md:pl-0">
          Social Media
        </h1>

        {/* Barra de busca centralizada */}
        <form className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full max-w-md mx-4 md:mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-gray-800 w-full outline-none px-2"
          />
          <button type="submit" className="text-gray-500">
            <FiSearch className="text-xl" />
          </button>
        </form>

        {/* Itens do menu e Dark Mode */}
        <div className="hidden md:flex items-center space-x-6 pr-4 md:pr-0">
          <MenuItems />
          {/* Ícone de Dark Mode */}
          <div
            className="cursor-pointer text-2xl transition-colors duration-200"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="text-orange-500" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </div>
        </div>

        {/* Ícone de Dark Mode para mobile */}
        <div
          className="md:hidden cursor-pointer text-2xl ml-4"
          onClick={toggleDarkMode}
          title="Toggle Dark Mode"
        >
          {darkMode ? (
            <FaSun className="text-orange-500" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </div>

        {/* Ícone hambúrguer para mobile */}
        <div className="md:hidden relative z-50 cursor-pointer ml-4">
          <FiMenu
            className="text-white text-3xl"
            aria-label="Menu"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Sidebar no mobile */}
      {isHovered && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30"
            onClick={closeMenu}
          ></div>
          <div
            className="fixed top-16 right-0 bg-gray-800 text-white p-6 rounded-l-md z-40 shadow-lg transition-transform duration-300"
            style={{
              width: "250px",
            }}
          >
            <MenuItems onClick={closeMenu} />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
