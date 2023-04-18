import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import { withTheme } from "../components/withTheme";
import { Toaster } from "@/components/ui/Toaster";

function MyApp({ Component, pageProps }: AppProps) {
    const ThemedComponent = withTheme(Component);

    return (
        <Provider>
            <ThemedComponent {...pageProps} />
            <Toaster />
        </Provider>
    );
}

export default MyApp;
