import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/services/auth.service";
import { AxiosError } from "axios";
import { userStore } from "@/store/user.store.ts";
import { IOnSubmit } from "@/types/AuthTypes.ts";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Имя пользователя не может быть меньше 3 символов" }),
  password: z
    .string()
    .min(6, { message: "Пароль не может быть меньше 6 символов" }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result: IOnSubmit = await useAuth.login(values);

    if (result instanceof AxiosError) {
      form.setError("root", {
        message: "Имя пользователя или пароль введены не верно",
      });
      return;
    }

    userStore.setUser(
      result.user.id,
      result.user.username,
      result.user.full_name,
      result.user.email,
      result.user.phone,
      result.user.role,
    );

    localStorage.setItem("token", result.access_token);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col md:w-1/3 border p-5 rounded-lg"
      >
        <h1 className="text-center text-3xl font-semibold">Вход</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Войти</Button>
        {form?.formState?.errors?.root && (
          <p className="text-red-500 text-sm text-center font-semibold">
            {form.formState.errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
};
