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
        local framework_societies = Config.coreObject.GetJobs() -- returns ESX.Jobs
        local societies = {}
        for index, data in pairs(Config.societies) do
            societies[#societies+1] = {
                divider = data?.divider,
                society_label = data.society_label or framework_societies[data.society_name].label,
                society_name = data.society_name,
                society_employee_count = #Config.coreObject.GetExtendedPlayers('job', data.society_name)
            }
        end

        return societies
    end
}


local function resourceStarted(name)
    return GetResourceState(name):find('start') ~= nil
end


local core = false
local coreObject = false
local getCore = function()
    if not core then core = resourceStarted('es_extended') and "esx" or resourceStarted('qb-core') and 'qb' or resourceStarted('ox_core') and 'ox' or 'standalone' end

    if not coreObject then
        coreObject = core == "esx" and exports.es_extended:getSharedObject() or (core == "qb" and exports['qb-core']:GetCoreObject() or false)
    end

    return core, coreObject
end

return { admin = admin, players = players, societies = societies, getCore = getCore }