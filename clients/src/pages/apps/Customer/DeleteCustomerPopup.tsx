import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { applinks } from "@/router/links.ts";
import { useConsumerStore } from "@/store/consumerStore";
import { deleteConsumer, consumerLists } from "@/services/consumer.services.ts";

export const DeleteCustomerPopup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { deleteCustomer, setDeleteTogglePopup, setNewConsumer, setListConsumer } = useConsumerStore();

  const handleDelete = async () => {
    try {
      const res = await deleteConsumer(deleteCustomer);
      if (res.status === 400) {
        return toast({ title: res.message, variant: "failed" });
      }
      setNewConsumer("");
      const cunsomerLists = await consumerLists();
      setListConsumer(cunsomerLists.list);
      setDeleteTogglePopup(false);
      navigate(applinks.customers);
    } catch (err: any) {
      toast({ title: err.message, variant: "failed" });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[99] flex justify-center items-center">
      <div className="bg-white px-8 py-[60px] w-[420px] z-[2] rounded-md">
        <div className="flex flex-col items-center">
          <span className="w-[90px] h-[90px] rounded-full bg-slate-100 flex justify-center items-center mb-8">
            <Trash2 className="w-[50px] h-[50px] text-red-500" />
          </span>
          <h6 className="text-xl font-semibold mb-2">Are you sure</h6>
          <p className="text-sm font-medium text-slate-400">You want to delete the record?</p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span
            className="px-4 py-2 bg-red-700 text-xs text-white font-medium rounded-md cursor-pointer hover:bg-red-900 transition ease-in-out"
            onClick={() => handleDelete()}
          >
            Delete
          </span>
          <span
            className="px-4 py-2 bg-slate-300 text-xs text-black font-medium rounded-md cursor-pointer hover:bg-slate-400 transition ease-in-out"
            onClick={() => setDeleteTogglePopup(false)}
          >
            Cancel
          </span>
        </div>
      </div>
      <div className="absolute top-0 left-0 flex w-full h-screen bg-black opacity-[.86]"></div>
    </div>
  );
};
