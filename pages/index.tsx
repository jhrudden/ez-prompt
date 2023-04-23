import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import PromptInput from "../components/PromptInput";
import PromptBuilder from "@/components/PromptBuilder";

export default function Home() {
    const [prompt, setPrompt] = React.useState<string>("");
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
            <div className="flex flex-col items-center justify-around h-full w-full">
                <PromptBuilder onPromptGenerated={setPrompt} />
                <div className="w-full flex-col flex md:max-w-md lg:max-w-2xl">
                    {prompt && (
                        <div className="text-sm font-semibold mb-3 opacity-75 text-center">
                            Copy the following into ChatGPT. ChatGPT will
                            generate a refined prompt that you can then use.
                        </div>
                    )}
                    <PromptInput currentPrompt={prompt} />
                </div>
            </div>
        </div>
    );
}
