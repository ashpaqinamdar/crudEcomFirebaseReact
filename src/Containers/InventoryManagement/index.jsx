import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import LoadingState from "../../Components/Loader";
import Grid from "@mui/material/Grid";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import "./index.css";

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

function InventoryManangement() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();

  useEffect(() => {
    getAllData();
  }, []);
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

  const editItem = (val) => {
    navigate.push({ pathname: "/edit-item", state: { data: val, edit: true } });
  };

  const deleteItem = (val) => {
    const docRef = doc(db, "items", val?.id);
    deleteDoc(docRef)
      .then(() => {
        getAllData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="navbar">
        <div>Inventory Management</div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              cursor: "pointer",
              padding: "20px",
              backgroundColor: "brown",
              marginRight: 10,
              borderRadius: 10,
            }}
            onClick={() => navigate.push("/")}
          >
            Got to shop
          </div>
          <div
            style={{
              cursor: "pointer",
              padding: "20px",
              backgroundColor: "green",
              borderRadius: 10,
            }}
            onClick={() => navigate.push("/add-item")}
          >
            Add item
          </div>
        </div>
      </div>
      <div style={{ margin: "0px 50px" }}>
        {loading ? (
          <div className="loader-center">
            <LoadingState Width={100} Height={100} />
          </div>
        ) : (
          <Grid container spacing={2}>
            {items.map((val, index) => (
              <Grid item xs={12}>
                <div className="cardmainInvt">
                  <div className="category"> {val?.item?.category}</div>
                  <div>
                    <img src={val?.item?.image} width="100px" />
                  </div>

                  <div className="heading"> {val?.item?.itemName}</div>
                  <div className="price"> {val?.item?.price}/-</div>
                  <div style={{ display: "flex" }}>
                    <div
                      className={"addedtocartbuttonInvt"}
                      onClick={() => editItem(val)}
                    >
                      Edit
                    </div>
                    <div
                      className={"addtocartbuttonInvt"}
                      onClick={() => deleteItem(val)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default InventoryManangement;
