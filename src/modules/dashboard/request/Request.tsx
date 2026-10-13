import { CustomTab, InnerWrapper } from '@/components'
import AllRequest from './module/AllRequest';
import Todo from './module/Todo';
import Ongoing from './module/Ongoing';
import InReview from './module/InReview';
import Approved from './module/Approved';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/constants';


const Request = () => {
  const navigate = useNavigate()

  const contentMap = {
    "all request": <AllRequest />,
    "to do": <Todo />,
    "ongoing": <Ongoing />,
    "in review": <InReview/>,
    "approved": <Approved/>
  };

  const options = ["all request", "to do", "ongoing", "in review", "approved"]

  return (
     <InnerWrapper>
          <CustomTab options={options} contentMap={contentMap} open={() => { navigate(paths.dashboardRequestCreateProject)}} isButton buttonText='Create New Project' buttonTextSmall="+" />
        </InnerWrapper>
  )
}

export default Request
