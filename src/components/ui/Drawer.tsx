import { Icons } from '@/constants';
import React from 'react';
import { Outlet } from 'react-router-dom';

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: number;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ isOpen, onClose, width = 300, children }) => {
  return (
    <>
      <div
        className={`custom-drawer ${isOpen ? 'open' : ''}`}
        style={{ width: `${width}px` }}
        aria-label="Custom drawer"
      >
        <div className="drawer-content">
          <button className="close-btn" onClick={onClose}>
            <Icons.CancelIcon size={25} />
          </button>
          {children || <Outlet />} 
        </div>
      </div>

      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}
    </>
  );
};

export default CustomDrawer;
