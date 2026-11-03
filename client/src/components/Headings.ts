import React from "react";

interface HeadingProps {
    level?: 1 | 2 | 3 | 4;
    children: React.ReactNode;
    className?: string;
}
const Heading: React.FC<HeadingProps> =({ level = 3, children, className= "" }) => {
    const Tag = (`h${level}`) as 'h1' | 'h2' | 'h3' | 'h4';

    const baseStyles = "font-sans font-bold tracking-tight";

    const variants: Record<number, string> = {
        1: "text-4xl md:text-5xl font-extrabold mb-6",
        2: "text-2xl md:text-3xl font-bold mb-6",
        3: "text-xl font-bold mb-3",
        4: "text-lg font-semibold mb-2"
    };
    return React.createElement(
        Tag,
        { className: `${baseStyles} ${variants[level] || variants[3]} ${className}`},
        children
    ) 
}
export default Heading