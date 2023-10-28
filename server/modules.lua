local admin = {
    isAdmin = function(source)
        return true
    end
}

local playerlist = {}
local players = {
    addPlayer = function(source, data)
        if not playerlist[source] then
            playerlist[source] = data
        end
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



return { admin = admin, players = players }