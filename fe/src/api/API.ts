import axios from "axios";

const URL: string = "http://localhost:4000/api/v1";

export const createTodo = async (data: any) => {
  try {
    return await axios.post(`${URL}/createTask`, data);
  } catch (error) {
    console.log(error);
  }
};

export const readAllTodos = async () => {
  try {
    return axios.get(`${URL}/getTasks`).then((res) => {
      console.log(res.data);

      return res.data.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (ID: any) => {
  try {
    return axios.patch(`${URL}/updateTask/${ID}`);
  } catch (err) {
    console.log(err);
  }
};
export const deleteTask = (ID: any) => {
  try {
    return axios.delete(`${URL}/deleteTask/${ID}`);
  } catch (err) {
    console.log(err);
  }
};
