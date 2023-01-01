import axios from "axios";

export async function getAllProducts() {
  try {
    const response = await axios
      .get(`http://localhost:3000/food-ordering/v1/products`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.debug("Get all products failed", err);
    return null;
  }
}
