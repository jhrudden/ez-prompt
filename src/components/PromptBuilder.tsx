import React from "react";
import PromptInput from "./PromptInput";

const PromptBuilder: React.FC<{}> = ({}) => {
    return (
        <div className="w-full flex-col flex md:max-w-md lg:max-w-2xl">
            <PromptInput />
        </div>
    );
};

export default PromptBuilder;
