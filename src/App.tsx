import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Vans from "./pages/vans/Vans";
import VanDetails from "./pages/vans/VanDetails";
import Layout from "./components/Layout";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans from "./pages/host/HostVans";
import HostVanInfo from "./pages/host/HostVanInfo";
import HostVanPricing from "./pages/host/HostVanPricing";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanDetails from "./pages/host/HostVanDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AuthRequired from "./components/AuthRequired";
import SignUp from "./pages/SignUp";
import AddVan from "./pages/host/AddVan";
import CombinedProvider from "./contexts/CombinedProvider";

export default function App() {
  return (
    <BrowserRouter>
      <CombinedProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<AuthRequired />}>
              <Route path="host" element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="vans" element={<HostVans />} />
                <Route path="vans/:id" element={<HostVanInfo />}>
                  <Route index element={<HostVanDetails />} />
                  <Route path="pricing" element={<HostVanPricing />} />
                  <Route path="photos" element={<HostVanPhotos />} />
                </Route>
                <Route path="add-van" element={<AddVan />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CombinedProvider>
    </BrowserRouter>
  );
}
