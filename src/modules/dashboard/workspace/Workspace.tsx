import { Banner, Button, CustomModal, DeleteModal, EmptyState, InnerWrapper } from "@/components";
import { Images } from "@/constants";
import { Avatar } from "antd";
import {  useState } from "react";
import { AddTeam } from "./modules/AddTeam";
import { apiServices } from "@/services";
import { spark } from "@/config";

const Workspace = () => {
  const [ openTeam, setOpenTeam ] = useState<boolean>(false);
  const [ isDeleteUser, setIsDeleteUser ] = useState<boolean>(false);
  const { data: teams, isLoading: isTeamsLoading } = apiServices.useGetTeamsQuery()
  const [ isTeamRecord, setTeamRecord ] = useState<string | number | null>(null)
  const [ deleteTeamById, { isLoading: isDeleteTeamLoading } ] = apiServices.useDeleteTeamMutation();

  const [deleteMessage, setDeleteMessage] = useState<string | null>(null)

const getErrorMessage = (err: unknown): string =>
  (err as { data?: { message?: string } })?.data?.message ?? 'Something went wrong. Please try again.'


  const toggleOpenTeam = () => {
    setOpenTeam((prev) =>!prev);
  };

const toggleDeleteUser = (id: string | number | null) => {
  setIsDeleteUser((prev) => !prev)
  setTeamRecord(id)
  setDeleteMessage(null)
}

const handleDeleteTeam = async () => {
  if (isTeamRecord === null) return
  try {
    const res = await deleteTeamById(isTeamRecord).unwrap()
    setDeleteMessage(res?.message ?? 'User removed successfully.')
    setTeamRecord(null)
  } catch (err) {
    setDeleteMessage(getErrorMessage(err)) 
  }
}

const handleClose = () => {
  setIsDeleteUser(false)
  setTeamRecord(null)
  setDeleteMessage(null)
}


  
  return (
    <>
      <InnerWrapper>
        {/* banner */}
        <Banner setIsAddTeamOpen={toggleOpenTeam} avatar={`${spark.apiBaseUrl + teams?.data?.avatar ? Images.UserAvatar : spark.apiBaseUrl + teams?.data?.avatar }`} title={teams?.data?.name} description={teams?.data?.description} loading={isTeamsLoading} />

{teams?.data?.users?.length === 0 ? <EmptyState img={Images.EmptyTeam} title="Nothing to Display Here" action="“Invite team member”"  description="first team member" /> :  

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {teams?.data?.users?.map((item) => (
            <div
              className="flex justify-start items-center  bg-white p-5 rounded-20 gap-5"
              key={item?.id}
            >
              <Avatar shape="square" size={150} src={spark.apiBaseUrl + item?.avatar ? Images.UserAvatar : spark.apiBaseUrl + item?.avatar } className="rounded-20" />
              <section className="flex justify-start items-start flex-col">
                <span className="text-20 font-medium font-outfit text-black">
                  {item?.first_name} {item?.last_name}
                </span>
                <span className="text-14 font-medium font-outfit text-gray500">
                  {item?.email}
                </span>
                <Button onClick={() => toggleDeleteUser(item?.id)} type="button" color="text-error" bg="border border-error mt-5">Remove User</Button>
              </section>
            </div>
          ))}
        </div>

}

      </InnerWrapper>

    {openTeam && (
      <CustomModal width={500} open={openTeam} onCancel={toggleOpenTeam}>
          <AddTeam close={toggleOpenTeam} />
      </CustomModal>
    )}

    {isDeleteUser && (
      <DeleteModal 
      desc={deleteMessage ?? undefined}
    loading={isDeleteTeamLoading}
    open={isDeleteUser}
    confirmDelete={handleDeleteTeam}
    onCancel={handleClose} />
    )}

    </>
  );
};

export default Workspace;
