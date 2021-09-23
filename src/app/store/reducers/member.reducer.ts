import { SetModalVisible, SetModalType } from './../actions/member.actions';
import { Action, createReducer, on } from "@ngrx/store";

// pop up window types
export enum ModalTypes {
  Register = 'register',
  LoginByPhone = 'loginByPhone',
  Share = 'share',
  Like = 'like',
  Default = 'default',
}

export type MemberState = {
    modalVisible: boolean;
    modalType: ModalTypes
}

export const initialState: MemberState = {
  modalVisible: false,
  modalType: ModalTypes.Default
}

// register 6 actions
const reducer = createReducer(
    initialState,
    on(SetModalVisible, (state, {modalVisible}) => ({...state, modalVisible})),
    on(SetModalType, (state, {modalType}) => ({...state, modalType}))
)

export function memberReducer(state: MemberState, action: Action) {
    return reducer(state, action);
}
