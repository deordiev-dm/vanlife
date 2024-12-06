import { BrowserRouter, Routes, Route } from "react-router-dom";
import CombinedProvider from "@/contexts/CombinedProvider";
import Layout from "@/components/layouts/Layout";
import HostLayout from "@/components/layouts/HostLayout";
import Homepage from "@/pages/marketing/Homepage";
import About from "@/pages/marketing/About";
import VanDetails from "@/pages/vans/Van";
import AuthRequired from "@/components/layouts/AuthRequired";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/host/Dashboard";
import Income from "@/pages/host/Income";
import Reviews from "@/pages/host/Reviews";
import AddVan from "@/pages/host/AddVan";
import HostedVans from "@/pages/host/HostedVans";
import HostedVan from "@/pages/host/hostedVan/HostedVan";
import NotFound from "@/pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import OurVans from "./pages/vans/ourVans/ourVans";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CombinedProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="about" element={<About />} />

              <Route path="vans" element={<OurVans />} />
              <Route path="vans/:id" element={<VanDetails />} />

              <Route path="login" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />

              <Route element={<AuthRequired />}>
                <Route path="host" element={<HostLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="income" element={<Income />} />
                  <Route path="reviews" element={<Reviews />} />

                  <Route path="vans" element={<HostedVans />} />
                  <Route path="vans/add-van" element={<AddVan />} />
                  <Route path="vans/:id" element={<HostedVan />}></Route>
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CombinedProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
