import React, { useCallback } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { PROMPT_CATEGORIES, PromptCategory } from "@/types/Prompt";

type FormData = Record<PromptCategory, string>;

const CATEGORY_TO_LABEL: Record<PromptCategory, string> = {
    topic: "Goal / Topic",
    role: "ChatGPT Role",
    tone: "Tone / Mood",
    format: "Format",
    audience: "Audience",
    requirements: "Requirements",
    inspiration: "Inspiration",
};

const CATEGORY_TO_PLACEHOLDER: Record<PromptCategory, string> = {
    role: "Software Developer",
    topic: "Web Development",
    tone: "Casual",
    format: "Bullet Points",
    audience: "Developers",
    requirements: "None",
    inspiration: "React Documentation",
};

interface PromptBuilderProps {
    onPromptGenerated: (prompt: string) => void;
}

const PromptBuilder: React.FC<PromptBuilderProps> = ({ onPromptGenerated }) => {
    const [formData, setFormData] = React.useState<FormData>({
        topic: "",
        role: "",
        tone: "",
        format: "",
        audience: "",
        requirements: "",
        inspiration: "",
    });

    const handleFormFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            let prompt =
                "Please create a great prompt based on the following inputs.\n";
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== "")
                    prompt += `${
                        CATEGORY_TO_LABEL[key as PromptCategory]
                    }: ${value}\n`;
            });
            prompt += onPromptGenerated(prompt);
        },
        [formData, onPromptGenerated]
    );

    return (
        <div className="w-full max-w-xl flex items-center flex-col justify-center shadow-2xl outline outline-1 outline-gray-100 dark:outline-gray-900 rounded px-4 pt-3 pb-5">
            <h1 className="text-xl font-bold mb-1 dark:text-gray-200">
                Prompt Builder
            </h1>
            <p className="text-md opacity-50 text-gray-500 dark:text-gray-300 mb-3">
                Let me help you construct a prompt ...
            </p>
            <form
                className="flex w-full flex-col items-center justify-center"
                onSubmit={handleFormSubmit}
            >
                <div className="grid md:grid-cols-2 w-full items-center gap-3">
                    {PROMPT_CATEGORIES.map((category) => (
                        <div
                            className="w-full"
                            key={`prompt_category_${category}`}
                        >
                            <Label htmlFor={category}>
                                {CATEGORY_TO_LABEL[category]}
                            </Label>
                            <Input
                                id={category}
                                placeholder={CATEGORY_TO_PLACEHOLDER[category]}
                                value={formData[category] ?? ""}
                                onChange={handleFormFieldChange}
                            />
                        </div>
                    ))}
                </div>
                <Button type="submit" variant="outline" className="mt-4 w-full">
                    Generate
                </Button>
            </form>
        </div>
    );
};
export default PromptBuilder;
