import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SocietyData } from "@/types";

export default function Society(SOCIETY: SocietyData) {
	const employeeCount = SOCIETY.society_employee_count.toString();
	return (
		<div style={{ borderWidth: "0.1rem", borderColor: "hsl(var(--accent) / 0.2)", backgroundColor: "hsl(var(--accent) / 0.5)", borderRadius: "1rem" }}>
			<div style={{ display: "flex", justifyContent: "space-between", margin: ".5rem", alignItems: "center", textAlign: "center" }} >
				<span />
				<div> {SOCIETY.society_label} </div>
				<Avatar style={{ width: "2rem", height: "2rem", fontSize: ".8rem", fontWeight: "600" }} >
					<AvatarFallback>{employeeCount}</AvatarFallback>
				</Avatar>
			</div>
		</div>
	)
}
