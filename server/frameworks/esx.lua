local modules = require "server.modules"
RegisterNetEvent('esx:playerLoaded', function(player, xPlayer, isNew)
    print(Config.core)
    if not Config.core == 'esx' then
        return
    end


    local data = {
        playerName = GetPlayerName(xPlayer.source),
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
    if not Config.core == 'esx' then
        return
    end

    modules.players.addPlayer(tostring(playerId), {
        playerName = GetPlayerName(playerId),
        player_is_connecting = true
    })
end)