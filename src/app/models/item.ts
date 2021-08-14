import { StateType } from "../helpers/state-type";

export class Item {
        constructor(
                public id: number,
                public name: string,
                public price: number,
                public description: string,
                public state: StateType
        ) {}
}