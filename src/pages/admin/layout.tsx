import type { FunctionComponent, PropsWithChildren } from "react";
import BetsLayout from "../layout";
import { AdminContextProvider } from "@/context/AdminContext";

const AdminLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <BetsLayout>
      <AdminContextProvider>{children}</AdminContextProvider>
    </BetsLayout>
  );
};

export default AdminLayout;
