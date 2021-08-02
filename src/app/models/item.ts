import { StateType } from "../helpers/state";

export class Item {
        public id = -1;
        public name = '';
        public price = 0.0;
        public description = '';
        public state!: StateType;
}