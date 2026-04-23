import { create } from 'zustand';

const todayIso = () => new Date().toISOString().split('T')[0];

export const useFinanceStore = create((set, get) => ({
  accounts: [],
  expenses: [],
  automations: [
    { id: 'a1', title: 'Monthly Salary', type: 'credit', amount: 25000, dayOfMonth: 1, note: 'Default salary automation' },
  ],
  extraIncomes: [],
  debtItems: [],

  addAccount: ({ name, branch, kind }) =>
    set((state) => ({
      accounts: [...state.accounts, { id: Date.now().toString(), name, branch, kind }],
    })),

  addExpense: ({ title, amount, note, date }) =>
    set((state) => ({
      expenses: [
        { id: Date.now().toString(), title, amount: Number(amount), note, date: date || todayIso() },
        ...state.expenses,
      ],
    })),

  addAutomation: ({ title, type, amount, dayOfMonth, note }) =>
    set((state) => ({
      automations: [
        ...state.automations,
        { id: Date.now().toString(), title, type, amount: Number(amount), dayOfMonth: Number(dayOfMonth), note },
      ],
    })),

  addExtraIncome: ({ source, amount, note, date }) =>
    set((state) => ({
      extraIncomes: [
        { id: Date.now().toString(), source, amount: Number(amount), note, date: date || todayIso() },
        ...state.extraIncomes,
      ],
    })),

  addDebtItem: ({ person, relationType, amount, interest, emi, note }) =>
    set((state) => ({
      debtItems: [
        ...state.debtItems,
        {
          id: Date.now().toString(),
          person,
          relationType,
          amount: Number(amount),
          interest: Number(interest || 0),
          emi: Number(emi || 0),
          note,
        },
      ],
    })),

  summary: () => {
    const { expenses, extraIncomes, automations } = get();
    const spent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const earned =
      extraIncomes.reduce((sum, item) => sum + item.amount, 0) +
      automations.filter((a) => a.type === 'credit').reduce((sum, item) => sum + item.amount, 0);
    const scheduledDebit = automations
      .filter((a) => a.type === 'debit')
      .reduce((sum, item) => sum + item.amount, 0);

    return { spent, earned, scheduledDebit, balance: earned - (spent + scheduledDebit) };
  },
}));
