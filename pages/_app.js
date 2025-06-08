import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import { ProductProvider } from "../src/context/ProductContext";
import { useRouter } from "next/router";
import { getCookie } from "../src/utils/cookie";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");

    const token = getCookie("token");
    const publicRoutes = ["/login", "/register"];

    if (!token && !publicRoutes.includes(router.pathname)) {
      router.push("/login");
    }

    if (token && publicRoutes.includes(router.pathname)) {
      router.push("/dashboard");
    }
  }, [router.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      <ProductProvider>
        <Component {...pageProps} />
      </ProductProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
