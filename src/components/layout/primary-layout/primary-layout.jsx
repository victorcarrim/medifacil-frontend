import React from 'react'
import { Navbar } from '../../nav/nav-bar'

export const PrimaryLayout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}
