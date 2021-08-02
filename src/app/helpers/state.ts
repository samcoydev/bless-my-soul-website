export enum StateType {
    Draft = 'DRAFT',
    Posted = 'POSTED',
    Archived = 'ARCHIVED'
}

export const StateTypeLabelMapping: Record<StateType, string> = {
    [StateType.Draft]: "Draft",
    [StateType.Posted]: "Posted",
    [StateType.Archived]: "Archived",
};