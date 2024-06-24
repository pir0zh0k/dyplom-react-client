import { CreateUserForm } from "@/components/sections/forms/CreateUserForm.tsx";
import { Card, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

export const AdminPage = () => {
  return (
    <div className="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-5">
      <CreateUserForm />
      <div
        className="h-full border p-5 rounded-lg max-h-[800px] space-y-5"
        style={{ overflow: "hidden auto" }}
      >
        <Card className="p-5 flex justify-between gap-10">
          <CardTitle className="space-y-2 w-full">
            <Label className="block">
              <span className="mb-2 block">ФИО:</span>
              <Input value="Григорий Захаров" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Имя пользователя:</span>
              <Input value="shish" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Номер телефона:</span>
              <Input value="89531987575" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Электронная почта:</span>
              <Input value="shis@corp.ru" disabled />
            </Label>
          </CardTitle>
          <div className="flex gap-5">
            <Button variant="outline">
              <Pencil1Icon className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>
        <Card className="p-5 flex justify-between gap-10">
          <CardTitle className="space-y-2 w-full">
            <Label className="block">
              <span className="mb-2 block">ФИО:</span>
              <Input value="Дмитрий Тагунов" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Имя пользователя:</span>
              <Input value="tagun" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Номер телефона:</span>
              <Input value="89531987576" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Электронная почта:</span>
              <Input value="tagun@corp.ru" disabled />
            </Label>
          </CardTitle>
          <div className="flex gap-5">
            <Button variant="outline">
              <Pencil1Icon className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>
        <Card className="p-5 flex justify-between gap-10">
          <CardTitle className="space-y-2 w-full">
            <Label className="block">
              <span className="mb-2 block">ФИО:</span>
              <Input value="Ярослав Гончаров" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Имя пользователя:</span>
              <Input value="gonchar" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Номер телефона:</span>
              <Input value="89531987577" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Электронная почта:</span>
              <Input value="gonchar@corp.ru" disabled />
            </Label>
          </CardTitle>
          <div className="flex gap-5">
            <Button variant="outline">
              <Pencil1Icon className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>
        <Card className="p-5 flex justify-between gap-10">
          <CardTitle className="space-y-2 w-full">
            <Label className="block">
              <span className="mb-2 block">ФИО:</span>
              <Input value="Григорий Захаров" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Имя пользователя:</span>
              <Input value="shish" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Номер телефона:</span>
              <Input value="89531987575" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Электронная почта:</span>
              <Input value="shis@corp.ru" disabled />
            </Label>
          </CardTitle>
          <div className="flex gap-5">
            <Button variant="outline">
              <Pencil1Icon className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>
        <Card className="p-5 flex justify-between gap-10">
          <CardTitle className="space-y-2 w-full">
            <Label className="block">
              <span className="mb-2 block">ФИО:</span>
              <Input value="Григорий Захаров" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Имя пользователя:</span>
              <Input value="shish" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Номер телефона:</span>
              <Input value="89531987575" disabled />
            </Label>
            <Label className="block">
              <span className="mb-2 block">Электронная почта:</span>
              <Input value="shis@corp.ru" disabled />
            </Label>
          </CardTitle>
          <div className="flex gap-5">
            <Button variant="outline">
              <Pencil1Icon className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
