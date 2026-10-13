import {
  Button,
  DashboardCard,
  InnerWrapper,
  Label,
  ProjectCard,
} from "@/components";
import { Icons, paths } from "@/constants";
import { Link, useNavigate } from "react-router-dom";

const data = [
  { id: '1', title: 'Project 1' },
  { id: '2', title: 'Project 2' },
  { id: '3', title: 'Project 3' },
  { id: '4', title: 'Project 4' },
  { id: '5', title: 'Project 5' },
  { id: '6', title: 'Project 6' },
]

const Dashboard = () => {
  const navigate = useNavigate()


  return (
    <InnerWrapper>
        <Label label="Overview" />
        <div className="flex justify-start items-center gap-2 lg:gap-5 overflow-x-scroll pt-5 mb-8 w-full">
            <DashboardCard isProfile />
            <DashboardCard isTask />
            <DashboardCard isWorkspace />
        </div>

        <div className="flex justify-between items-center py-5 w-full">
          <Label label="Recent Project" />
          <Button
            type="button"
            bg="bg-primary"
            onClick={() => {
              navigate(paths.dashboardRequestCreateProject)
            }}
          >
            <span className="flex lg:hidden">
              <Icons.PlusIcon />
            </span>
            <span className="hidden lg:flex">Create New Project</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProjectCard data={data?.slice(0, 5)} />

          {data?.length > 5 && (
            <Link to={paths.dashboardRequest} className="flex items-center justify-center rounded-20 p-5 cursor-pointer bg-primaryLight">
              <span className="text-16 text-primary font-medium font-outfit">View All Request</span>
            </Link>
          )}
        </div>
      </InnerWrapper>
  );
};

export default Dashboard;
