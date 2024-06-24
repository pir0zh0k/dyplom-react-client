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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useUser } from "@/services/user.service.ts";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";

const formSchema = z.object({
  full_name: z.string(),
  username: z
    .string()
    .min(3, { message: "Имя пользователя не может быть меньше 3 символов" }),
  password: z
    .string()
    .min(6, { message: "Пароль не может быть меньше 6 символов" }),
  email: z.string().email(),
  phone: z.string(),
  role: z.string(),
});

export const CreateUserForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      full_name: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  const [created, setCreated] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await useUser.createUser(values);
    if (res.status == 201) {
      setCreated(true);
    }
    form.reset();
  }

  if (created) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Пользователь успешно создан!</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col border p-5 rounded-lg"
      >
        <h1 className="text-center text-3xl font-semibold">
          Создание пользователя
        </h1>
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
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="role"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Роль ползователя</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Роль:</SelectLabel>
                      <SelectItem value="ADMIN">Администратор</SelectItem>
                      <SelectItem value="USER">Пользователь</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Создать пользователя</Button>
      </form>
    </Form>
  );
};
