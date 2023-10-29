local max_players = GetConvar('sv_maxclients', 0)
local modules = require "server.modules"

local function serverCreated()
    Config.core, Config.coreObject = modules.getCore()


    local totalPlayers = GetPlayers()
    for _, serverid in pairs(totalPlayers) do
        local data = {
            playerName = GetPlayerName(serverid),
            player_is_connecting = true,
            connectedAt = os.time()
        }

        if Config.core == 'esx' then
            local xPlayer = Config.coreObject.GetPlayerFromId(serverid)
            if xPlayer then
                data.player_is_connecting = false
                data.alternativeName = Config.server.roleplayName and data.playerName or xPlayer.name
                if Config.server.roleplayName then
                    data.playerName = xPlayer.name 
                end

                if xPlayer.group == "admin" then
                    data.tags = {
                        admin = {
                            color = "blue",
                            icon = "Star",
                            tooltip = "STAFF Team",
                        }, 
                    }
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
            local data = {
                playerName = GetPlayerName(serverid),
                player_is_connecting = false,
            }

            data.alternativeName = Config.server.roleplayName and data.playerName or xPlayer.name
            if Config.server.roleplayName then
                data.playerName = xPlayer.name 
            end

            if xPlayer.group == "admin" then
                data.tags = {
                    admin = {
                        color = "blue",
                        icon = "Star",
                        tooltip = "STAFF Team",
                    }, 
                }
            end

            modules.players.addPlayer(tostring(xPlayer.source), data)

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
            scoreboard = locale('scoreboard'),
            toggle_alt_name = locale('toggle_alt_name')
        }
    }
end)

lib.callback.register('scoreboard:getInfo', function(source)
    return {
        SOCIETIES = modules.societies.getSocietyList(),
        PLAYERS = modules.players.getPlayerList()
    }
end)