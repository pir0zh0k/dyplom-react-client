import { useEffect, useState } from "react";
import { IUser } from "@/types/UserTypes.ts";
import { useUser } from "@/services/user.service.ts";
import { userStore } from "@/store/user.store.ts";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { userStatuses } from "@/data/userStatuses.ts";

export const WorkersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

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

  return (
    <div className="w-full h-full space-y-5">
      {users &&
        users.map((user) => {
          if (user.id != userStore.id) {
            return (
              <Card key={user.id}>
                <CardHeader className="flex flex-row gap-5 items-center justify-between">
                  <div className="flex flex-wrap flex-row gap-5 items-center">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span className="text-lg font-semibold">
                      {user.full_name}
                    </span>
                    {user.status ? (
                      <Badge variant="secondary">
                        {userStatuses.map((status) =>
                          status.key == user.status ? status.name : null,
                        )}
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Offline</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">{user.email}</p>
                </CardContent>
              </Card>
            );
          }
        })}
    </div>
  );
};
