ESX = exports.es_extended:getSharedObject()
local players = require 'server.modules.players'
local ESXJOBS = {}
local MAX_PLAYERS = GetConvar('sv_maxclients', 0)

lib.callback.register('scoreboard:requestInitialData', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    local CFG = Config.server
    CFG.MAX_PLAYERS = MAX_PLAYERS
    CFG.PLAYER_ADMIN = xPlayer and Config.playerAdmin(xPlayer) or false
    return CFG
end)

lib.callback.register('scoreboard:requestUpdate', function(source)
    local SOCIETIES = {}
    for _, society in pairs(Config.societies) do
        if not ESXJOBS[society] then return end

        SOCIETIES[society] = {
            society_label = ESXJOBS[society].label,
            society_employee_count = #ESX.GetExtendedPlayers('job', society) or 0
        }
    end

    return SOCIETIES
end)

local function start()
    Wait(500)
    ESXJOBS = ESX.GetJobs()
    players.initialize()
    --societies.initialize()
    TriggerClientEvent('scoreboard:syncPlayers', -1, players.getPlayers())
    --TriggerClientEvent('scoreboard:syncSocieties', -1, societies.getSocieties())
end CreateThread(start)


RegisterNetEvent('playerDropped', function()
    players.removePlayer(source)
    TriggerClientEvent('scoreboard:syncPlayers', -1, players.getPlayers())
end)

RegisterNetEvent('esx:playerLoaded', function(player, xPlayer, isNew)
    players.playerAdd(xPlayer.source)
    TriggerClientEvent('scoreboard:syncPlayers', -1, players.getPlayers())
end)
  
RegisterNetEvent('esx:playerLogout', function(playerId, cb)
    players.playerAdd(playerId)
    TriggerClientEvent('scoreboard:syncPlayers', -1, players.getPlayers())
end)
