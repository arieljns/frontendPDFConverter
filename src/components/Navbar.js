import React from 'react'
import navbarData from '../componentsData/navbarData'
import logoBps from "../assets/logo_bps.69c3246c.png"
import { motion } from 'framer-motion'
export default function Navbar() {

    return (
        <div>
            {navbarData.map((data) => {
                return (
                    <div className='navbar-container'>
                        <motion.img animate={{}} className='logo' src={logoBps} alt='logo BPS' />
                        <h1>{data.title}</h1>
                        <motion.a whileHover={{scale:1.1}} className='submenu' href={data.link}>{data.menu}</motion.a>
                    </div>

                )
            })}
        </div>
    )
}


