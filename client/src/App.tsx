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

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/product"} component={Product} />
        <Route path={"/learn"} component={Advertorial} />
        <Route path={"/compare"} component={Compare} />
        <Route path={"/quiz"} component={Quiz} />
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
