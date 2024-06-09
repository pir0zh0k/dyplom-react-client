import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import { userStore } from "@/store/user.store";
import { LoginPage } from "@/pages/LoginPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { WorkersPage } from "./pages/WorkersPage";
import { useEffect } from "react";
import { useUser } from "@/services/user.service.ts";
import { ChatsPage } from "@/pages/ChatsPage.tsx";
import { ChatPage } from "@/pages/ChatPage.tsx";
import { AdminPage } from "@/pages/AdminPage.tsx";
import { NotFound } from "@/pages/NotFound.tsx";

export const App = observer(() => {
  useEffect(() => {
    useUser.getUser();
  }, []);

  return (
    <Routes>
      {userStore.isAuth ? (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<ProfilePage />} index />
          <Route path="workers" element={<WorkersPage />} />
          <Route path="chats" element={<ChatsPage />} />
          <Route path="/chats/:id" element={<ChatPage />} />
          {userStore.role == "ADMIN" ? (
            <Route path="admin" element={<AdminPage />} />
          ) : null}
        </Route>
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});
