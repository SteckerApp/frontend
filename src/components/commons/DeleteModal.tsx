import { CustomModal } from ".";
import { Icons } from "@/constants";
import { Button } from "antd";

const DeleteModal = ({
  open,
  onCancel,
  confirmDelete,
  title,
  desc,
  confirmText,
  loading
}: {
  open: boolean;
  onCancel: () => void;
  confirmDelete?: () => void;
  title?: string;
  desc?: string;
  confirmText?: string;
  loading?: boolean
}) => {
  return (
    <CustomModal width={350} open={open} closeIcon={false}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <span className="text-18 text-black font-medium font-outfit">
            {title ?? "Delete content?"}
          </span>
          <Icons.CancelIcon
            onClick={onCancel}
            size={20}
            color="gray"
            className="cursor-pointer"
          />
        </div>

        <span className="text-14 font-normal font-outfit text-gray">
          {desc ??
            "Are you sure to remove this ? You can't access this file once you delete it."}
        </span>

        <div className="flex justify-center items-center gap-3 mt-8">
          <Button loading={loading} onClick={confirmDelete} type="primary" className="w-full ">
            {confirmText ?? "Delete"}
          </Button>
          <Button onClick={onCancel} type="default" className="w-full ">
            Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModal;
