local admin = {
    isAdmin = function(source)
        return true
    end
}

local playerlist = {}
local players = {
    addPlayer = function(source, data)
        playerlist[source] = data
    end,
    removePlayer = function(source)
        if playerlist[source] then
            print(('Removing %s'):format(source))
            playerlist[source] = nil
        end
    end,
    getPlayerList = function()
        return playerlist
    end
}

local societies = {
    getSocietyList = function()
        local framework_societies = Config.core.GetJobs() -- returns ESX.Jobs
        local societies = {}
        for index, data in pairs(Config.societies) do
            societies[#societies+1] = {
                divider = data?.divider,
                society_label = data.society_label or framework_societies[data.society_name].label,
                society_name = data.society_name,
                society_employee_count = 50
            }
        end

        return societies
    end
}


return { admin = admin, players = players, societies = societies }