import { HTMLAttributes } from "react";

export default function Tag(props: HTMLAttributes<HTMLDivElement>) {
    const { className, children, ...otherProps } = props 
    return (
        <div className={className ? className : "inline-flex border border-lime-400 rounded-full gap-2 text-lime-400 px-3 py-1 uppercase items-center"} {...otherProps}>
            <span>&#10038;</span>
            <span className="text-sm">{children}</span>
        </div>
    )
}