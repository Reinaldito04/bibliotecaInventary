// components/Layout.js
'use client'
import { useState } from 'react';
import { FaHome, FaUser, FaCog, FaChartBar, FaBell, FaChevronLeft, FaChevronRight, FaBook } from 'react-icons/fa';
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className={`transition-width duration-300 bg-blue-900 text-white flex flex-col p-4 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex justify-between items-center mb-10">
          <h2 className={`text-2xl font-bold transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Dashboard</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-white hover:bg-blue-700 p-2 rounded"
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all">
            <FaHome className="text-lg" />
            <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Home</span>
          </Link>
          <Link href="/dashboard/books" className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all">
            <FaBook className="text-lg" />
            <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Libros</span>
          </Link>
          <a href="#" className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all">
            <FaCog className="text-lg" />
            <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Settings</span>
          </a>
          <a href="#" className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all">
            <FaChartBar className="text-lg" />
            <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Reports</span>
          </a>
        </nav>
      </aside>
  
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-gray-900">
              <FaBell className="text-xl" />
              <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-600 hover:text-gray-900">Profile</button>
          </div>
        </header>
  
        {/* Page Content */}
        <main className="p-6 flex-grow bg-white shadow-lg rounded-lg m-4 overflow-auto max-h-[calc(100vh-7rem)]"> {/* Ajusta la altura máxima según sea necesario */}
          {children}
        </main>
      </div>
    </div>
  );
}
