import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
/* import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchNui } from "@/utils/fetchNui";
import { BiLoader } from 'react-icons/bi';
/* import * as Icons from 'react-icons/ai'; */
import { useState } from "react";
/*  import { MdWork } from 'react-icons/md'; 

const getPlayerTags = (playerData: any, tooltip: boolean) => {
	if (!tooltip) return playerData.tags.map((data: any, index: number) => {
		const Icon = Icons[data.tag_icon as keyof typeof Icons];
		return (
			<Avatar key={index} style={{ width: "2rem", height: "2rem" }}>
				<AvatarFallback><Icon /></AvatarFallback>
			</Avatar>
		);
	});


	return playerData.tags.map((data: any, index: number) => {
		const Icon = Icons[data.tag_icon as keyof typeof Icons];
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Avatar key={index} style={{ width: "2rem", height: "2rem" }}>
							<AvatarFallback><Icon /></AvatarFallback>
						</Avatar>
					</TooltipTrigger>
					<TooltipContent>
						<p>	{data.tag_label}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	});
}
 */

export default function Player({ playerId, playerData, isAdmin, adminView }: any) {
	if (!isAdmin || !adminView) return (
		<div style={{ borderWidth: "0.1rem", borderColor: "hsl(var(--accent) / 0.25)", backgroundColor: playerData.self ? "hsl(var(--accent) / 0.5)" : "hsl(var(--accent) / 0.1)", borderRadius: "1rem" }}>
			<div style={{ display: "flex", justifyContent: "space-between", margin: ".5rem", alignItems: "center", textAlign: "center", marginLeft: "1rem", marginRight: "1rem" }} >
				<div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '12em' }}>{playerData.player_name}</div>
				<div style={{ display: "flex", flexDirection: "row", columnGap: "1rem" }}>
{/* 					{playerData?.tags && (getPlayerTags(playerData, true))} */}
					<Avatar style={{ width: "2rem", height: "2rem" }}>  <AvatarFallback>{playerId}</AvatarFallback> </Avatar>
				</div>
			</div>
		</div>
	)

	const [currentData, setCurrentData] = useState({});
	const [loading, setLoading] = useState(false);

	const getPlayerInfo = (e: boolean) => {
		if (!e) return;
		setLoading(true);
		fetchNui('test', "test", { player: "XD" })
			.then(data => setCurrentData(data))
			.finally(() => setLoading(false));
	}


	return (
		<HoverCard onOpenChange={getPlayerInfo}>
			<HoverCardTrigger>
				<div style={{ borderWidth: "0.1rem", borderColor: "hsl(var(--accent) / 0.25)", backgroundColor: playerData.self ? "hsl(var(--accent) / 0.5)" : "hsl(var(--accent) / 0.1)", borderRadius: "1rem" }}>
					<div style={{ display: "flex", justifyContent: "space-between", margin: ".5rem", alignItems: "center", textAlign: "center", marginLeft: "1rem", marginRight: "1rem" }} >
						<div style={{ flex: 1, textAlign: "start", display: "flex", flexDirection: "column", overflow: 'hidden', maxWidth: '12em ' }}>
							<span style={{ fontWeight: "600", textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{playerData.player_name}</span>
							<span style={{ color: "hsl(var(--primary) / 0.4)", }}> {playerData.player_alt_name} </span>
						</div>

						<div style={{ display: "flex", flexDirection: "row", columnGap: "1rem" }}>
	{/* 						{playerData?.tags && (getPlayerTags(playerData, false))} */}
							<Avatar style={{ width: "2rem", height: "2rem" }} > 	<AvatarFallback>{playerId}</AvatarFallback> </Avatar>
						</div>

					</div>
				</div>
			</HoverCardTrigger>
			<HoverCardContent style={{ backgroundColor: "hsl(var(--background) / 0.9)" }}>
				{loading ? (
					<div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", columnGap: "1rem" }}>
						<BiLoader className="w-4 h-4 animate-spin" />
						Loading data..
					</div>
				) : (
					<div style={{ borderWidth: "0.1rem", borderColor: "hsl(var(--accent) / 0.9)", backgroundColor: "hsl(var(--accent) / 0.2)", borderRadius: "1rem", padding: "1rem", display: "flex", flexDirection: "column" }}>
						{JSON.stringify(currentData)}
					</div>

				)}
			</HoverCardContent>
		</HoverCard>

	)
}
