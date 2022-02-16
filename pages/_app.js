import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function checkAuthentication() {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          await router.push("/");
        } else {
          await router.push("/login");
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
