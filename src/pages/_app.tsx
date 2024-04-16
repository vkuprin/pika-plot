import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/utils/queryClient";
import "./globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default MyApp;
