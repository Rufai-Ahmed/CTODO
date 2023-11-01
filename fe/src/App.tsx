import moment from "moment";
import { useState, useMemo } from "react";
import styled from "styled-components";
import { CreateTodoScreen } from "./CreateTodoScreen";
import { deleteTask, readAllTodos, updateTask } from "./api/API";
function App() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [state, setState]: any = useState();

  useMemo(() => {
    readAllTodos().then((res) => {
      setState(res);
    });
  }, []);

  return (
    <>
      <Container>
        <Br>
          <Button
            onClick={() => {
              setToggle(true);
            }}
          >
            Add Todo
          </Button>
        </Br>
        <Main>
          {state &&
            state?.map((el: any) => (
              <Card>
                <Tasked>{el.task}</Tasked>

                <Time rr="1">
                  <TimeWrap>
                    <div>Created at: </div>
                  </TimeWrap>

                  {el.createdAt}
                </Time>
                <Time>
                  <TimeWrap>
                    <div>Ended at: </div>
                  </TimeWrap>
                  {el.achievedAt}
                </Time>
                <hr />

                {el.done === true ? (
                  <Text>Todo was Achieved</Text>
                ) : (
                  <Text>Todo wasn't Achieved</Text>
                )}

                <hr />
                <br />
                <But>
                  <Button
                    onClick={() => {
                      console.log(el._id);

                      updateTask(el._id);
                    }}
                  >
                    Update Todo
                  </Button>
                  <Button
                    onClick={() => {
                      deleteTask(el._id);
                    }}
                  >
                    Delete task
                  </Button>
                </But>
              </Card>
            ))}
        </Main>
      </Container>
      {toggle && <CreateTodoScreen setToggle={setToggle} />}
    </>
  );
}

export default App;

const Br = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const Text = styled.div`
  text-align: center;
  margin: 10px 0;
  font-size: 12px;
  font-weight: 600;
`;

const But = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.div`
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

const TimeWrap = styled.div`
  width: 90%;
`;

const Time = styled.div<{ rr?: string }>`
  font-size: 12px;
  margin: 10px 0;
  line-height: 1;

  display: flex;
  flex-direction: column;

  ${TimeWrap} {
    display: flex;
    flex-direction: ${({ rr }) => (rr ? "row" : "row-reverse")};

    div {
      font-size: 10px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 5px;
    }
  }
`;

const Tasked = styled.div`
  border-radius: 5px;
  border: 1px solid silver;
  padding: 5px;
  font-size: 12px;
  line-height: 1.2;
`;

const Card = styled.div`
  width: 250px;
  min-height: 150px;
  border-radius: 5px;
  border: 1px solid silver;
  margin: 10px;
  padding: 5px;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const Container = styled.div``;
