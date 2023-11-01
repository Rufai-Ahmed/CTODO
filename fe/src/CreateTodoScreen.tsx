import styled from "styled-components";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { createTodo } from "./api/API";

export const CreateTodoScreen = ({ setToggle }: any) => {
  const [task, setTask] = useState("");
  const [timer, setTimer] = useState();

  return (
    <>
      <Container>
        <Cancel size={30} />
        <Wrapper>
          <TextArea
            value={task}
            onChange={(e: any) => {
              setTask(e.target.value);
            }}
          />
          <Timer
            type="number"
            value={timer}
            onChange={(e: any) => {
              setTimer(e.target.value);
            }}
          />
          <Add
            onClick={() => {
              const data = {
                task,
                timer,
              };

              createTodo(data);
              setToggle(false);
            }}
          >
            Add Task
          </Add>
        </Wrapper>
        <Main
          onClick={() => {
            setToggle(false);
          }}
        ></Main>
      </Container>
    </>
  );
};

const Main = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cancel = styled(MdOutlineCancel)`
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
`;

const Add = styled.div`
  padding: 10px 18px;
  background-color: #420042;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  transition: all 350ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const Timer = styled.input`
  width: 95%;
  padding: 10px 0;
  outline: none;
  border: 1px solid silver;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 300px;
  border: 1px solid silver;
  outline: none;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 450px;
  background-color: #6f3d6f;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px 0;
  z-index: 3;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6.5px);
  -webkit-backdrop-filter: blur(6.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
