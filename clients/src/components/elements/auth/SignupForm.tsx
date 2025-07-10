import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { IUserRequest } from "@/interface";
import { SignupSchema } from "@/validate";
import { applinks } from "@/router/links";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/elements/spinner";
import { registerUser } from "@/services/auth.services";

export const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading, setLoading } = useAuthStore();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      role: "super_admin",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    const payload: IUserRequest = { ...data };
    setLoading(true);
    try {
      const res = await registerUser(payload);
      if (res.status === 400) {
        return toast({ title: res.message, variant: "failed" });
      }
      toast({ title: res.message, variant: "success" });
      navigate(applinks.login);
    } catch (err: any) {
      toast({ title: err.message, variant: "failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                    className="h-12 px-5 font-medium"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    className="h-12 px-5 font-medium"
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
                  <Input
                    placeholder="Phone no."
                    {...field}
                    className="h-12 px-5 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="h-12 px-5 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center w-full">
          {loading ? (
            <div className="w-full bg-gray-400 h-11 flex items-center justify-center rounded-md">
              <Spinner />
              <p className="font-medium text-white text-sm ml-2">
                Please wait...
              </p>
            </div>
          ) : (
            <Button
              className="w-auto bg-blue-700 text-sm h-10 hover:bg-[#1A2C95] px-9"
              type="submit"
            >
              Create an account
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
