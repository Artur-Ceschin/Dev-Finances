import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";
import { FiTrash } from 'react-icons/fi'


export function TransactionsTable() {
    const { transactions, removeTransaction } = useTransactions()
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td >{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format((transaction.amount))}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format((
                                    new Date(transaction.createdAt)
                                ))}
                            </td>
                            <td>
                                <button type="button" onClick={() => removeTransaction(transaction.id)}>
                                    <FiTrash size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}