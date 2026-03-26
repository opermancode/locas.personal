import { create } from 'zustand';

export const useFinanceStore = create((set) => ({
  accounts: [],
  netWorth: 0,

  setAccounts: (accounts) => set({ accounts }),

  calculateNetWorth: () =>
    set((state) => ({
      netWorth: state.accounts.reduce(
        (sum, acc) => sum + acc.balance,
        0
      ),
    })),
}));