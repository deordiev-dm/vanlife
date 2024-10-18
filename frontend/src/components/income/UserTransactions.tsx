import { nanoid } from "nanoid";
import { Transaction } from "../../utils/api";

type Props = {
  transactions: Transaction[];
};

function UserTransactions({ transactions }: Props) {
  const sortedTransactions = transactions.sort(
    (a, b) => b.timestamp - a.timestamp,
  );
  return (
    <>
      <h2 className="text-2xl font-bold">
        Your Transactions ({transactions.length})
      </h2>
      <div className="space-y-4">
        {sortedTransactions.map((transaction) => (
          <article
            key={nanoid()}
            className="flex items-center justify-between rounded bg-white p-4"
          >
            <div className="text-3xl font-semibold">${transaction.amount}</div>
            <div className="text-lg">
              {`${new Date(transaction.timestamp).getDate()}/${new Date(transaction.timestamp).getMonth() + 1}/${new Date(transaction.timestamp).getFullYear()}`}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default UserTransactions;
