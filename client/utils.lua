local scoreboardUtils = {  
    loaded = false,
    visible = false,
    toggleNuiFrame = function(boolean)
          SetNuiFocus(not visible, not visible)
          SetNuiFocusKeepInput(not visible)
          SendNUIMessage({
            action = 'setVisible',
            data = not visible
          })
          visible = not visible
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
    scoreboardUtils.visible = false
    cb({})
end)


return scoreboardUtils