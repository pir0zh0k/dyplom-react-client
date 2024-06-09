import { Outlet, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AlignJustifyIcon, RocketIcon } from "lucide-react";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
} from "@/components/ui/select";
import { useUser } from "@/services/user.service";
import { userStore } from "@/store/user.store";
import { ChatBubbleIcon, FaceIcon, PersonIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { userStatuses } from "@/data/userStatuses.ts";

export const DefaultLayout = observer(() => {
  function changeStatus(value: string) {
    useUser.updateStatus(value);
  }

  const navigate = useNavigate();

  const logout = () => {
    userStore.reset();
    navigate("/");
  };

  return (
    <div className="w-full h-full">
      <header className="fixed top-0 left-0 bg-white border-b w-full p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <AlignJustifyIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col p-5 h-screen justify-between items-start pb-10">
              <div className="flex flex-col items-start gap-5">
                <SheetClose asChild>
                  <Button variant="link" asChild>
                    <Link
                      to="/chats"
                      className="flex gap-2 text-xl font-normal"
                    >
                      <ChatBubbleIcon className="w-5 h-5" />
                      Чаты
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="link" asChild>
                    <Link
                      to="/workers"
                      className="flex gap-2 text-xl font-normal"
                    >
                      <FaceIcon className="w-5 h-5" />
                      Коллеги
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="link" asChild>
                    <Link to="/" className="flex gap-2 text-xl font-normal">
                      <PersonIcon className="w-5 h-5" />
                      Профиль
                    </Link>
                  </Button>
                </SheetClose>
                {userStore.role == "ADMIN" ? (
                  <SheetClose asChild>
                    <Button variant="link" asChild>
                      <Link
                        to="/admin"
                        className="flex gap-2 text-xl font-normal"
                      >
                        <RocketIcon className="w-5 h-5" />
                        Админ панель
                      </Link>
                    </Button>
                  </SheetClose>
                ) : null}
              </div>
              <div className="flex flex-col w-full gap-5">
                <Select value={userStore.status} onValueChange={changeStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выбери статус" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      <SelectLabel>Статус</SelectLabel>
                      {userStatuses.map((status) => (
                        <SelectItem value={status.key} key={status.id}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button onClick={logout} variant="outline">
                  Выйти
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="md:p-5 md:pt-16 p-2 pt-16 h-full">
        <div className="md:p-5 p-2 border rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
});
