import { Paper, Avatar, useMantineTheme, Divider } from '@mantine/core'

export default function Society({ data }: any) {
  const theme = useMantineTheme();
  return (
    <>

      {data.map((data: any, index: any) => <div key={index} >
        <Paper style={{ height: "3.5rem", backgroundColor: theme.colors.dark[8], marginBottom: ".5rem", display: "flex", justifyContent: "space-between", alignItems: "center", padding: '0.1rem 1rem 0.1rem 1rem' }} withBorder radius="xl">
          {<p style={{ fontWeight: "600" }}>{data.society_label}</p>}
          <Avatar size={28} radius="xl" color={data.society_employee_count < 1 ? theme.colors.red[4] : theme.colors.gray[4]}>{<span style={{ fontWeight: "300" }}>{data.society_employee_count.toString()}</span>}</Avatar>
        </Paper>

        {data.divider && (
          <Divider my="xs" label={data.divider} labelPosition="left" style={{ paddingLeft: "1rem", paddingRight: "1rem" }} />
        )}

      </div>
      )}
    </>
  )
}