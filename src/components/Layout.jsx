import React from 'react'
import '../scss/main.scss'

import Header from './Header.jsx'

const Template = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
)

export default Template
