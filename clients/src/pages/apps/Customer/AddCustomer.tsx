import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useConsumerStore } from "@/store/consumerStore";
import { CustomerSchema } from "@/validate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { applinks } from "@/router/links";

function flattenObject(obj: Record<string, any>, prefix: string = "", excludeKeys: string[] = []): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && !excludeKeys.includes(key)) {
      const newKey = prefix ? key : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(result, flattenObject(obj[key], newKey, excludeKeys));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

const excludeKeys: string[] = ["_id", "createdAt", "updatedAt", "__v"];

export const AddCustomer = () => {
  const { toast } = useToast();
  const params = useParams();
  const navigate = useNavigate();
  const { listConsumer, setNewConsumer, setUpdateConsumer, setToggleConsPopup } = useConsumerStore();
  const foundUser = listConsumer && listConsumer.find((u: any) => u._id === params?.id);

  const form = useForm<z.infer<typeof CustomerSchema>>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (foundUser) {
      form.reset({
        name: foundUser?.name || "",
        email: foundUser?.email || "",
        phone: foundUser?.phone || "",
        area: foundUser?.address?.area || "",
        landmark: foundUser?.address?.landmark || "",
        city: foundUser?.address?.city || "",
        state: foundUser?.address?.state || "",
        pincode: foundUser?.address?.pincode || "",
      });
    }
  }, [foundUser, form]);

  const onSubmit = (data: any) => {
    const payload = { ...data };
    if (foundUser) {
      const flattenedUser = flattenObject(foundUser, "", excludeKeys);
      if (JSON.stringify(flattenedUser) === JSON.stringify(payload)) {
        toast({ title: "You have not updated any value.", variant: "failed" });
        return false;
      }
      setUpdateConsumer({ ...payload, id: params?.id, type: "update_form" });
      setToggleConsPopup(true);
    } else {
      setNewConsumer(payload);
      setToggleConsPopup(true);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center px-[22rem] w-full mb-6">
        <h1 className="font-medium mr-8 text-base text-black">
          {params?.id ? (
            <button onClick={() => navigate(-1)} className="flex items-center">
              <ArrowLeft className="mr-5 w-5 h-5" /> Update Customer
            </button>
          ) : (
            <Link to={applinks.customers} className="flex items-center">
              <ArrowLeft className="mr-5 w-5 h-5" /> Add Customer
            </Link>
          )}
        </h1>
      </div>
      <div className="flex flex-col items-center pb-4 px-[22rem] w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex w-full mt-6 mb-4">
              <div className="w-[25%]">
                <p className="text-xs mb-2 font-medium text-slate-500">Personal Information</p>
              </div>
              <div className="w-[75%]">
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Name" {...field} className="h-12 px-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            disabled={params?.id ? true : false}
                            className="h-12 px-5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Phone no." {...field} className="h-12 px-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-[25%]">
                <p className="text-xs mb-2 font-medium text-slate-500">Address Information</p>
              </div>
              <div className="w-[75%]">
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Landmark" {...field} className="h-12 px-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Area" {...field} className="h-12 px-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="City" {...field} className="h-12 px-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="State" {...field} className="h-12 px-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-8">
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Pincode" {...field} className="h-12 px-5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-auto text-sm bg-indigo-600 hover:bg-indigo-700" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
