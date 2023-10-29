local scoreboardOpened = false
local function disableKeys()
	while scoreboardOpened do
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
local scoreboardUtils = {  
    loaded = false,
    toggleNuiFrame = function(boolean)
		scoreboardOpened = not scoreboardOpened
		TriggerScreenblurFadeIn(250.0)
		CreateThread(disableKeys)
        SetNuiFocus(scoreboardOpened, scoreboardOpened)
        SetNuiFocusKeepInput(scoreboardOpened)
        SendNUIMessage({ action = 'setVisible', data = scoreboardOpened })
    end
 }

RegisterNUICallback('scoreboard:initialized', function(_, cb)
    local SETTINGS = lib.callback.await('scoreboard:getInitialData', 0)
    scoreboardUtils.loaded = true
    cb(SETTINGS)
end)


RegisterNUICallback('scoreboard:onClose', function(data, cb)
	SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    TriggerScreenblurFadeOut(500.0)
	CreateThread( function()
		Wait(100)
		scoreboardOpened = false
	end)

    cb({})
end)


return scoreboardUtils