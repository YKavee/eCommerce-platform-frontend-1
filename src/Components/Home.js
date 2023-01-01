import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, fs } from "../Config/Config";
import { IndividualFilteredProduct } from "./IndividualFilteredProduct";
import axios from "axios";

export const Home = (props) => {
  const uid = GetCurrentUser();

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const email = localStorage.getItem("user");
      if (email) {
        setUser(email);
      } else {
        setUser(null);
      }
    }, []);
    return user;
  }

  const user = GetCurrentUser();

  // state of products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    axios.get(`http://localhost:3000/food-ordering/v1/products`).then((res) => {
      const productList = res.data;
      setProducts(productList);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  // globl variable
  let Product;

  // add to cart
  const addToCart = (product) => {
    if (uid !== null) {
      // console.log(product);
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log("successfully added to cart");
        });
    } else {
      props.history.push("/login");
    }
  };

  // categories list rendering using span tag
  const [spans] = useState([
    { id: "All", text: "All" },
    { id: "Vegetable", text: "Vegetable" },
    { id: "Fruit", text: "Fruit" },
    { id: "Seafood", text: "Seafood" },
    { id: "GroceryItems", text: "Grocery items" },
    { id: "Meat", text: "Meat" },
  ]);

  // active class state
  const [active, setActive] = useState("");

  // category state
  const [category, setCategory] = useState("");
  // handle change ... it will set category and active states
  const handleChange = (individualSpan) => {
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  };

  // filter function
  const filterFunction = (text) => {
    if (products.length > 1) {
      const filter = products.filter((product) => product.category === text);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br></br>
      <div className="container-fluid filter-products-main-box">
        <div className="filter-box">
          <h6>Filter by category</h6>
          {spans.map((individualSpan, index) => (
            <span
              key={index}
              id={individualSpan.id}
              onClick={() => handleChange(individualSpan)}
              className={individualSpan.id === active ? active : "deactive"}
            >
              {individualSpan.text}
            </span>
          ))}
        </div>
        {filteredProducts.length > 0 && (
          <div className="my-products">
            <h1 className="text-center">{category}</h1>
            {/* <a href="javascript:void(0)" onClick={returntoAllProducts}>Return to All Products</a> */}
            <div className="products-box">
              {filteredProducts.map((individualFilteredProduct) => (
                <IndividualFilteredProduct
                  key={individualFilteredProduct._id}
                  individualFilteredProduct={individualFilteredProduct}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
        {filteredProducts.length < 1 && (
          <>
            {products.length > 0 && (
              <div className="my-products">
                <h1 className="text-center">All Products</h1>
                <div className="products-box">
                  <Products products={products} addToCart={addToCart} />
                </div>
              </div>
            )}
            {products.length < 1 && (
              <div className="my-products please-wait">Please wait...</div>
            )}
          </>
        )}
      </div>
    </>
  );
};
