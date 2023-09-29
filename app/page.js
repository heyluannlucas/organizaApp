"use client";

import { useState, useRef, useEffect } from "react";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategories from "@/components/ExpenseCategories";
import Modal from "@/components/Modal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Ícones
import { FaRegTrashAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const DATA = [
  {
    id: 1,
    title: "Entretenimento",
    color: "#FF5733",
    total: 500,
  },
  {
    id: 2,
    title: "Lanches",
    color: "#00A86B",
    total: 200,
  },
  {
    id: 3,
    title: "Combustível",
    color: "#4286f4",
    total: 1200,
  },
  {
    id: 4,
    title: "Filmes",
    color: "#F7C331",
    total: 800,
  },
  {
    id: 5,
    title: "Férias",
    color: "#FF33FF",
    total: 2000,
  },
];

export default function Home() {
  const [income, setIncome] = useState([]);
  console.log(income);

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  // Funções de manipulação
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      // Atualizar estado
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });

      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
      // Atualizar estado
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };

    getIncomeData();
  }, []);

  return (
      <>
        {/* Modal de Adicionar Renda */}
        <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
          <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
            <div className="input-group">
              <label htmlFor="amount">Valor da Renda</label>
              <input
                  type="number"
                  name="amount"
                  ref={amountRef}
                  min={0.01}
                  step={0.01}
                  placeholder="Digite o valor da renda"
                  required
              />
            </div>

            <div className="input-group">
              <label htmlFor="description">Descrição</label>
              <input
                  name="description"
                  ref={descriptionRef}
                  type="text"
                  placeholder="Digite a descrição da renda"
                  required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Adicionar entrada
            </button>
          </form>

          <div className="flex flex-col gap-4 mt-6 ml-2 p-4 overflow-auto">
            <h3 className="text-2xl font-bold">Histórico de Renda</h3>

            {income.map((i) => {
              return (
                  <div className="flex justify-between item-center " key={i.id}>
                    <div>
                      <p className="font-semibold">{i.description}</p>
                      <small className="text-xs ">{new Date(i.createdAt).toLocaleString('pt-BR')}</small>
                    </div>
                    <p className="flex items-center gap-2">
                      <span className="text-lime-500">{currencyFormatter(i.amount)}</span>
                      <button
                          onClick={() => {
                            deleteIncomeEntryHandler(i.id);
                          }}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </p>
                  </div>
              );
            })}
          </div>

        </Modal>

        <main className="container max-w-2xl px-6 mx-auto">
          <section className="py-3 rounded-3xl">
            <div>
              <small className="text-gray-400 text-md">Seu Saldo é: </small>
              <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
            </div>
            <div className="border-b-2 border-slate-700 my-2"></div> {/* Linha de separação */}
          </section>



          <section className="flex items-center gap-2 py-3">
            <button onClick={() => {}} className="btn btn-primary">
              + Despesas
            </button>
            <button
                onClick={() => {
                  setShowAddIncomeModal(true);
                }}
                className="btn btn-primary-outline"
            >
              + Renda
            </button>
          </section>

          {/* Despesas */}
          <section className="py-6 text-center">
            <h3 className="text-2xl font-bold">Despesas</h3>
            <div className="flex flex-col gap-4 mt-6">
              {DATA.map((expense) => {
                return (
                    <ExpenseCategories
                        key={expense.id}
                        color={expense.color}
                        title={expense.title}
                        total={expense.total}
                    />
                );
              })}
            </div>
          </section>

          {/* Seção do Gráfico */}
          <section className="py-6 text-center font-bold">
            <h3 className="text-2xl">Gráfico de gastos</h3>
            <div className="w-full h-96 flex justify-center items-center mt-5 text">
              <Doughnut
                  data={{
                    labels: DATA.map((expense) => expense.title),
                    datasets: [
                      {
                        label: "Despesas",
                        data: DATA.map((expense) => expense.total),
                        backgroundColor: DATA.map((expense) => expense.color),
                        borderColor: ["#18181b"],
                        borderWidth: 3,
                      },
                    ],
                  }}
              />
            </div>
          </section>
        </main>
      </>
  );
}