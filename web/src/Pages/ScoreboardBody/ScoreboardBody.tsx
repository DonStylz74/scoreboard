import { useState, useEffect, useRef } from 'react';
import { Text, ActionIcon, ScrollArea, Switch, Tooltip, useMantineTheme } from '@mantine/core';
import Player from '../../Components/Player/Player';
import Society from '../../Components/Society/Society';
import Icons from '../../Components/ScoreboardIcons.';

export default function ScoreboardBody(props: any) {
    const theme = useMantineTheme();
    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
    const [jumpButtonVisible, setJumpButtonVisible] = useState<boolean>(false);
    const { SETTINGS, players, CONTENT } = props;
    const viewport = useRef<HTMLDivElement>(null);
    const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });
    const [useAltNames, setUseAltNames] = useState<boolean>(false);

    useEffect(() => {
        if (scrollPosition.y !== 0 && !jumpButtonVisible) {
            setJumpButtonVisible(true)
        } else if (scrollPosition.y === 0) {
            setJumpButtonVisible(false)
        }
    }, [scrollPosition])

    useEffect(() => {
        console.log(JSON.stringify(CONTENT))
        setJumpButtonVisible(false)
        scrollToTop();
    }, [CONTENT])


    return (<>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", margin: "1rem", alignContent: "center", textAlign: "center" }}>
            <Text size='sm' c="dimmed">{players ? SETTINGS.GENERAL.UI.player : SETTINGS.GENERAL.UI.society}</Text>
            {SETTINGS.GENERAL.playerAdmin && (
                <Tooltip label={SETTINGS.GENERAL.UI.toggle_alt_name}>
                    <span style={{ visibility: players ? "visible" : "hidden", opacity: players ? "1" : "0", transition: "opacity 500ms" }}> {/* Required */}
                        <Switch size="xs" color={theme.primaryColor[9]} checked={useAltNames} onChange={(event) => setUseAltNames(event.currentTarget.checked)} />
                    </span>
                </Tooltip>
            )}

            <Text size='sm' c="dimmed">{players ? SETTINGS.GENERAL.UI.serverid : SETTINGS.GENERAL.UI.employees}</Text>
        </div>
        
        <ScrollArea viewportRef={viewport}
            onScrollPositionChange={onScrollPositionChange} styles={{
                scrollbar: { marginTop: '1rem', marginBottom: "2rem", borderRadius: "2rem" },
            }} h={'75vh'} w='105%' offsetScrollbars type='scroll'>
            <div>
                <ActionIcon style={{ position: 'absolute', left: "45%", top: "2%", opacity: jumpButtonVisible ? 1 : 0, transition: "opacity 200ms" }} onClick={scrollToTop} variant="light" radius="xl" aria-label="Settings">
                    <div style={{ fill: 'var(--mantine-primary-color-filled)' }}>
                        {Icons.ArrowUp}
                    </div>
                </ActionIcon>

                {players ? (
                    <Player T={SETTINGS.GENERAL.UI} playerData={CONTENT} showAlternative={useAltNames} />
                ) : (
                    <Society data={CONTENT} />
                )}
            </div>

        </ScrollArea>
    </>

    )
}
