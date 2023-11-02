local societies = {}

local function getSocieties()
    return societies
end

local function initialize()
    for society in pairs(Config.societies) do
        societies[society] = {
            society_employee_count = ESX.GetExtendedPlayers('job', society)
        }
    end
end

return {
    initialize = initialize,
    getSocieties = getSocieties
}