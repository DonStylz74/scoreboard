lib.locale()
Config = {}

---@param displayContent players | societies | both
---@param leftside boolean
---@param primaryColor MantineColor
Config.server = {
    displayContent = "both",
    leftside = true,
    primaryColor = GetConvar('ox:primaryColor', 'violet')
}


---@param society_label string
---@param society_employee_count number
---@param divider? string
Config.societies = {
    {
        society_label = "LSPD",
        society_employee_count = 300,
    },
    {
        society_label = "LSSD",
        society_employee_count = 300
    },
    {
        society_label = "EMS",
        society_employee_count = 300
    },
}