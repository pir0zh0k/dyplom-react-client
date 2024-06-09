import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
      <h1 className="md:text-6xl text-xl">Страница не найдена</h1>
      <Button variant="outline" asChild>
        <Link to="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
};
