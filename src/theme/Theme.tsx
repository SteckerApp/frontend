import React from 'react';
import { ConfigProvider } from 'antd';

export const ThemeConfig = ({ children } : { children: React.ReactNode}) => {
  return (
    <ConfigProvider
    theme={{
        token: {
            colorPrimary: `rgba(18, 39, 226, 1)`,
            colorPrimaryBg: `#E7E9FC`,
            colorBorder: `rgba(18, 39, 226, 1)`,
            colorPrimaryBgHover: "none",
            colorPrimaryBorderHover: "none",
            colorBorderBg: "none",
            boxShadow: "none",
            boxShadowSecondary: "none",
            colorBgLayout: "transparent", 
            borderRadiusOuter: 0,
            boxShadowTertiary: "none",
            colorBgBlur: "none",
            colorBorderSecondary: "none",      
        },
        components: {
          Table: {
            borderColor: `var(--colorTableBorder)`
          }
        },
      }}
  >
    {children}
  </ConfigProvider>
  )
}



