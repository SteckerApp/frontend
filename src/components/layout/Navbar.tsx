import { Icons, paths } from '@/constants';
import { Avatar, Badge, Skeleton,} from 'antd'; // Keeping Avatar and Badge from Ant Design if needed
import { useState, useRef, } from 'react';
import { SidebarDrawer } from '../ui';
import { AddAccount, CustomModal, ProfileBar } from '../commons';
import { spark } from '@/config';
import { Link, } from 'react-router-dom';
import { apiServices } from '@/services';

const Navbar = ({ isAffiliate } : { isAffiliate?: boolean}) => {
  // const user    = useSelector(selectUser)
  const { data: profile, isLoading } = apiServices.useGetMeQuery();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const triggerNode = useRef<HTMLDivElement | null>(null);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const toggleOpenAccount = () => {
    setIsAddAccountOpen((prev) =>!prev);
    setIsDrawerOpen(false)
  }

  return (
    <div className="relative parent-container mb-[5.5rem]"> {/* Parent container is relative */}
      <div className='flex bg-white lg:bg-transparent justify-between items-center px-5 md:px-10 py-5 w-full fixed top-0 z-50'>
        <section className='justify-center items-center bg-white px-3 rounded-10 w-full hidden sm:flex md:w-[25rem]'>
          <input
            placeholder='Search team member'
            aria-label='Search team member'
            className='bg-transparent py-3 text-16 font-normal font-outfit w-full search_nav '
          />
          <Icons.SearchIcon className='text-primary cursor-pointer' size={24} />
        </section>
        <img
          src={Icons.Logo}
          alt="Logo"
          className="cursor-pointer block md:hidden"
        />
        <section className='flex justify-center items-center gap-4 lg:w-[45.5rem]'>
          {isAffiliate ? null : 
          <Link to={paths.dashboardNotify} className='flex justify-center items-center'>        
            <Badge dot className='flex cursor-pointer'>
              <Icons.BellIcon size={30} />
            </Badge>
            <span className='text-black text-15 font-normal font-outfit'>12</span>
          </Link>
          }
          <Avatar className='border-2 border-border' shape='circle' size={40} src={isLoading ? <Skeleton.Avatar shape='circle' size={40} /> : spark.apiBaseUrl + profile?.data?.user?.avatar} />
          <article
            className='flex justify-center items-center gap-2 cursor-pointer'
            onClick={handleToggleMenu}
            aria-expanded={isDrawerOpen}
            aria-label="Toggle menu"
            ref={triggerNode}
          >
            <p className='text-16 font-medium font-outfit text-black hidden sm:flex'>
              Hello! <span className='font-bold ml-2'>{isLoading ? <Skeleton.Button /> : profile?.data?.user?.firstName}</span>
            </p>
            <Icons.ChevronDownIcon />
          </article>
        </section>
      </div>

     <SidebarDrawer isOpen={isDrawerOpen} onClose={handleToggleMenu} width={300}>
          <ProfileBar setIsAddAccountOpen={toggleOpenAccount} profile={profile} isProfileLoading={isLoading} />
     </SidebarDrawer>

     {isAddAccountOpen && (
      <CustomModal width={500} open={isAddAccountOpen} onClose={toggleOpenAccount} onCancel={toggleOpenAccount} >
           <AddAccount />
      </CustomModal>
     )}

    </div>
  );
};

export { Navbar };
