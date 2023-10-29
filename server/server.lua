local max_players = GetConvar('sv_maxclients', 0)
local modules = require "server.modules"
local function resourceStarted(name)
    return GetResourceState(name):find('start') ~= nil
end

local function getCore()
    return resourceStarted('es_extended') and "esx" or resourceStarted('qb-core') and 'qb' or resourceStarted('ox_core') and 'ox' or 'standalone'
end

local function serverCreated()
    Config.serverCore = getCore()
    Config.core = Config.serverCore == "esx" and exports.es_extended:getSharedObject() or exports['qb-core']:GetCoreObject()


    local totalPlayers = GetPlayers()
    for _, serverid in pairs(totalPlayers) do
        local data = {
            playerName = GetPlayerName(serverid),
            player_is_connecting = true,
            connectedAt = os.time()
        }




        if Config.serverCore == 'esx' then
            local xPlayer = Config.core.GetPlayerFromId(serverid)
            if xPlayer then
                data.player_is_connecting = false
                if Config.server.roleplayName then
                    data.playerName = xPlayer.name 
                end
            end
        
        end

        modules.players.addPlayer(tostring(serverid), data)
    end

end CreateThread(serverCreated)

local function frameworkEvents()
    while not Config.serverCore do
        Wait(1000)
    end


    if Config.serverCore == "esx" then
        RegisterNetEvent('esx:playerLoaded', function(player, xPlayer, isNew)
            modules.players.addPlayer(tostring(xPlayer.source), {
                playerName = xPlayer.name,
                player_is_connecting = false
            })

        end)
          
        RegisterNetEvent('esx:playerLogout', function(playerId, cb)
            modules.players.addPlayer(tostring(xPlayer.source), {
                playerName = GetPlayerName(playerId),
                player_is_connecting = true
            })
        end)

          
    end
end CreateThread(frameworkEvents)



if Config.server.displayLoadingPlayers then
    AddEventHandler('playerJoining', function()
    	modules.players.addPlayer(tostring(source), {
            playerName = GetPlayerName(source),
            player_is_connecting = true
        })
    end)

    AddEventHandler('playerDropped', function()
        print(('%s dropped'):format(source))
    	modules.players.removePlayer(tostring(source))
    end)
end

lib.callback.register('scoreboard:getInitialData', function(source)
    return {
        leftside = Config.server.leftside,
        displayContent = Config.server.displayContent,
        playerAdmin = modules.admin.isAdmin(source),
        max_players = max_players,
        primaryColor = Config.server?.primaryColor or GetConvar('ox:primaryColor', 'violet'),
        UI = {
            player = locale('player'),
            players = locale('players'),
            society = locale('society'),
            societies = locale('societies'),
            employees = locale('employees'),
            serverid = locale('serverid'),
            player_is_connecting = locale('player_is_connecting'),
            scoreboard = locale('scoreboard')
        }
    }
end)

lib.callback.register('scoreboard:getInfo', function(source)
    return {
        SOCIETIES = modules.societies.getSocietyList(),
        PLAYERS = modules.players.getPlayerList()
    }
end)