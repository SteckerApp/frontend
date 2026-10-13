import { Icons, paths } from "@/constants"
import { Link } from "react-router-dom"
import { WhatsApp } from "../ui"

const AuthLayout:React.FC<AuthLayoutProps> = (props) => {
  return (
    <div className="flex flex-col justify-center bg-bgAuthDesktop min-h-screen lg:h-screen w-full bg-center bg-no-repeat bg-cover p-5 md:p-10">
        {/* Logo positioned at top-right on larger screens and top-center on mobile */}
        <div className="absolute left-28 right-0 top-0 mb-5 p-5 md:absolute md:top-10 md:left-10 md:p-0">
          <Link to={paths.login}><img src={Icons.Logo} alt="Logo" /></Link>
        </div>

        {/* Main content centered */}
        <div className={`flex justify-center items-center ${props.height}`}>
            <div className={`bg-white mt-14 md:mt-0 mb-5 md:mb-0 w-full sm:w-full ${props.width} m-auto rounded-20 p-5 lg:px-10 lg:py-12`}>
                {props.children}
            </div>
        </div>

        <WhatsApp />
    </div>
  )
}

export default AuthLayout
