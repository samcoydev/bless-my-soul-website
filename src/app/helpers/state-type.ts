export enum StateType {
    Draft = 'DRAFT',
    ComingSoon = 'COMING_SOON',
    Posted = 'POSTED',
    Archived = 'ARCHIVED'
}

export const StateTypeLabelMapping: Record<StateType, string> = {
    [StateType.Draft]: "Draft",
    [StateType.ComingSoon]: "Coming Soon",
    [StateType.Posted]: "Posted",
    [StateType.Archived]: "Archived",
};