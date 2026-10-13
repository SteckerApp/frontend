import { Input, WhatsApp } from '@/components';
import { Icons, paths } from '@/constants';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutForm: React.FC = () => {

  return (
    <div className="flex flex-col items-center p-5 min-h-screen bg-bgAuthDesktop bg-cover bg-no-repeat bg-center">
         <div className="flex justify-center p-5 md:absolute md:top-10 md:left-10 md:p-0">
          <Link to={paths.login}><img src={Icons.Logo} alt="Logo" /></Link>
        </div>
      <div className="bg-white p-5 lg:mt-14 md:p-10 mx-auto lg:p-10 rounded-[20px] w-full max-w-md">
     
        <h2 className="text-center text-30 font-medium mb-4 font-outfit text-black">Check out</h2>

        <form className="space-y-5">
          <div>
            <Input
            label='Email Address'
              name="email"
              type="email"
              placeholder='godwincahua@gmail.com'
            />
          </div>

          <div>
            <label htmlFor="card-number" className="block text-16 font-medium text-black font-outfit">Card information</label>
            <Input
              name="card-number"
              type="text"
              placeholder="0000 0000 0000 0000"
            />
            <div className="flex mt-3 space-x-2">
              <Input
                type="text"
                placeholder="MM / YY"
              />
              <Input
                type="text"
                placeholder="CVC"
              />
            </div>
          </div>

          <Input
                label='Name on Card'
              type="text"
              placeholder='Try Spark Design'
            />

          <Input type='select' label='Country or region' placeholder='Nigeria' />

          <Link to={paths.success}><Button
            type="primary"
            className="w-full text-16 font-medium font-outfit mt-5"
          >
            Pay 155,000 NGN
          </Button></Link>

          <Button
            type="default"
            className="w-full mt-4"
          >
            Cancel
          </Button>
          <p className="flex justify-center items-center text-center gap-5 text-14 text-gray font-regular font-outfit pt-1">
        <img src={Icons.LockIcon} /> Your Info is safely secured
      </p>
        </form>
      </div>

      <WhatsApp />
    </div>
  );
};

export default CheckoutForm;
