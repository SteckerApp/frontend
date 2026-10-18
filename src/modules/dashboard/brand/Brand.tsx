import { Button, CustomModal, DeleteModal, EmptyState, InnerWrapper, Label } from "@/components";
import { Icons, Images } from "@/constants";
import { useState } from "react";
import { CreateBrand } from "./modules/CreateBrand";
import { ViewBrand } from "./modules/ViewBrand";
import { apiServices } from "@/services";
import { Skeleton } from "antd";
import { EditBrand } from "./modules/EditBrand";

const Brand = () => {
  const [ isDeleteUser, setIsDeleteUser ] = useState<boolean>(false);
  const [ isOpenAddBrand, setIsOpenAddBrand ] = useState<boolean>(false);
  const [ isViewBrand, setIsViewBrand ] = useState<boolean>(false);
  const { data: brands, isLoading: isBrandsLoading } = apiServices.useGetBrandsQuery();
  const [ isBrandId, setIsBrandId ] = useState<string | number>("");
  const [ isEditBrand, setIsEditBrand ] = useState<boolean>(false);

  const [ deleteBrand, { isLoading: isDeleteBrandLoading} ] = apiServices.useDeleteBrandMutation();

  const toggleDeleteUser = (id: string | number) => {
    setIsDeleteUser((prev) =>!prev);
    setIsBrandId(id);
  };

  const toggleOpenAddBrand = () => {
    setIsOpenAddBrand((prev) =>!prev);
  };

  const toggleViewBrand = (id: string | number) => {
    setIsBrandId(id);
    setIsViewBrand((prev) =>!prev);
  }

  const toggleEditBrand = (id: string | number ) => {
    setIsEditBrand((prev) =>!prev);
    setIsBrandId(id);
  };

  const handleClose = () => {
    setIsDeleteUser(false);
    setIsOpenAddBrand(false);
    setIsViewBrand(false);
    setIsBrandId('');
    setIsEditBrand(false)
  }

  const handleDeleteBrand = async (id: string | number ) => {
    await deleteBrand({id});
  }


  return (
    <>
      <InnerWrapper>
        <div className="flex justify-between items-center pb-5 w-full">
          <Label label="Brand" />
          <Button type="button" bg="bg-primary">
            <span className="flex lg:hidden">
              <Icons.PlusIcon onClick={() => toggleOpenAddBrand()} />
            </span>
            <span className="hidden lg:flex" onClick={() => toggleOpenAddBrand()}>Create New Brand</span>
          </Button>
        </div>

{brands?.data?.data.length === 0 ? <EmptyState img={Images.EmptyBrand} title="Nothing to Display Here" action="“Create new brand”" description="first brand profile" /> :

<section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
{brands?.data?.data?.map((item) => (
  <div className="flex justify-start items-start flex-col p-5 rounded-lg bg-white" key={item?.id}>
  <span className="text-black text-20 font-medium font-outfit mb-10">
    {isBrandsLoading ? <Skeleton active={true} paragraph={{rows: 1}} /> : item?.name}
  </span>

  <div className="flex justify-end items-end gap-2">
    <Button  onClick={() => toggleViewBrand(item?.id)}  type="button" bg=" border border-primary bg-primary">
      View Brand
    </Button>
    <Button onClick={() => toggleEditBrand(item?.id)} type="button" bg="border border-primary bg-primary">
      Edit Brand
    </Button>
    <Button onClick={() => toggleDeleteUser(item?.id)} type="button" bg="border border-error" color="text-error">
      Delete
    </Button>
  </div>
</div>
))}
</section>
}
       


      </InnerWrapper>

      {isDeleteUser && (
      <DeleteModal loading={isDeleteBrandLoading} confirmDelete={() => handleDeleteBrand(isBrandId)} open={isDeleteUser} onCancel={handleClose} />
    )}

    {isOpenAddBrand && (
      <CustomModal width={520} open={isOpenAddBrand} onClose={toggleOpenAddBrand}>
          <CreateBrand close={toggleOpenAddBrand} />
      </CustomModal>
    )}

    {isEditBrand && (
          <EditBrand open={isEditBrand}  close={handleClose} brandId={isBrandId} />
    )}

    {isViewBrand && (
      <CustomModal width={520} open={isViewBrand} onClose={handleClose}>
         <ViewBrand close={handleClose} brandId={isBrandId} />
      </CustomModal>
    )}
    </>
  );
};

export default Brand;
