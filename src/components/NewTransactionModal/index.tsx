import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import outcomeImg from "../../assets/outcome.svg";
import incomeImg from "../../assets/income.svg";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState("deposit");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setType("deposit");
    setCategory("");
    setAmount(0);

    onRequestClose();
  }

  return (
    <Modal
      overlayClassName={"react-modal-overlay"}
      className="react-modal-content"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <button
        className="react-modal-close"
        type="button"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          placeholder="Título"
          type="text"
        />
        <input
          onChange={(event) => setAmount(Number(event.target.value))}
          value={amount}
          placeholder="Valor"
          type="number"
        />

        <TransactionTypeContainer>
          <RadioBox
            isActive={type === "deposit"}
            onClick={() => setType("deposit")}
            type="button"
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            isActive={type === "withdraw"}
            onClick={() => setType("withdraw")}
            type="button"
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Categoria"
          type="text"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
