import { type AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";
import { Layout } from "@/components";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
