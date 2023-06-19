import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import LoadingState from "../../Components/Loader";
import Grid from "@mui/material/Grid";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import "./index.css";
import cart from "../../Assets/images/cart.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import remove from "../../Assets/images/remove.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function HomePage() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();

  useEffect(() => {
    const getAllData = () => {
      const colRef = collection(db, "items");
      setLoading(true);

      let data = [];
      getDocs(colRef)
        .then((res) => {
          res?.forEach((doc) => {
            let obj = {};
            obj.item = doc.data();
            obj.id = doc.id;
            obj.addedToCart = false;
            data.push(obj);
          });
          setItems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addToCart = (val, index) => {
    let item = { items: val, quantity: 1 };
    let Items = [...items];
    Items[index].addedToCart = true;
    setCartItems([...cartItems, item]);
    setItems(Items);
  };

  const handleQuantityChange = (e, index) => {
    let value = e.target.value;
    let CartItems = [...cartItems];

    CartItems[index].quantity = value;
    setCartItems(CartItems);
  };
  const getTotalPrice = () => {
    if (cartItems.length) {
      let prices = cartItems.map(
        (item) => parseInt(item?.items?.item?.price) * parseInt(item?.quantity)
      );
      const total = prices?.reduce((acc, curr) => acc + curr);
      return total;
    }
  };

  const removeItem = (index, item) => {
    let CartItems = [...cartItems];
    let Items = [...items];
    Items.map((val) => {
      if (val.id === item?.items?.id) {
        val.addedToCart = false;
      }
    });
    CartItems.splice(index, 1);
    setCartItems(CartItems);
    setItems(Items);
  };

  console.log("test", items);

  return (
    <div>
      <div className="navbar">
        <div>
          <div style={{ fontSize: 30 }}>Lets Shop!</div>
        </div>

        <div className="cartimage" onClick={handleOpen}>
          <img src={cart} width={60} />
          {cartItems.length > 0 && (
            <div className="cartnumber">{cartItems.length}</div>
          )}
        </div>
      </div>
      <div style={{ margin: "100px 40px 0px 40px" }}>
        <div
          style={{
            marginBottom: 10,
            cursor: "pointer",
            padding: "10px",
            backgroundColor: "cyan",
            width: 300,
            textAlign: "center",
            borderRadius: 10,
          }}
          onClick={() => navigate.push("/inventory-management")}
        >
          Go to inventory management
        </div>
        {loading ? (
          <div className="loader-center">
            <LoadingState Width={100} Height={100} />
          </div>
        ) : (
          <Grid container spacing={2}>
            {items.map((val, index) => (
              <Grid item xs={3} key={index}>
                <div className="cardmain">
                  <div
                    className="stocklabel"
                    style={{
                      backgroundColor:
                        val?.item?.status === "Out of stock" ? "red" : "green",
                    }}
                  >
                    {val?.item?.status === "Out of stock"
                      ? "Out of stock"
                      : "In stock"}
                  </div>
                  <div className="category"> {val?.item?.category}</div>
                  <div>
                    <img
                      src={val?.item?.image}
                      width="100%"
                      height={268}
                      style={{ objectFit: "contain", marginTop: 20 }}
                    />
                  </div>

                  <div className="heading"> {val?.item?.itemName}</div>
                  <div className="price">Rs : {val?.item?.price}/-</div>
                  <div
                    className={
                      val.addedToCart ? "addedtocartbutton" : "addtocartbutton"
                    }
                    style={{
                      opacity:
                        val?.item?.status === "Out of stock" ? "0.3" : "1",
                      pointerEvents:
                        val?.item?.status === "Out of stock" || val.addedToCart
                          ? "none"
                          : "auto",
                    }}
                    onClick={() => addToCart(val, index)}
                  >
                    {val.addedToCart ? "Added to cart" : "Add to cart"}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {cartItems?.length ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className="cartitem" style={{ fontWeight: "bold" }}>
                    Item
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="cartitem" style={{ fontWeight: "bold" }}>
                    Price
                  </div>
                </Grid>
                <Grid item xs={2} style={{ fontWeight: "bold" }}>
                  <div>Quantity</div>
                </Grid>
              </Grid>
              {cartItems.map((item, index) => (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <div className="cartitem">{item.items?.item?.itemName}</div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="cartitem">{item.items?.item?.price}/-</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="5"
                        value={item.quantity}
                        onChange={(val) => handleQuantityChange(val, index)}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => removeItem(index, item)}
                    >
                      <img src={remove} width="20px" />
                    </div>
                  </Grid>
                </Grid>
              ))}
              <hr></hr>
              <div style={{ fontSize: 25, fontWeight: "bold" }}>
                Total = {getTotalPrice()}/-
              </div>
              <div className="checkoutbutton">Checkout </div>
            </>
          ) : (
            "Your cart is empty"
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default HomePage;
