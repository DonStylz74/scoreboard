import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetOverlay } from "@/components/ui/sheet"
import Player from './Players/Player';
import Footer from "./Footer";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isEnvBrowser } from '@/utils/misc';
import Societies from './Societies/Societies';
import { ScoreboardData } from '@/types';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { fetchNui } from '@/utils/fetchNui';
import logo from '/logo.png';

export default function Scoreboard({ SCOREBOARD }: { SCOREBOARD: ScoreboardData }) {
  const left = true;
  const [tab, setTab] = useState<'players' | 'societies' | 'both'>(SCOREBOARD.GLOBAL.UI_TABS);
  const [adminView, setAdminView] = useState<boolean>(SCOREBOARD.GLOBAL.PLAYER_ADMIN || false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!visible) fetchNui('scoreboard:onClose');
  }, [visible])

  useNuiEvent('scoreboard:toggle', toggle => {
    setVisible(toggle)
  })

  return (
    <Sheet open={visible} onOpenChange={setVisible}>
      {isEnvBrowser() && <button style={{ position: "absolute", right: "50%" }} onClick={() => setVisible(!visible)}>Open</button>}

      <SheetContent side={left ? "left" : "right"}>

        <SheetDescription>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/*  <div style={{ flex: '0 0 5vh', textAlign: "center", fontSize: "2rem" }}> LSRP Scoreboard </div> */}


            {SCOREBOARD.GLOBAL.UI_TABS === 'both' && (
              <div style={{ marginBottom: "1rem" }}>
                <Tabs defaultValue={"players"} style={{ width: "100%", display: "grid", justifyContent: "center" }} onValueChange={(value) => setTab(value as 'players' | 'societies')} >
                  <TabsList>
                    <TabsTrigger value="players">{SCOREBOARD.GLOBAL.UI.PLAYERS}</TabsTrigger>
                    <TabsTrigger value="societies">{SCOREBOARD.GLOBAL.UI.SOCIETIES}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            <ScrollArea style={{ width: "100%", height: "100%", flex: 1 }} className="rounded-md ">
              <div style={{ display: "grid", rowGap: "1rem" }}>
                {SCOREBOARD.GLOBAL.UI_TABS === 'societies' || tab === "societies" ? (
                  <Societies SOCIETIES={SCOREBOARD.SOCIETIES} />
                ) : (
                  Object.keys(SCOREBOARD.PLAYERS).map((player: any, index: any) => (
                    <Player key={index} playerId={player} playerData={SCOREBOARD.PLAYERS[player]} isAdmin={SCOREBOARD.GLOBAL.PLAYER_ADMIN} adminView={adminView} />
                  ))
                )}

              </div>
            </ScrollArea>
            <Footer SCOREBOARD={SCOREBOARD} adminView={adminView} setAdminView={setAdminView} />
          </div>
        </SheetDescription>
      </SheetContent>

      <SheetOverlay style={{ zIndex: -5 }}>

        <span style={{
          transition: "opacity 5s",
          width: left ? "calc(100% + 24rem)" : "calc(100% - 24rem)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "5rem",
          fontWeight: "800",
          opacity: visible ? "50%" : 0
        }}>
          {SCOREBOARD.GLOBAL.UI_USE_LOGO && (
            <img style={{ height: "20rem" }} src={logo} alt="Logo" />
          )}
        </span>

      </SheetOverlay>


    </Sheet>
  );
}