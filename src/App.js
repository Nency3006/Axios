import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function App() {
  const [main, setMain] = useState([
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
  ]);
  const [num, setNum] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });

  const getData = async () => {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setMain(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postSchema = Yup.object().shape({
    userId: Yup.number().required("please enter user id"),
    id: Yup.number().required("please enter id"),
    title: Yup.string().required("please enter title"),
    body: Yup.string().required("please enter body"),
  });

  const deletehandler = async (id) => {
    try {
      await axios.delete(
        "https://jsonplaceholder.typicode.com/postshbny/" + id
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Formik
        initialValues={num}
        validationSchema={postSchema}
        onSubmit={async (values) => {
          alert(JSON.stringify(values));
        }}
      >
        <Form>
          <div>
            <label htmlFor="userId">userId</label>
            <Field id="userId" name="userId" placeholder="useId" />
            <ErrorMessage name="userId" />
          </div>
          <div>
            <label htmlFor="id">Last Name</label>
            <Field id="id" name="id" placeholder="id" />
            <ErrorMessage name="id" />
          </div>
          <div>
            <label htmlFor="title">title</label>
            <Field id="title" name="title" placeholder="title" type="title" />
            <ErrorMessage name="title" />
          </div>
          <div>
            <label htmlFor="body">body</label>
            <Field id="body" name="body" placeholder="body" />
            <ErrorMessage name="body" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <table border={1}>
        <tr>
          <td>userId</td>
          <td>Id</td>
          <td>title</td>
          <td>body</td>
          <td>delete</td>
          <td>edit</td>
        </tr>

        {main.map((card, id) => {
          return (
            <tr>
              <td>{card.userId}</td>
              <td>{card.id}</td>
              <td>{card.title}</td>
              <td>{card.body}</td>
              <td>
                <button onClick={() => deletehandler(id)}>delete</button>
              </td>
              <td>
                <button>edit</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
