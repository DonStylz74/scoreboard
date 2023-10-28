local utils = require "client.utils"
local keybind = lib.addKeybind({
    name = 'scoreboard',
    description = 'press F to pay respects',
    defaultKey = 'TAB',
    onPressed = function(self)
		local scoreboardInfo = lib.callback.await('scoreboard:getInfo')
        if scoreboardInfo.PLAYERS and scoreboardInfo.PLAYERS[tostring(cache.serverId)] then
            scoreboardInfo.PLAYERS[tostring(cache.serverId)].self = true
        end

		SendNUIMessage({ action = 'scoreboardInfo', data = scoreboardInfo})
      	utils.toggleNuiFrame(false)
    end,
})

local function playerLoaded()
    while not utils.loaded do
        Wait(1000)
    end
    
    print('Scoreboard UI Loaded')

end CreateThread(playerLoaded)