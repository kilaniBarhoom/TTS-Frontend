import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    as: {
      h1: "scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl",
      h2: "scroll-m-20  pb-2 md:text-6xl text-4xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 md:text-4xl text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 md:text-2xl text-lg font-semibold tracking-tight",
      h5: "scroll-m-20 md:text-lg text-sm font-semibold tracking-tight",
      h6: "scroll-m-20 md:text-base text-xs font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      largeText: "text-lg font-semibold",
      smallText: "md:text-sm text-xs font-light leading-none",
      extraSmallText: "text-xs font-light",
      mutedText: "text-muted-foreground",
    },
  },
});

type Element = keyof JSX.IntrinsicElements;

type TypographyProps<T extends Element> = {
  element: T;
} & VariantProps<typeof typographyVariants> &
  React.HTMLAttributes<HTMLElement>;

const Typography = <T extends Element>({
  className,
  element,
  as,
  ...props
}: TypographyProps<T>) => {
  const Component = element;

  const componentProps = {
    className: cn(typographyVariants({ as, className })),
    ...props,
  };

  return React.createElement(Component, componentProps);
};

export default React.forwardRef(Typography);
