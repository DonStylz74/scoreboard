lib.locale()
Config = {}

---@param displayLoadingPlayers boolean
---@param displayContent players | societies | both 
---@param leftside boolean
---@param primaryColor MantineColor
Config.server = {
    displayLoadingPlayers = true,
    displayContent = "both",
    leftside = true,
    primaryColor = 'pink'
}


---@param society_label string
---@param divider? string
Config.societies = {
    {
        society_label = "LSPD",
    },
    {
        society_label = "LSSD",
    },
    {
        society_label = "EMS",
    },
}