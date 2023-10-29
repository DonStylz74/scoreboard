import { useMantineTheme, Paper, Avatar, Loader, Tooltip, Text, darken } from '@mantine/core';
import ScoreboardIcons from '../ScoreboardIcons.';

const TagWithTooltip = ({ tagName, tagData }: any) => {
  const hasTooltip = tagData.tooltip;
  console.log(tagData)


  return hasTooltip ? (
    <Tooltip label={hasTooltip}>
      <Avatar
        key={tagName}
        size={28}
        radius="xl"
        variant="light"
        color={tagData.color}
      >
        <span style={{ fontWeight: "500", height: "1rem", fill: `var(--mantine-color-${tagData.color}-4)` }}>
          {ScoreboardIcons.hasOwnProperty(tagData.icon) ? (ScoreboardIcons as any)[tagData.icon] : ScoreboardIcons.Star}
        </span>
      </Avatar>
    </Tooltip>
  ) : (
    <Avatar
      key={tagName}
      size={28}
      radius="xl"
      variant="light"
      color={tagData.color}
    >
      <span style={{ fontWeight: "500", height: "1rem", fill: `var(--mantine-color-${tagData.color}-4)` }}>
      {ScoreboardIcons.hasOwnProperty(tagData.icon) ? (ScoreboardIcons as any)[tagData.icon] : ScoreboardIcons.Star}
      </span>
    </Avatar>
  );
};

export default function Player({ playerData, T, showAlternative }: any) {
  const theme = useMantineTheme();

  return (
    <>
      {Object.keys(playerData).map((playerSource: any, index: any) => (
        <div key={index}>
          <Paper
            style={{
              maxWidth: "100%",
              minWidth: "100%", // Set a maximum width for the container
              borderColor: playerData[playerSource].self && `var(--mantine-color-${theme.primaryColor}-filled)`,
              textAlign: "center",
              height: "3.5rem",
              backgroundColor: theme.colors.dark[8],
              marginBottom: ".5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: '0.1rem 1rem 0.1rem 1rem',
            }}
            withBorder
            radius="xl"
          >
            <Text
              c={showAlternative ? playerData[playerSource].alternativeName ? "inherit" : darken("#e80a0a", 0.3) : "inherit"}
              fw={300}
              truncate="end"
            >
              {showAlternative ? playerData[playerSource].alternativeName ? playerData[playerSource].alternativeName : playerData[playerSource].playerName : playerData[playerSource].playerName}
            </Text>
            <div style={{ display: "flex", justifyContent: "flex-end", columnGap: "1rem" }}>
              {playerData[playerSource].tags &&
                Object.keys(playerData[playerSource].tags).map((tagName) => (
                  <TagWithTooltip key={tagName} tagName={tagName} tagData={playerData[playerSource].tags[tagName]} />
                ))}
              {playerData[playerSource].player_is_connecting ? (
                <Tooltip color={theme.colors.gray[5]} withArrow label={T.player_is_connecting}>
                  <Loader size={24} color={theme.primaryColor} />
                </Tooltip>
              ) : (
                <Avatar size={28} radius="xl" color={theme.primaryColor}>
                  <span style={{ fontWeight: "500" }}>{playerSource}</span>
                </Avatar>
              )}
            </div>
          </Paper>
        </div>
      ))}
    </>
  );
}