local max_players = GetConvar('sv_maxclients', 0)
local function serverCreated()
end CreateThread(serverCreated)

lib.callback.register('scoreboard:getInitialData', function(source)
    return {
        leftside = Config.server.leftside,
        displayContent = Config.server.displayContent,
        playerAdmin = true,
        max_players = max_players,
        primaryColor = Config.server.primaryColor,
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
    return {
        SOCIETIES = Config.societies
    }
end)