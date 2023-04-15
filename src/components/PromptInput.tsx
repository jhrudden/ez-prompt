import React, {
    CSSProperties,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { BsArrowsExpand } from "react-icons/bs";

const PromptInput: React.FC<{}> = ({}) => {
    const [inputValue, setInputValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "24px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const inputStyles = useMemo<CSSProperties>(
        () => ({ maxHeight: "200px" }),
        []
    );

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
            <button className="absolute right-0 bottom-1 px-3 py-2 m-2 dark:text-gray-300 focus:outline-none hover:bg-blend-darken">
                <BsArrowsExpand size={20} />
            </button>
        </div>
    );
};

export default PromptInput;
