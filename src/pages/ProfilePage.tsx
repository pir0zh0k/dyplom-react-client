import { Input } from "@/components/ui/input";
import { userStore } from "@/store/user.store";
import { PersonIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";

export const ProfilePage = () => {
  return (
    <div className="h-full">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center p-5 bg-slate-200 rounded-full">
          <PersonIcon className="w-10 h-10" />
        </div>
        <span className="text-xl font-semibold">{userStore.fullName}</span>
      </div>
      <div className="space-y-5 mt-5 md:w-1/3">
        <Label className="block">
          Электронная почта:
          <Input value={userStore.email} disabled />
        </Label>
        <Label className="block">
          Номер телефона:
          <Input value={userStore.phone} disabled />
        </Label>
        <Label className="block">
          Имя пользователя:
          <Input value={userStore.username} disabled />
        </Label>
      </div>
    </div>
  );
};
