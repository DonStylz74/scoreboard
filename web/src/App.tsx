import { useState } from 'react';
import Scoreboard from './pages/Scoreboard';
import { ScoreboardData } from './types';
import { useNuiEvent } from './hooks/useNuiEvent';
/* import { fetchNui } from './utils/fetchNui'; */

const MOCKDATA = {
  GLOBAL: {
    MAX_PLAYERS: 256,
    PLAYER_SOURCE: 0,
    PLAYER_ADMIN: true,
    UI_LEFT_SIDE: false,
    UI_USE_LOGO: true,
    UI_TABS: "both",
  },
  PLAYERS: {
    1: {
      player_name: "Player 1",
      player_alt_name: "playa 1",
      tags: [
        {
          tag_icon: "AiFillAccountBook",
          tag_label: "Admin",
          tag_color: "red"
        },
      ],
    },
    2: {
      player_name: "Player 2",
      player_alt_name: "playa 2",
      self: true,
    },
    3: {
      player_name: "Player 3",
      player_alt_name: "playa 3"
    },
    4: {
      player_name: "Player 4",
      player_alt_name: "playa 4"
    },
    5: {
      player_name: "Player 5",
      player_alt_name: "playa 5"
    },
    6: {
      player_name: "Player 6",
      player_alt_name: "playa 6"
    },
    7: {
      player_name: "Player 7",
      player_alt_name: "playa 7"
    },
    8: {
      player_name: "Player 8",
      player_alt_name: "playa 8"
    },
    9: {
      player_name: "Player 9",
      player_alt_name: "playa 9"
    },
    10: {
      player_name: "Player 10",
      player_alt_name: "playa 10"
    },
    11: {
      player_name: "Player 11",
      player_alt_name: "playa 11"
    },
    12: {
      player_name: "Player 12",
      player_alt_name: "playa 12"
    },
    13: {
      player_name: "Player 13",
      player_alt_name: "playa 13"
    },
    14: {
      player_name: "Player 14",
      player_alt_name: "playa 14"
    },
    15: {
      player_name: "Player 15",
      player_alt_name: "playa 15"
    },
    16: {
      player_name: "Player 16",
      player_alt_name: "playa 16"
    },
    17: {
      player_name: "Player 17",
      player_alt_name: "playa 17"
    },
    18: {
      player_name: "Player 18",
      player_alt_name: "playa 18"
    },
    19: {
      player_name: "Player 19",
      player_alt_name: "playa 19"
    },
    20: {
      player_name: "Player 20",
      player_alt_name: "playa 20"
    },
    21: {
      player_name: "Player 21",
      player_alt_name: "playa 21"
    },
    22: {
      player_name: "Player 22",
      player_alt_name: "playa 22"
    },
    23: {
      player_name: "Player 23",
      player_alt_name: "playa 23"
    },
    24: {
      player_name: "Player 24",
      player_alt_name: "playa 24"
    },
    25: {
      player_name: "Player 25",
      player_alt_name: "playa 25"
    }
  },
  SOCIETIES: {
    police: {
      society_label: "Los Santos Police Department",
      society_employee_count: Math.floor(Math.random() * 1001),
      society_icon: "siren",
      society_divider: "LSPD"
    }
  },
}

import { fetchNui } from './utils/fetchNui';

export default function App() {
  //@ts-ignore
  const [data, setData] = useState<ScoreboardData>(MOCKDATA);
  //@ts-ignore
  const [fetching, setFetching] = useState<boolean>(false);

  fetchNui('scoreboard:initialized')


    
  useNuiEvent("scoreboard:update", (newData: any) => {
    setData((data: any) => ({ ...data, ...newData }));
  });

  return (
    <>
      <Scoreboard SCOREBOARD={data} />
    </>
  )
}
