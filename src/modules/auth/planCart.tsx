import { Cart } from "@/components";
import { Icons, paths } from "@/constants"
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"


const PlanCart = () => {
    const location = useLocation();

    // parsing the query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const planType = queryParams.get("type"); 

    useEffect(() => {
        if (!planType) {
            window.location.href = paths.login;
        }
    })

  return (
    <div className='bg-bgAuthDesktop min-h-screen w-full flex justify-center items-center bg-center bg-cover bg-no-repeat p-5'>
         <Link to={paths.login}> <img src={Icons.Logo} className="absolute top-10 left-[35%] sm:left-10"/></Link>
        <section className="flex justify-center items-center flex-col w-full md:max-w-5xl">
            <Cart type={planType} />
        </section>
    </div>
  )
}

export default PlanCart
