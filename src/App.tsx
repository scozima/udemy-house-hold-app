import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Nomatch from "./pages/Nomatch";
import AppLayout from "./components/layout/AppLayout";
import theme from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Transaction } from "./types/index";
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";
import { doc, deleteDoc } from "firebase/firestore";

function App() {
  // Firestoreエラーかどうかを判定する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

  // firebaseから取得したデータを格納する
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // console.log(formatMonth(currentMonth));

  // firebaseからデータを取得
  useEffect(() => {
    const fetcheTransactionsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction; // 型アサーション
        });

        setTransactions(transactionsData);
        // console.log(transactionsData);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error("firebaseのエラーは:", err);
          console.error("firebaseのエラーメッセージは:", err.message);
          console.error("firebaseのエラーコードは:", err.code);
        } else {
          console.error("一般的なエラーは:", err);
        }
      }
    };
    fetcheTransactionsData();
  }, []);

  // 今月のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });
  // console.log(monthlyTransactions);

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction);
    try {
      // firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      // console.log(newTransaction);
      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firebaseのエラーは:", err);
        console.error("firebaseのエラーメッセージは:", err.message);
        console.error("firebaseのエラーコードは:", err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      // firestoreのデータ削除
      await deleteDoc(doc(db, "Transactions", transactionId));

      const filterdTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      // console.log(filterdTransactions);
      setTransactions(filterdTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firebaseのエラーは:", err);
        console.error("firebaseのエラーメッセージは:", err.message);
        console.error("firebaseのエラーコードは:", err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      // firestore更新処理
      const docRef = doc(db, "Transactions", transactionId);

      await updateDoc(docRef, transaction);

      // フロント更新
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      console.log(updatedTransactions);
      setTransactions(updatedTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firebaseのエラーは:", err);
        console.error("firebaseのエラーメッセージは:", err.message);
        console.error("firebaseのエラーコードは:", err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<Nomatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
