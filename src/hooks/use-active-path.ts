import { usePathname } from "next/navigation";

const useActivePath = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const exact = (href: string) => pathname === href;
  const includes = (href: string | string[]) => {
    const hrefs = Array.isArray(href) ? href : [href];
    return hrefs.some((h) =>
      segments.includes(h.split("/").filter(Boolean).at(-1)!),
    );
  };
 const matches = (href: string) =>
  href === "/" ? exact(href) : includes(href);
  return { exact, includes,matches, segments, pathname };
};

export default useActivePath;
