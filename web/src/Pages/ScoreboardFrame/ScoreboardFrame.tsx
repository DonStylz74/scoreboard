import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Divider, SegmentedControl, Stack } from '@mantine/core';
import classes from './ScoreboardFrame.module.css';
import ScoreboardBody from '../ScoreboardBody/ScoreboardBody';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { isEnvBrowser } from '../../utils/misc';
import { fetchNui } from '../../utils/fetchNui';
const mockData = {
    GENERAL: {
        leftside: false,
        displayContent: "both",
        playerAdmin: true,
        max_players: 256,
        UI: {
            player: "Player",
            players: "Players",
            society: "Society",
            societies: "Societies",
            employees: "Employees",
            serverid: "Server ID",
            player_is_connecting: "Player is connecting"
        }
    },
    PLAYERS: {
        1: {
            playerName: "Michael De Santa",
            tags: {
              admin: {
                color: "blue",
                icon: "Star"
              }, 
            },
            self: true
        },
        2: {
            playerName: "Franklin Clinton"
        },
        3: {
            playerName: "Trevor Philips"
        },
        4: {
            playerName: "Lester Crest",
            connecting: true
        },
        5: {
            playerName: "Dave Norton",
        },
        6: {
            playerName: "Lamar Davis",
        },
        7: {
            playerName: "Steve Haines",
        },
        8: {
            playerName: "Devin Weston",
        },
        9: {
            playerName: "Amanda De Santa",
        },
        10: {
            playerName: "Tracey De Santa",
        },
        11: {
            playerName: "Brad Snider",
        },

    },



    SOCIETIES: [
        {
            society_name: "a",
            society_label: "Los Santos Police Department",
            society_employee_count: Math.floor(Math.random() * 101)
        },
        {
            society_name: "b",
            society_label: "Emergency Medical Services",
            society_employee_count: Math.floor(Math.random() * 101),
            divider: "Emergency Units"
        },
        {
            society_name: "a",
            society_label: "Ferocious",
            society_employee_count: Math.floor(Math.random() * 101)
        },
        {
            society_name: "b",
            society_label: "Maibatsu Corporation",
            society_employee_count: Math.floor(Math.random() * 101),
        },
        {
            society_name: "c",
            society_label: "Benefactor",
            society_employee_count: Math.floor(Math.random() * 101),
        },
        {
            society_name: "d",
            society_label: "Dinka",
            society_employee_count: Math.floor(Math.random() * 101),
            divider: "Vehicle companies"
        },

    ]
}


export default function ScoreboardFrame({ setTheme }: any) {
    //@ts-ignore
    const [settings, setSettings] = useState(mockData);
    const playerCount = Object.keys(settings.PLAYERS).length;
    const [opened, { open, close }] = useDisclosure(false);
    const [displayedContent, setDisplayedContent] = useState(settings.GENERAL.displayContent === "societies" ? "societies" : "players");
    const closingFunction = (shouldBeVisible: boolean) => {
        if (shouldBeVisible) {
            open()
        } else {
            close()
            fetchNui('scoreboard:onClose')
        }
    }


    useNuiEvent('setVisible', closingFunction)

    useNuiEvent('scoreboardInfo', (data) => {
        setSettings((prevSettings: any) => ({ ...prevSettings, ...data }))
    })

    useEffect(() => {
        fetchNui('scoreboard:initialized')
            .then(data => {
                setTheme(data.primaryColor)
                setSettings((prevSettings) => {
                    return {
                        ...prevSettings,
                        GENERAL: {
                            ...prevSettings.GENERAL,
                            ...data,
                        },
                    };
                });
            })
    }, [])

    return (
        <>
            <Drawer
                position={settings.GENERAL.leftside ? 'left' : 'right'}
                classNames={{
                    header: classes.header,
                }}
                withCloseButton={false}
                opened={opened}
                onClose={() => closingFunction(false)}
                transitionProps={{ transition: settings.GENERAL.leftside ? 'slide-right' : 'slide-left', duration: 500, timingFunction: 'ease' }}
            >
                <Stack
                    justify="space-between"
                >
                    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100vh", padding: "1rem" }}>
                        <div style={{
                            width: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "2rem",
                            fontWeight: "700",
                            /*                             WebkitTextStrokeWidth: "0.1rem",
                                                        WebkitTextStrokeColor: "white" */
                        }}>
                            Scoreboard
                        </div>
                        <Divider my="sm" />
                        <div style={{ paddingLeft: "2rem", paddingRight: "2rem", display: "flex", flexDirection: "column" }}>
                            {!settings.GENERAL.displayContent || (settings.GENERAL.displayContent === "both" && settings.SOCIETIES.length > 0) && (
                                <SegmentedControl
                                    transitionDuration={500}
                                    value={displayedContent}
                                    onChange={setDisplayedContent}
                                    data={[
                                        { label: `${settings.GENERAL.UI.players} (${playerCount}/${settings.GENERAL.max_players})`, value: 'players' },
                                        { label: settings.GENERAL.UI.societies, value: 'societies' },
                                    ]}
                                />
                            )}

                            <ScoreboardBody SETTINGS={settings} players={displayedContent === "players"} CONTENT={displayedContent === "players" ? settings.PLAYERS : settings.SOCIETIES} />
                        </div>
                    </div>

                    <div style={{ display: "absolute", width: "100%", bottom: 0, overflow: "hidden" }}>
                        <div style={{
                            backgroundColor: "red",
                            overflow: "hidden"
                        }}>

                        </div>
                    </div>
                </Stack>

            </Drawer>

            {isEnvBrowser() && (
                <Button onClick={open}>Open drawer</Button>
            )}
        </>
    );
}