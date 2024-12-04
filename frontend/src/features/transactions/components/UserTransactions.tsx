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
      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
        {sortedTransactions.map((transaction) => (
          <article
            key={transaction._id}
            className="rounded-lg bg-orange-100 p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <header className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-3xl font-bold text-orange-500">
                      ${transaction.sum}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString(
                      "default",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </header>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default UserTransactions;
