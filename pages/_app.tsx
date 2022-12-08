import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "../redux/store"; // Importing redux store

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
