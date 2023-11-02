export interface SocietyData {
    society_label: string;
    society_employee_count: string;
    society_icon: string,
    society_divider?: string | boolean;
}

export interface PlayerTags {
    tag_label: string
}
export interface PlayerData {
    player_name: string;
    player_alt_name?: string;
    self?: Boolean;
    tags?: PlayerTags[],
}


export interface SocietiesData {
    [key: string]: SocietyData
}

export type ScoreboardData = any;