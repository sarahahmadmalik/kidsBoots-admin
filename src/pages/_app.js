import DashboardLayout from "@/layout/DashboardLayout";
import GeneralLayout from "@/layout/GeneralLayout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  if (router.pathname === "/signin") {
    return (
      <QueryClientProvider client={queryClient}>
        <GeneralLayout>
      
          <Component {...pageProps} />
        </GeneralLayout>
      </QueryClientProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </QueryClientProvider>
  );
};

export default App;
