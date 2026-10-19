import { Cart } from "@/components";
import { Icons, paths } from "@/constants"
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"


const PlanCart = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get("reference"); 

    useEffect(() => {
    if (!reference) {
      navigate(paths.choosePlan, { replace: true });
    }
  }, [reference, navigate]);

  if (!reference) {
    return null;
  }

  return (
    <div className='bg-bgAuthDesktop min-h-screen w-full flex justify-center items-center bg-center bg-cover bg-no-repeat p-5'>
         <Link to={paths.login}> <img src={Icons.Logo} className="absolute top-10 left-[35%] sm:left-10"/></Link>
        <section className="flex justify-center items-center flex-col w-full md:max-w-5xl">
            <Cart reference={reference} />
        </section>
    </div>
  )
}

export default PlanCart
