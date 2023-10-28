import { useMantineTheme, Paper, Avatar, Loader, Tooltip, Text } from '@mantine/core';
import ScoreboardIcons from '../ScoreboardIcons.';

export default function Player({ playerData, T }: any) {
  const theme = useMantineTheme();
  return (
    <>
      {Object.keys(playerData).map((playerSource: any, index: any) => <div key={index} >
        <Paper style={{ borderColor: playerData[playerSource].self && `var(--mantine-color-${theme.primaryColor}-filled)`, textAlign: "center", height: "3.5rem", backgroundColor: theme.colors.dark[8], marginBottom: ".5rem", display: "flex", justifyContent: "space-between", alignItems: "center", padding: '0.1rem 1rem 0.1rem 1rem' }} withBorder radius="xl">
          {
            <Text style={{ maxWidth: "15vw" }} fw={300} truncate="end">
              {playerData[playerSource].playerName}
            </Text>
          }
          <div style={{ display: "flex", justifyContent: "flex-end", columnGap: "1rem" }}>
            {playerData[playerSource].tags && (
              <Avatar size={28} radius="xl" variant='light' color="green.4">{<span style={{ fontWeight: "500", fill: `var(--mantine-color-${"green"}-4)` }}>{ScoreboardIcons.Star}</span>}</Avatar>
            )}


            {playerData[playerSource].player_is_connecting ? (
              <Tooltip color={theme.colors.gray[5]} withArrow label={T.player_is_connecting}>
                <Loader size={24} color={theme.primaryColor} />
              </Tooltip>

            ) : (
              <Avatar size={28} radius="xl" color={theme.primaryColor}>{<span style={{ fontWeight: "500" }}>{playerSource}</span>}</Avatar>
            )}
          </div>

        </Paper>
      </div>
      )}
    </>

  )
}
