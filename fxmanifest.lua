version '1.0.0'
fx_version 'cerulean'
lua54 'yes'
game 'gta5'

description 'Advanced scoreboard'
author 'mikigoalie @ LSRP'

ui_page 'web/build/index.html'

files {
    'locales/*.json',
    'web/build/index.html',
    'web/build/**/*',
}


shared_scripts { '@ox_lib/init.lua', 'shared/utils.lua', 'shared/config.lua' }
server_scripts { 'server/*.lua' }
client_scripts { 'client/*.lua' }

dependencies { 'ox_lib' }