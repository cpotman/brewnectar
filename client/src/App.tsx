import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Advertorial from "./pages/Advertorial";
import Compare from "./pages/Compare";
import Quiz from "./pages/Quiz";
import FileManager from "./pages/FileManager";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/product"} component={Product} />
        <Route path={"/learn"} component={Advertorial} />
        <Route path={"/compare"} component={Compare} />
        <Route path={"/quiz"} component={Quiz} />
        <Route path={"/files"} component={FileManager} />
        <Route path={"/about"} component={About} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/policies/privacy-policy"} component={PrivacyPolicy} />
        <Route path={"/policies/terms-of-service"} component={TermsOfService} />
        <Route path={"/policies/refund-policy"} component={RefundPolicy} />
        <Route path={"/policies/shipping-policy"} component={ShippingPolicy} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
