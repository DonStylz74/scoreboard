lib.locale()
Config = {}

---@param roleplayName boolean
---@param displayLoadingPlayers boolean
---@param displayContent players | societies | both 
---@param leftside boolean
---@param primaryColor MantineColor
Config.server = {
    roleplayName = true,
    displayLoadingPlayers = true,
    displayContent = "both",
    leftside = false,
    primaryColor = 'pink'
}


---@param society_name string
---@param society_label? string
---@param divider? string
Config.societies = {
    {
        society_name = "police",
    },
    {
        society_name = "ambulance",
    },
}