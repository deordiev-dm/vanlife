import { nanoid } from "nanoid";
import { Transaction } from "@/lib/types/types";

type Props = {
  transactions: Transaction[];
};

function UserTransactions({ transactions }: Props) {
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Your Transactions ({transactions.length})
      </h2>
      <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
        {sortedTransactions.map((transaction) => (
          <article
            key={nanoid()}
            className="flex items-center justify-between rounded-lg bg-white p-4"
          >
            <div className="text-2xl font-semibold">${transaction.sum}</div>
            <div className="text-md">
              {`${new Date(transaction.createdAt).getDate()}/${new Date(transaction.createdAt).getMonth() + 1}/${new Date(transaction.createdAt).getFullYear()}`}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default UserTransactions;
