import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import PromptBuilder from "../components/PromptBuilder";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full h-screen">
            <div className="flex flex-row items-center justify-between relative p-2 w-full">
                <div className="text-2xl font-bold text-center w-full dark:text-gray-200">
                    EZ Prompt
                </div>
                <div className="absolute right-1">
                    <ThemeToggle />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full">
                <PromptBuilder />
            </div>
        </div>
    );
}
