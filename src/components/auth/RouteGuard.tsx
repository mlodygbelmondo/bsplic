import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
const RouteGuard = ({ children }: { children: ReactNode }): JSX.Element => {
  const [authorized, setAuthorized] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    authCheck(user);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(user: User | null | undefined) {
    if (user === null) {
      setAuthorized(false);
      router.push({
        pathname: "/bsplic/login",
      });
    } else {
      setAuthorized(true);
    }
  }
  return <>{authorized && children}</>;
};

export default RouteGuard;
