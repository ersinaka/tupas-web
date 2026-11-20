import type { MDXComponents } from "mdx/types";
import { Info } from "lucide-react";

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 flex gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm leading-relaxed text-foreground">
      <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-text" />
      <div className="[&>p]:m-0">{children}</div>
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  Callout,
  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
        {children}
      </a>
    );
  },
  table: ({ children, ...props }) => (
    <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-left text-sm [&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-3 [&_th]:bg-surface-2 [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold" {...props}>
        {children}
      </table>
    </div>
  ),
};
