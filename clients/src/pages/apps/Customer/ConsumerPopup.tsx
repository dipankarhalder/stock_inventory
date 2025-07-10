import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addNewConsumer, editCustomer, consumerLists } from "@/services/consumer.services.ts";
import { applinks } from "@/router/links.ts";
import { useConsumerStore } from "@/store/consumerStore";

export const ConsumerPopup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addConsumer, updateConsumer, setLoading, setListConsumer, setNewConsumer, setToggleConsPopup } =
    useConsumerStore();

  const handleNewConsumer = async () => {
    setLoading(true);
    try {
      if (updateConsumer.type === "update_form") {
        const newPayload = {
          name: updateConsumer?.name,
          email: updateConsumer?.email,
          phone: updateConsumer?.phone,
          area: updateConsumer?.area,
          landmark: updateConsumer?.landmark,
          city: updateConsumer?.city,
          state: updateConsumer?.state,
          pincode: updateConsumer?.pincode,
        };
        const res = await editCustomer(updateConsumer.id, newPayload);
        if (res.status === 400) {
          return toast({ title: res.message, variant: "failed" });
        }
        navigate(-1);
      } else {
        const res = await addNewConsumer(addConsumer);
        if (res.status === 400) {
          return toast({ title: res.message, variant: "failed" });
        }
        setNewConsumer("");
        navigate(applinks.customers);
      }
      const cunsomerLists = await consumerLists();
      setListConsumer(cunsomerLists.list);
      setToggleConsPopup(false);
    } catch (err: any) {
      toast({ title: err.message, variant: "failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[99] flex justify-center items-center">
      <div className="bg-white px-8 py-10 w-[480px] z-[2] rounded-md">
        <div className="flex flex-col items-center ">
          <h6 className="text-xl font-semibold mb-2">Are you sure</h6>
          <p className="text-sm font-medium text-slate-400">You want to submit the information.</p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-10">
          <span
            className="px-4 py-2 bg-indigo-700 text-xs text-white font-medium rounded-md cursor-pointer hover:bg-indigo-900 transition ease-in-out"
            onClick={() => handleNewConsumer()}
          >
            Submit
          </span>
          <span
            className="px-4 py-2 bg-slate-300 text-xs text-black font-medium rounded-md cursor-pointer hover:bg-slate-700 hover:text-white transition ease-in-out"
            onClick={() => setToggleConsPopup(false)}
          >
            Cancel
          </span>
        </div>
      </div>
      <div className="absolute top-0 left-0 flex w-full h-screen bg-black opacity-[.86]"></div>
    </div>
  );
};
