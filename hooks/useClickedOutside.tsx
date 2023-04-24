import { useEffect, useRef } from "react";

type TCallback = () => void;

function useClickedOutside(
    onOutsideClick: TCallback
): React.RefObject<HTMLDivElement> {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
            if (
                elementRef.current &&
                !elementRef.current.contains(event.target as Node)
            ) {
                onOutsideClick();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [onOutsideClick]);

    return elementRef;
}

export default useClickedOutside;
