import { createContext, ReactNode, useEffect, useState, useContext } from 'react'
import { api } from '../services/api'


interface Transaction {
    id: number;
    title: string;
    category: string;
    amount: number;
    createdAt: string;
    type: string;
}


type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>
    removeTransaction: (id: number) => void
}


const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions').then(response => setTransactions(response.data.transactions))
    }, [])

    async function removeTransaction(id: number) {
        const filteredTransactions = transactions.filter(transaction => transaction.id !== id)

        setTransactions(filteredTransactions)
    }

    async function createTransaction(transactionInput: TransactionInput) {

        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })

        const { transaction } = response.data

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction, removeTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)
    return context
}