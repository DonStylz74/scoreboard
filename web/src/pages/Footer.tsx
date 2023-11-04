import { ScoreboardData } from '@/types';
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HiMiniUsers, HiMiniUser } from 'react-icons/hi2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function Footer({ SCOREBOARD, adminView, setAdminView }: { SCOREBOARD: ScoreboardData; adminView: boolean; setAdminView: any }) {
	const playerCount = Object.keys(SCOREBOARD.PLAYERS).length
	const maxPlayers = SCOREBOARD.GLOBAL.MAX_PLAYERS;
	console.log(JSON.stringify(SCOREBOARD.GLOBAL.UI))

	if (!SCOREBOARD.GLOBAL.PLAYER_ADMIN) return (
		<div style={{ flex: '0 0 7rem', width: "100%", padding: "1rem" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
				<Button>
					<HiMiniUsers className="w-4 h-4 mr-2" />{`${playerCount}/${maxPlayers}`}
				</Button>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button>
								<HiMiniUser className="w-4 h-4 mr-2" /> {SCOREBOARD.GLOBAL.PLAYER_SOURCE}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Your server ID</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

			</div>
		</div>
	)


	return (
		<div style={{ flex: '0 0 7rem', width: "100%", padding: "1rem" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
				<Button>
					<HiMiniUsers className="w-4 h-4 mr-2" />{`${playerCount}/${maxPlayers}`}
				</Button>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button>
								<HiMiniUser className="w-4 h-4 mr-2" /> {SCOREBOARD.GLOBAL.PLAYER_SOURCE}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Your server ID</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button onClick={() => setAdminView(!adminView)}>
								{adminView ? 
								( <> <AiFillEyeInvisible className="w-4 h-4 mr-2" /> {SCOREBOARD.GLOBAL.UI.HIDE} </> ) 
								: 
								(	<> <AiFillEye className="w-4 h-4 mr-2" /> {SCOREBOARD.GLOBAL.UI.SHOW}	</> )}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{adminView ? "Hide admin features" : "Display admin features"}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

			</div>
		</div>
	)

}
