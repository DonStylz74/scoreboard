local scoreboard_started = false
local open = false
local DisablePlayerFiring = DisablePlayerFiring
local HudWeaponWheelIgnoreSelection = HudWeaponWheelIgnoreSelection
local DisableControlAction = DisableControlAction
local Wait = Wait
local scoreboardData = {}
local function disableKeys()
    while open do
        Wait(0)
		DisablePlayerFiring(cache.playerId, true)
		HudWeaponWheelIgnoreSelection()
		DisableControlAction(0, 1, true)
		DisableControlAction(0, 2, true)
		DisableControlAction(0, 140, true)
		DisableControlAction(0, 177, true)
		DisableControlAction(0, 199, true)
		DisableControlAction(0, 200, true)
		DisableControlAction(0, 202, true)
		DisableControlAction(2, 19, true)
    end
end

local function toggleScoreboard()
    open = not open
    if open then
        TriggerScreenblurFadeIn(250.0)
        CreateThread(disableKeys)
    end
    
    SetNuiFocus(open, open)
    SetNuiFocusKeepInput(open)
    scoreboardData.SOCIETIES = lib.callback.await('scoreboard:requestUpdate')

    SendNUIMessage({ action = 'scoreboard:toggle', data = open})
    SendNUIMessage({ action = 'scoreboard:update', data = scoreboardData})
end

local function scoreboardClosed()
    TriggerScreenblurFadeOut(0.0)
    open = false
    SetNuiFocus(open, open)
    SetNuiFocusKeepInput(open)
end


local scoreboardKeybind = lib.addKeybind({
    name = 'scoreboard',
    description = 'press F to pay respects',
    defaultKey = 'TAB',
    onPressed = toggleScoreboard,
})

RegisterNuiCallback('scoreboard:onClose', function(_, cb)
    scoreboardClosed()
    cb({})
end)


RegisterNuiCallback('scoreboard:initialized', function(_, cb)
    if not scoreboard_started then
        scoreboard_started = true
        scoreboardData.GLOBAL = lib.callback.await('scoreboard:requestInitialData')
        scoreboardData.GLOBAL.PLAYER_SOURCE = cache.serverId
        SendNUIMessage({ action = 'scoreboard:update', data = scoreboardData})
    end
    cb({})
end)

RegisterNetEvent('scoreboard:syncPlayers', function(players)
    scoreboardData.PLAYERS = players
    scoreboardData.PLAYERS[tostring(cache.serverId)].self = true
end)

RegisterNetEvent('scoreboard:syncSocieties', function(societies)
    scoreboardData.SOCIETIES = societies
end)