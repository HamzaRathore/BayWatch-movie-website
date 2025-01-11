import React from 'react'
import { mobileNavigation } from '../constants/Navigation'
import { NavLink } from 'react-router-dom'



const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-black  fixed bottom-0 w-full text-neutral-400 z-40 bg-opacity-70 backdrop-blur-3xl'>
      <div className='flex  items-center justify-between text-neutral-400'>
        {
            mobileNavigation.map((nav)=>{
                return (
                    <NavLink
                    
                    key={nav.label + "mobilenavigation"}
                    to={nav.href} className={({isActive})=>`px-3 flex  items-center flex-col justify-center h-full py-2 ${isActive && "text-white"}` }>
                        <div className='text-2xl'>
                            {
                                nav.icon
                            }
                        </div>
                        <p>{nav.label}</p>
                    </NavLink>
                )
            })
        }

      </div>
    </section>
  )
}

export default MobileNavigation
