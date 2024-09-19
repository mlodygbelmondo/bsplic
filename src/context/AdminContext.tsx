import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
} from "react";
import getData from "../server/api/getData";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import { useAuthContext } from "./AuthContext";

export const AdminContext = createContext<any>({});
export const useAdminContext = () => useContext(AdminContext);

export const AdminContextProvider = ({ children }: PropsWithChildren) => {
  const [userAdminRole, setUserAdminRole] = useState<
    "" | "admin" | "moderator"
  >("");

  const { user }: { user: User } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    const getAdmins = async () => {
      if (user) {
        await getData("admins", user.uid).then((data) => {
          if (!data.result?.exists()) {
            return router.push("/404");
          } else {
            if (data.result.data()?.role === "admin") {
              setUserAdminRole("admin");
            } else {
              setUserAdminRole("moderator");
            }
          }
        });
      } else return router.push("/");
    };
    getAdmins();
  }, [user, router]);

  return (
    <AdminContext.Provider value={{ userAdminRole }}>
      {userAdminRole && children}
    </AdminContext.Provider>
  );
};
