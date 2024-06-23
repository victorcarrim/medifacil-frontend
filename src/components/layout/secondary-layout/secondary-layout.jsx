import React from 'react'
import { LayoutBg, LayoutBgContainer, LayoutLogoContainer } from './secondary-layout.style.ts'
import LogoCompleta from '../../../assets/logo-completa.png';

export function SecondaryLayout({ children }) {
  return (
    <LayoutBg>
      <LayoutBgContainer>
        <LayoutLogoContainer>
          <img src={LogoCompleta} alt="" />
          <p>Gerenciamento de receitas médicas</p>
        </LayoutLogoContainer>
        {children}
      </LayoutBgContainer>
    </LayoutBg>
  )
}
