import { createStore } from 'redux';
import {DefaultValueType} from "../component/page/mock_data/home_data";
export interface ReducerType {
    campaign: string | number
    title: string | number
    description: string | number
    defaultValue: DefaultValueType[]
}

const initialState: ReducerType = {
    campaign: '',
    title: '',
    description: '',
    defaultValue: []
};

const configReducer = (state = initialState, { type, ...rest }: Record<string, any>) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest };
        case 'clear':
            return initialState;
        default:
            return state;
    }
};
const store = createStore(configReducer);
export default store;