import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import Root from "./root/index.tsx";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "http:",
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider store={store}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Root />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);
