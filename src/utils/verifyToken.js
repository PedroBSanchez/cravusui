import axios from "axios";

const verifyToken = async () => {
  let validToken = false;
  const token = localStorage.getItem("tokenApi");
  if (!token || token == null || token == undefined || token == "") {
    return false;
  }

  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/users/tokenverify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      validToken = true;
    })
    .catch((error) => {
      console.log(error);
      console.log("Token invalid");
    });

  return validToken;
};

export { verifyToken };
