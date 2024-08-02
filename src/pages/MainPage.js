import axios from "axios";

export const MainPage = () => {
  axios
    .get("http://localhost:3000/users")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });

    return(
      <div>Hello world!</div>
    )
};
