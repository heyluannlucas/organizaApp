import { currencyFormatter } from '@/lib/utils';
import ExpenseCategoryItem from '@/components/ExpenseCategories';

const DATA = [
  {
    id: 1,
    title: "Entretenimento",
    color: '#FF5733', 
    amount: 200
  },
  {
    id: 2,
    title: "Gasolina",
    color: '#00A86B', 
    amount: 300 
  },
  {
    id: 3,
    title: "Lazer",
    color: '#4286f4', 
    amount: 500
  },
  {
    id: 4,
    title: "Lanches",
    color: '#F7C331', 
    amount: 100 
  }
]

export default function Home() {
  return ( 
    <main className="container max-w-2xl px-6 mx-auto">
      <section> 
        <small className="text-gray-400 text-md">Seu saldo é: </small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+ Dispesas</button>
        <button className="btn btn-primary-outline">+ Renda</button>
      </section>

      <section className='py-6'>
        <h3 className=''>Dispesas:</h3>
        <div className='flex flex-col gap-4 mt-6'>
          {DATA.map(expense => (
            <ExpenseCategoryItem 
              key={expense.id}
              color={expense.color} 
              title={expense.title} 
              amount={expense.amount}
            />
          ))}
        </div>
      </section>

      <section className='py-6'>
        <h3>Grafico de dispesas:</h3>
      </section>

    </main>
  );
}
