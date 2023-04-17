import React from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";

const PromptBuilder: React.FC<{}> = ({}) => {
    return (
        <div className="w-full max-w-xl flex items-center flex-col justify-center shadow-2xl outline outline-1 outline-gray-100 dark:outline-gray-900 rounded px-4 pt-3 pb-5">
            <h1 className="text-xl font-bold mb-1 dark:text-gray-200">
                Prompt Builder
            </h1>
            <p className="text-md opacity-50 text-gray-500 dark:text-gray-300 mb-3">
                Let me help you construct a prompt ...
            </p>
            <form className="flex w-full">
                <div className="grid md:grid-cols-2 w-full items-center gap-3">
                    <div className="w-full">
                        <Label htmlFor="questionTopic">Question Topic</Label>
                        <Input
                            id="questionTopic"
                            placeholder="Software Development"
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="role">ChatGPT Role</Label>
                        <Input id="role" placeholder="Interviewer" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="tone">Tone</Label>
                        <Input id="tone" placeholder="Formal" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="outputType">Output Type</Label>
                        <Input
                            id="outputType"
                            placeholder="Generate Examples"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};
export default PromptBuilder;
