local players = {}

local function getPlayers()
    return players
end

local function playerAdd(playerSource)
    if not playerSource then return end

    local xPlayer = ESX.GetPlayerFromId(playerSource)
    local playerData = xPlayer and {
        player_name = xPlayer.name,
        player_alt_name = GetPlayerName(xPlayer.source)
    } or {
        player_name = GetPlayerName(playerSource),
        player_alt_name = GetPlayerName(playerSource)
    }

    players[tostring(playerSource)] = playerData
end

local function initialize()
    local players = GetPlayers()
    for _, playerId in ipairs(GetPlayers()) do
        playerAdd(playerId)
    end
end



local function removePlayer(source)
    if not source then return end
    if not players[tostring(source)] then return end
    players[tostring(source)] = nil
end

return {
    playerAdd = playerAdd,
    getPlayers = getPlayers,
    initialize = initialize,
    removePlayer = removePlayer,
}