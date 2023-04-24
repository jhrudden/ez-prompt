import React, { useCallback, useMemo } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { PROMPT_CATEGORIES, PromptCategory } from "@/types/Prompt";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/Tooltip";
import { BsInfoCircle } from "react-icons/bs";
import useClickedOutside from "@/hooks/useClickedOutside";

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

const CATEGORY_TO_TOOLTIP: Record<PromptCategory, string> = {
    topic: "The specific topic or subject that the prompt should focus on. GOAL: The specific goal that the user is trying to achieve",
    audience:
        "The intended audience of the prompt, including their demographics, interests, and needs",
    role: "The particular persona which helps ChatGPT tailor its responses to fit the characteristics or expertise associated with that role.",
    tone: "The desired tone or mood of the prompt, such as serious, humorous, or informative",
    format: "The desired format for the prompt, such as a question, scenario, or image",
    requirements:
        "Any specific requirements or guidelines for the prompt, such as length or specific elements",
    inspiration:
        "Any inspiration or starting points for the prompt, such as a question, quote, or image",
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
                            <div className="flex flex-row gap-1 mb-1 items-center">
                                <Label htmlFor={category}>
                                    {CATEGORY_TO_LABEL[category]}
                                </Label>
                                <CategoryTooltip category={category} />
                            </div>
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

const CategoryTooltip: React.FC<{ category: PromptCategory }> = ({
    category,
}) => {
    const [openTooltip, setOpenTooltip] = React.useState(false);

    const ref = useClickedOutside(() => setOpenTooltip(false));

    const tooltipMessage: string = CATEGORY_TO_TOOLTIP[category];

    return tooltipMessage ? (
        <div ref={ref}>
            <TooltipProvider>
                <Tooltip open={openTooltip}>
                    <TooltipTrigger asChild>
                        <span
                            className="text-gray-500 dark:text-gray-400"
                            onClick={() => setOpenTooltip((curr) => !curr)}
                        >
                            <BsInfoCircle size={14} />
                        </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm bg-gray-100 dark:bg-gray-500 border-none">
                        {CATEGORY_TO_TOOLTIP[category]}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    ) : null;
};
export default PromptBuilder;
