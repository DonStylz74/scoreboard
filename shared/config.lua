lib.locale()
Config = {}

---@param roleplayName boolean
---@param UI_USE_LOGO boolean
---@param UI_TABS players | societies | both 
---@param UI_LEFT_SIDE boolean
Config.server = {
    UI_LEFT_SIDE = false,
    UI_USE_LOGO = false,
    UI_TABS = 'both'
}


---@param society_name string
---@param society_label? string
---@param divider? string
Config.societies = {
    'police'
}

if not IsDuplicityVersion() then return end

Config.playerAdmin = function(source)
    return ESX.GetPlayerFromId(source)?.getGroup() == "admin" or false
end