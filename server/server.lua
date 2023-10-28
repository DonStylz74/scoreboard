local max_players = GetConvar('sv_maxclients', 0)
local modules = require "server.modules"
local function serverCreated()
    local totalPlayers = GetPlayers()
    for _, serverid in pairs(totalPlayers) do
        modules.players.addPlayer(tostring(serverid), {
            playerName = GetPlayerName(serverid),
            player_is_connecting = true
        })
    end

end CreateThread(serverCreated)


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
            player_is_connecting = locale('player_is_connecting')
        }
    }
end)

lib.callback.register('scoreboard:getInfo', function(source)
    for _, societyData in ipairs(Config.societies) do
        societyData.society_employee_count = math.random(3000)
    end

    return {
        SOCIETIES = Config.societies,
        PLAYERS = modules.players.getPlayerList()
    }
end)