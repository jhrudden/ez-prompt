import React from "react";
import { useAtom } from "jotai";
import { themeAtom } from "../state/theme";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useAtom(themeAtom);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const ThemeIcon = theme === "light" ? BsMoonStarsFill : BsSunFill;

    return (
        <button
            onClick={toggleTheme}
            className="rounded p-3 dark:text-white text-gray-700"
        >
            <ThemeIcon size={20} />
        </button>
    );
};

export default ThemeToggle;
