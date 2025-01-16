import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const classes = cva("border h-12 rounded-full px-6 font-medium", {
    variants: {
        variant: {
            primary: "bg-lime-400 text-neutral-950 border-lime-400",
            secondary: "border-white text-white bg-transparent",
        },
        size: {
            sm: "h-10 px-4",
            md: "h-12 px-6",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export default function Button(
    props: {
        variant: "primary" | "secondary";
        size?: "sm" | "md";
    } & ButtonHTMLAttributes<HTMLButtonElement>
) {
    const { variant, size = "md", className, type = "button", ...otherProps } = props;

    return (
        <button
            className={clsx(classes({ variant, size }), className)}
            type={type}
            {...otherProps}
        >
            {props.children}
        </button>
    );
}
