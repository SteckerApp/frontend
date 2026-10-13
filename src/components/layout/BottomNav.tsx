import { Icons, paths } from '@/constants';
import { affiliateArray, clientArray, footerLinks, footerLinks2, routeItem } from '@/data/routes.data';
import { Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = ({ isAffiliate } : { isAffiliate?: boolean}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const clientRoutes = routeItem?.filter((route) => clientArray.includes(route.assign)) || [];
  const affiliateRoutes = routeItem?.filter((route) => affiliateArray.includes(route.assign)) || [];


  const renderMenu = isAffiliate ? affiliateRoutes?.slice(4, 6) : clientRoutes?.slice(3, 7)
  const footerLinksToRender = isAffiliate? footerLinks2?.slice(0, 2) : footerLinks?.slice(0, 2);
  const footerLinksToRender2 = isAffiliate? footerLinks2?.slice(2) : footerLinks?.slice(2);

  // Close drawer and hide footer on screen resize
  useEffect(() => {
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOpen(false); // Close the drawer if open
      }
    };

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  // Helper function for rendering footer links
  const renderFooterLink = (link: { to: string; icon: string; label: string }, idx: number) => {
    const { to, icon, label } = link;
    const isActive = location.pathname.startsWith(to);
  
    return (
      <Link
        key={to || `link-${idx}`}
        to={to}
        className={`flex justify-center items-center flex-col ${isActive ? 'text-primary' : 'text-gray'}`}
      >
        <img src={icon} alt={label || `Footer link ${idx}`} />
        <span className="text-12 font-medium font-outfit">{label}</span>
      </Link>
    );
  };
  

  return (
    <>
      <footer className="flex justify-between items-end gap-4 lg:hidden fixed bottom-0 right-0 left-0 bg-white shadow-md px-4 pb-4 pt-3">
        {/* Render first two footer links */}
        {footerLinksToRender?.map((link, idx) => renderFooterLink(link, idx))}

        {/* Center floating button */}
        <Link
          to={paths.dashboardRequest}
          className="flex justify-center items-center flex-col text-gray bg-dashboardBg rounded-[50%] w-[5rem] h-[5rem] -mt-8"
        >
          <img src={Icons.PlusMenuIcon} alt="Add new" />
        </Link>

        {/* Render remaining footer links */}
        {footerLinksToRender2?.map(({ to, icon, label }, idx) =>
          to ? (
            renderFooterLink({ to, icon, label }, idx)
          ) : (
            <p
              key={`drawer-${idx}`}
              onClick={() => setOpen(true)}
              className="flex justify-center items-center flex-col text-gray cursor-pointer"
            >
              <img src={icon} alt={label || `Footer drawer link ${idx}`} />
              <span className="text-12 font-medium font-outfit text-gray">{label}</span>
            </p>
          )
        )}
      </footer>

      {/* Drawer for additional links */}
      <Drawer
        title={null}
        placement="bottom"
        closable={false}
        height={250}
        onClose={() => setOpen(false)}
        open={open}
        className="rounded-tl-32 rounded-tr-32 text-gray"
      >
        <p className="text-16 font-medium font-outfit text-gray pb-2">Others</p>
        {renderMenu?.map((item, idx) => (
          <Link
            key={item.path || `client-route-${idx}`}
            to={item.path}
            className={`flex justify-start items-center hover:text-primary gap-3 py-2 ${
              location.pathname === item.path ? 'text-primary' : 'text-gray'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </Drawer>
    </>
  );
};

export { BottomNav };
