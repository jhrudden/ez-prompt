import React, {
    CSSProperties,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { BsClipboard } from "react-icons/bs";
import { Button } from "./ui/Button";
import { useToast } from "@/hooks/useToast";

interface PromptInputProps {
    currentPrompt: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ currentPrompt }) => {
    const [inputValue, setInputValue] = useState("");
    const [disableCopy, setDisableCopy] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { toast } = useToast();

    const inputStyles = useMemo<CSSProperties>(
        () => ({ maxHeight: "200px" }),
        []
    );

    const handleCopyClick = useCallback(() => {
        if (textAreaRef && textAreaRef.current) {
            navigator.clipboard.writeText(inputValue);
            setDisableCopy(true);
            const { dismiss } = toast({
                title: "Copied to clipboard",
            });
            setTimeout(() => {
                setDisableCopy(false);
                setTimeout(() => dismiss(), 1000);
            }, 1000);
        }
    }, [toast, inputValue]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "24px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    useEffect(() => {
        setInputValue(currentPrompt);
        textAreaRef.current?.scrollTo(0, textAreaRef.current.scrollHeight);
    }, [currentPrompt]);

    const disabledButton = inputValue === "" || disableCopy;

    return (
        <div className="relative mx-6 w-full drop-shadow-lg">
            <textarea
                role="textbox"
                value={inputValue}
                ref={textAreaRef}
                onChange={(e) => setInputValue(e.target.value)}
                className="resize-none overflow-hidden rounded outline outline-1 outline-gray-100 dark:outline-gray-800 dark:bg-gray-700 bg-white text-gray-600 dark:text-gray-200 rounded-l-md w-full py-4 pl-4 pr-10"
                placeholder="Type your prompt here..."
                style={inputStyles}
            />
            <div className="absolute right-0 top-2">
                <Button disabled={disabledButton} onClick={handleCopyClick}>
                    <BsClipboard
                        size={20}
                        color={disabledButton ? "gray" : "black"}
                    />
                </Button>
            </div>
        </div>
    );
};

export default PromptInput;
