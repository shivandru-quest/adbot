import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import LandingPage from "../components/LandingPage";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard";
import OnboardingPage from "../components/Auth/Onboarding";
import GetStartedPage from "../components/GetStarted/GetStartedPage";
import AdCreator from "../components/AdCreator";
import TemplateSelection from "../components/TemplateSelection";
import AdEditor from "../components/AdEditor/AdEditor";
import SubscriptionPage from "../components/Subscription/SubscriptionPage";
import PaymentPage from "../components/Payment/PaymentPage";
import SubscriptionConfirmation from "../components/Subscription/SubscriptionConfirmation";
import BillingPage from "../components/Billing/BillingPage";
import ContactPage from "../components/Contact/ContactPage";
import HelpPage from "../components/Help/HelpPage";
import SettingsDashboard from "../components/Settings/SettingsDashboard";

const isPublicRoute = (pathname) => {
  return ["/", "/login", "/onboarding"].includes(pathname);
};

const AllRoutes = () => {
  const location = useLocation();

  const { state } = useContext(AppContext);
  const { isAuthenticated } = state;
  return (
    <div>
      {/* {isAuthenticated && !isPublicRoute(location.pathname) && <Sidebar />} */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <OnboardingPage />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  );
};

export default AllRoutes;
