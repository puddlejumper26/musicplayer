import { Action, createReducer, on } from "@ngrx/store";

import { SetModalVisible, SetModalType, SetUserId } from './../actions/member.actions';

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
    modalType: ModalTypes;
    userId: string;
}

export const initialState: MemberState = {
  modalVisible: false,
  modalType: ModalTypes.Default,
  userId: '',
}

// register 6 actions
const reducer = createReducer(
    initialState,
    on(SetModalVisible, (state, {modalVisible}) => ({...state, modalVisible})),
    on(SetModalType, (state, {modalType}) => ({...state, modalType})),
    on(SetUserId, (state, {userId}) => ({...state, userId})),
)

export function memberReducer(state: MemberState, action: Action) {
    return reducer(state, action);
}
