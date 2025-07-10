import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { IUserSignin } from "@/interface";
import { SigninSchema } from "@/validate";
import { applinks } from "@/router/links";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/elements/spinner";
import { loginUser } from "@/services/auth.services";

export const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading, setToken, setLogin, setLoading } = useAuthStore();

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    const payload: IUserSignin = { ...data };
    setLoading(true);
    try {
      const res = await loginUser(payload);
      if (res.status === 400) {
        return toast({ title: res.message, variant: "failed" });
      }
      setToken(res.token);
      setLogin("true");
      navigate(applinks.dashboard);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} className="h-12 px-5" />
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
                  <Input type="password" placeholder="********" {...field} className="h-12 px-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loading ? (
          <div className="w-full bg-gray-400 h-11 flex items-center justify-center rounded-md">
            <Spinner />
            <p className="font-medium text-white text-sm ml-2">Please wait...</p>
          </div>
        ) : (
          <Button className="w-full bg-indigo-600 text-sm h-11 hover:bg-indigo-700" type="submit">
            Login
          </Button>
        )}
      </form>
    </Form>
  );
};
