import React from "react";
import { useAtom } from "jotai";
import { themeAtom } from "../state/theme";

export const withTheme = (Component: React.ComponentType<any>) => {
    const ThemedComponent: React.FC = (props) => {
        const [theme] = useAtom(themeAtom);
        const className = theme === "light" ? "bg-white" : "dark bg-gray-700";

        return (
            <div className={`min-h-screen ${className}`}>
                <Component {...props} />
            </div>
        );
    };

    return ThemedComponent;
};
