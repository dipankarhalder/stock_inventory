import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { applinks } from "@/router/links";
import { useProfileStore } from "@/store/profileStore";
import { editProfile, myProfile } from "@/services/profile.services";

export const EditProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { profile, setLoading, setProfile } = useProfileStore();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || "",
        phone: profile.phone || "",
        area: profile.address?.area || "",
        landmark: profile.address?.landmark || "",
        city: profile.address?.city || "",
        state: profile.address?.state || "",
        pincode: profile.address?.pincode || "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: any) => {
    const payload = { ...data };
    setLoading(true);
    try {
      const res = await editProfile(payload);
      if (res.status === 400) {
        return toast({ title: res.message, variant: "failed" });
      }
      const profileNewInfo = await myProfile();
      setProfile(profileNewInfo.data);
      navigate(applinks.profile);
    } catch (err: any) {
      toast({ title: err.message, variant: "failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center px-[22rem] w-full mb-6">
        <h1 className="font-medium mr-8 text-base text-black">
          <Link to={applinks.profile} className="flex items-center">
            <ArrowLeft className="mr-5 w-5 h-5" /> Edit Profile
          </Link>
        </h1>
      </div>
      <div className="flex flex-col items-center pb-4 px-[22rem] w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="flex w-full mt-6 mb-4">
              <div className="w-[25%]">
                <p className="text-xs mb-2 font-medium text-slate-500">
                  &nbsp;
                </p>
              </div>
              <div className="w-[75%]">
                <p className="text-sm mb-2 font-medium text-indigo-500">
                  Please update your personal information
                </p>
              </div>
            </div>
            <div className="flex w-full mb-4">
              <div className="w-[25%]">
                <p className="text-xs mb-2 font-medium text-slate-500">
                  Personal Information
                </p>
              </div>
              <div className="w-[75%]">
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            {...field}
                            className="h-12 px-5"
                          />
                        </FormControl>
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
                          <Input
                            placeholder="Phone no."
                            {...field}
                            className="h-12 px-5"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-[25%]">
                <p className="text-xs mb-2 font-medium text-slate-500">
                  Address Information
                </p>
              </div>
              <div className="w-[75%]">
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Landmark"
                            {...field}
                            className="h-12 px-5"
                          />
                        </FormControl>
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
                          <Input
                            placeholder="Area"
                            {...field}
                            className="h-12 px-5"
                          />
                        </FormControl>
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
                          <Input
                            placeholder="City"
                            {...field}
                            className="h-12 px-5"
                          />
                        </FormControl>
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
                          <Input
                            placeholder="State"
                            {...field}
                            className="h-12 px-5"
                          />
                        </FormControl>
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
                          <Input
                            placeholder="Pincode"
                            {...field}
                            className="h-12 px-5"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-auto h-11 text-sm bg-indigo-600 hover:bg-indigo-700 px-6"
                  type="submit"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
