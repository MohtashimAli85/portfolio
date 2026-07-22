"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Checkbox from "@/components/ui/checkbox";
import { iconsMap, type SkillItem } from "./sidebar";

const SidebarItem = ({ skill }: { skill: SkillItem }) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const skills = searchParams.get("skills");
	const isActive = skills?.includes(skill.value);
	const handleCheckboxChange = () => {
		const newSkills = skills ? skills.split(",") : [];
		if (isActive) {
			newSkills.splice(newSkills.indexOf(skill.value), 1);
		} else {
			newSkills.push(skill.value);
		}
		router.push(`/projects?skills=${newSkills.join(",")}`);
	};
	return (
		<label
			htmlFor={skill.value}
			key={skill.value}
			className="p-3 flex items-center cursor-pointer select-none gap-2.5"
			onClick={handleCheckboxChange}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleCheckboxChange();
				}
			}}
		>
			<Checkbox id={skill.value} defaultChecked={isActive} />
			<span className="[&>svg]:size-6 flex items-center gap-2 [&>svg]:text-slate-500">
				{iconsMap[skill.value]}
				{skill.label}
			</span>
		</label>
	);
};

export default SidebarItem;
