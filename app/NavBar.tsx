'use client'
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoBugSharp } from "react-icons/io5";

const NavBar = () => {
  const links =[{
    label: 'dashboard', href: '/'
  },{
    label: 'issues', href: '/issues'    
  },
  {
    label: 'about', href: '/about'
  }
  ]

  const currentPath = usePathname();

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><IoBugSharp /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => (
              <li key={link.href}>
                <Link 
                // className={` hover:text-zinc-800 transition-colors ${currentPath === link.href ? 'font-bold text-zinc-800' : 'text-zinc-500'}`} 
                className={classNames({
                  'text-zinc=900': currentPath === link.href,
                  'text-zinc-500': currentPath !== link.href,
                  'hower:text-zinc-800': true,
                  'transition-colors': true,
                })}
                href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
    </nav>
  )
}

export default NavBar