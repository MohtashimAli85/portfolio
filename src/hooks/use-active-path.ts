import { usePathname } from "next/navigation";

const useActivePath = (href: string) => {
  const pathname = usePathname();
  const [first] = pathname.split("/").filter(Boolean);
  const isActive = first ? href.includes(first) : pathname === href;
  return { isActive, pathname };
};

export default useActivePath;
