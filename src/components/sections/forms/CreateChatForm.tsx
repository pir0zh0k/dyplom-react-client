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
import { useUser } from "@/services/user.service.ts";
import { useEffect, useState } from "react";
import { IUser } from "@/types/UserTypes.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { userStore } from "@/store/user.store.ts";
import { useChat } from "@/services/chat.service.ts";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  chatName: z.string().min(1, { message: "Поле обязательно для заполнения" }),
  user: z.string().min(1, { message: "Выберите пользователя" }),
});

export const CreateChatForm = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatName: "",
      user: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createChat(values.chatName, values.user);
  }

  async function getUsers() {
    const fetched = await useUser.getAllUsers();
    if (fetched) {
      setUsers(fetched);
      console.log(fetched);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const createChat = async (chatName: string, userId: string) => {
    const result = await useChat.createChat(chatName, userId);

    if (result.status == 201) {
      navigate(`/chats/${result.data.chat.id}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          name="chatName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя чата</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="user"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пользователь</FormLabel>
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
                      <SelectLabel>Пользователь:</SelectLabel>
                      {users &&
                        users.map((user: IUser) => {
                          if (user.id != userStore.id) {
                            return (
                              <SelectItem key={user.id} value={user.id}>
                                {user.full_name}
                              </SelectItem>
                            );
                          }
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline">Создать чат</Button>
      </form>
    </Form>
  );
};
