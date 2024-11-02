import { BrowserRouter, Routes, Route } from "react-router-dom";
import CombinedProvider from "@/contexts/CombinedProvider";

import Layout from "@/components/Layout";
import HostLayout from "@/components/HostLayout";

import Homepage from "@/pages/marketing/Homepage";
import About from "@/pages/marketing/About";

import VansCatalog from "@/pages/vans/VansCatalog";
import VanDetails from "@/pages/vans/Van";

import AuthRequired from "@/components/AuthRequired";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";

import Dashboard from "@/pages/host/Dashboard";
import Income from "@/pages/host/Income";
import Reviews from "@/pages/host/Reviews";
import AddVan from "@/pages/host/AddVan";

import HostedVans from "@/pages/host/HostedVans";
import HostedVan from "@/pages/host/hostedVan/HostedVan";
import HostedVanDetails from "@/pages/host/hostedVan/HostedVanDetails";
import HostedVanPricing from "@/pages/host/hostedVan/HostedVanPricing";
import HostedVanPhotos from "@/pages/host/hostedVan/HostedVanPhotos";

import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <CombinedProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />

            <Route path="vans" element={<VansCatalog />} />
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
                <Route path="vans/:id" element={<HostedVan />}>
                  <Route index element={<HostedVanDetails />} />
                  <Route path="pricing" element={<HostedVanPricing />} />
                  <Route path="photos" element={<HostedVanPhotos />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CombinedProvider>
    </BrowserRouter>
  );
}
