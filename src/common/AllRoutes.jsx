import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import LandingPage from "../components/landingPage/LandingPage";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard";
import OnboardingPage from "../components/Auth/Onboarding";
import GetStartedPage from "../components/GetStarted/GetStartedPage";
import AdCreator from "../components/AdCreator";
import TemplateSelection from "../components/TemplateSelection";
import AdEditor from "../components/AdEditor/AdEditor";
import PaymentPage from "../components/Payment/PaymentPage";
import SubscriptionConfirmation from "../components/Subscription/SubscriptionConfirmation";
import BillingPage from "../components/Billing/BillingPage";
import ContactPage from "../components/Contact/ContactPage";
import HelpPage from "../components/Help/HelpPage";
import SettingsDashboard from "../components/Settings/SettingsDashboard";
import OtpModal from "../components/Auth/OtpModal";
import Home from "../components/Home/Home";
import MyFiles from "../components/MyFiles/MyFiles";

const isPublicRoute = (pathname) => {
  return ["/", "/login", "/onboarding"].includes(pathname);
};

const AllRoutes = () => {

  const { state } = useContext(AppContext);
  const { isAuthenticated } = state;
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/sendOtp=true" element={<OtpModal />} />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <OnboardingPage />
          }
        />

        {isAuthenticated ? (
          <>
            <Route
              path="/dashboard"
              element={
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              }
            />

            <Route
              path="/get-started"
              element={
                <Sidebar>
                  <GetStartedPage />
                </Sidebar>
              }
            />
            <Route path="/create" element={<AdCreator />} />
            <Route
              path="/templates"
              element={
                <Sidebar>
                  <TemplateSelection />
                </Sidebar>
              }
            />
            <Route path="/editor/:templateId" element={<AdEditor />} />
            <Route
              path="/settings"
              element={
                <Sidebar>
                  <SettingsDashboard />
                </Sidebar>
              }
            />
            <Route
              path="/home"
              element={
                <Sidebar>
                  <Home />
                </Sidebar>
              }
            />
            <Route
              path="/myfiles"
              element={
                <Sidebar>
                  <MyFiles />
                </Sidebar>
              }
            />
            <Route path="/editor/new" element={<AdEditor />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route
              path="/subscription/confirmation"
              element={<SubscriptionConfirmation />}
            />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
};

export default AllRoutes;
