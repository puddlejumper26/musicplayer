import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MemberState } from '../reducers/member.reducer';

const selectMemberStates = (state: MemberState) => state;

// to obtain the member
/**
 * @member has to be identical with the index.ts ->     StoreModule.forRoot({member: memberReducer},
 */
export const getMember = createFeatureSelector<MemberState>('member');

export const getModalVisible = createSelector(selectMemberStates, (state: MemberState) => state.modalVisible);
export const getModalType = createSelector(selectMemberStates, (state: MemberState) => state.modalType);
export const getUserId = createSelector(selectMemberStates, (state: MemberState) => state.userId);
export const getLikeId = createSelector(selectMemberStates, (state: MemberState) => state.likeId);
