import { Balance, Transaction } from "../types";

export function financeCalculations(transactions: Transaction[]): Balance {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type == "income") {
        // 収入
        acc.income += transaction.amount;
      } else {
        // 支出
        acc.expense += transaction.amount;
      }

      // 残高　＝ 収入 - 支出
      acc.balance = acc.income - acc.expense;

      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );
}
// 1. 日付ごとの収支を計算する関数
export function calculateDailyBalances(
  transactions: Transaction[]
): Record<string, Balance> {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;

    // 初めての日付が出た場合は初期化
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }

    // 収入または支出を加算
    if (transaction.type === "income") {
      acc[day].income += transaction.amount;
    } else {
      acc[day].expense += transaction.amount;
    }

    // balanceの計算
    acc[day].balance = acc[day].income - acc[day].expense;

    return acc;
  }, {});
}
