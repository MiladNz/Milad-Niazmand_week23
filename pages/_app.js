import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
