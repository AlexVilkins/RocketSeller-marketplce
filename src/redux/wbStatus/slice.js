import { createSlice } from '@reduxjs/toolkit';

const status = {
  CREATED: 'CREATED',
  APPROVED: 'APPROVED',
  PARTIAL_APPROVED: 'PARTIAL_APPROVED',
  PARTIAL_REJECTED: 'PARTIAL_REJECTED',
  REJECTED: 'REJECTED',
  DELETED: 'DELETED',
};

const wbSlice = createSlice({
  name: 'wbStatus',
  initialState: {
    items: {},
  },
  reducers: {
    setWbProductStatus(state, action) {
      const newProducts = [...action.payload].reduce((acc, item) => {
        acc[item.id] = {
          status: item.status,
          totalCount: item.alibabaProductsCounts.total,
          approvedCount: item.alibabaProductsCounts.approved,
          rejectedCount: item.alibabaProductsCounts.rejected,
        };
        return acc;
      }, {});
      state.items = { ...newProducts };
    },

    changeWbProductStatus(state, action) {
      const { id, isApproving, prevStatus } = action.payload;

      let deltaAppr;
      let deltaRej;
      if (!isApproving && prevStatus == status.APPROVED) {
        deltaRej = 1;
        deltaAppr = -1;
      } else if (isApproving && prevStatus == status.REJECTED) {
        deltaRej = -1;
        deltaAppr = 1;
      } else if (isApproving && prevStatus == status.APPROVED) {
        deltaRej = 0;
        deltaAppr = 0;
      } else if (!isApproving && prevStatus == status.REJECTED) {
        deltaRej = 0;
        deltaAppr = 0;
      } else if (isApproving) {
        deltaRej = 0;
        deltaAppr = 1;
      } else {
        deltaRej = 1;
        deltaAppr = 0;
      }

      const approvedCount = state.items[id].approvedCount;
      const rejectedCount = state.items[id].rejectedCount;
      const totalCount = state.items[id].totalCount;
      let newStatus;

      if (totalCount === approvedCount + deltaAppr) {
        newStatus = status.APPROVED;
      } else if (totalCount === rejectedCount + deltaRej) {
        newStatus = status.REJECTED;
      } else if (approvedCount + deltaAppr > 0) {
        newStatus = status.PARTIAL_APPROVED;
      } else if (
        rejectedCount + deltaRej > 0 &&
        approvedCount + deltaAppr == 0
      ) {
        newStatus = status.PARTIAL_REJECTED;
      } else {
        newStatus = state.items[id].status;
      }

      state.items = {
        ...state.items,
        [id]: {
          ...state.items[id],
          status: newStatus,
          approvedCount: approvedCount + deltaAppr,
          rejectedCount: rejectedCount + deltaRej,
        },
      };
    },
  },
});

export const { setWbProductStatus, changeWbProductStatus } = wbSlice.actions;

export default wbSlice.reducer;
