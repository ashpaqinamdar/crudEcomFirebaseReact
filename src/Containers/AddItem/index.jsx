import React, { useState } from "react";
import AddItemForm from "../../Components/AddItemForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../utils/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

const category = [
  { category: "Fashion", id: 1 },
  { category: "Mobiles and Tablets", id: 2 },
  { category: "Consumer Electronics", id: 3 },
  { category: "Books", id: 4 },
  { category: "Groceries", id: 5 },
  { category: "Home Furnishings", id: 6 },
  { category: "Other", id: 7 },
];

const status = [
  { status: "In stock", id: 1 },
  { status: "Out of stock", id: 2 },
];

function AddItem(props) {
  console.log("props", props);
  const [itemInfo, setItemInfo] = useState({
    itemName: props.location?.state?.data?.item?.itemName
      ? props.location?.state?.data?.item?.itemName
      : "",
    category: props.location?.state?.data?.item?.category
      ? props.location?.state?.data?.item?.category
      : "",
    price: props.location?.state?.data?.item?.price
      ? props.location?.state?.data?.item?.price
      : "",
    id: props.location?.state?.data?._id
      ? props.location?.state?.data?._id
      : "",
    status: props.location?.state?.data?.item?.status
      ? props.location?.state?.data?.item?.status
      : "",
  });
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(
    props.location?.state?.data?.item?.image
      ? props.location?.state?.data?.item?.image
      : ""
  );
  const [error, setError] = useState({
    itemNameError: false,
    categoryError: false,
    priceError: false,
    typeError: false,
    statusError: false,
  });
  const navigate = useHistory();
  const [type, setType] = useState([
    {
      name: "In stock",
      checked: props.location?.state?.data?.paperBack
        ? props.location.state.data.paperBack
        : false,
    },
    {
      name: "Out of stock",
      checked: props.location?.state?.data?.hardBound
        ? props.location.state.data.hardBound
        : false,
    },
    {
      name: "Coming soon",
      checked: props.location?.state?.data?.pdf
        ? props.location.state.data.pdf
        : false,
    },
  ]);

  const handleChangeType = (e) => {
    const typeListCopy = [...type];
    const modiType = typeListCopy.map((item) => {
      if (e === item.name) {
        item.checked = !item.checked;
      }
      return item;
    });
    setType(modiType);
  };

  const handleOnChange = (e) => {
    let value = e.target.name;
    let bookValue = { ...itemInfo };
    bookValue[value] = e.target.value;
    setItemInfo(bookValue);
  };

  const handleSubmit = async (id) => {
    let validate = { ...error };
    let pass = true;
    const re = /^[0-9\b]+$/;

    if (!itemInfo.itemName) {
      validate.itemNameError = true;
      pass = false;
    } else {
      validate.itemNameError = false;
    }
    if (!itemInfo.category) {
      validate.categoryError = true;
      pass = false;
    } else {
      validate.categoryError = false;
    }
    if (!itemInfo.status) {
      validate.statusError = true;
      pass = false;
    } else {
      validate.statusError = false;
    }
    if (!itemInfo.price) {
      validate.priceError = true;
      pass = false;
    } else if (!re.test(itemInfo.price)) {
      validate.priceError = true;
      pass = false;
    } else {
      validate.priceError = false;
    }

    setError(validate);

    let typeToSend = {};
    type.map((item) => {
      typeToSend[item.name] = item.checked;
    });

    if (pass) {
      setLoading(true);
      if (props.location?.state?.edit) {
        const docRef = doc(db, "items", props.location?.state?.data?.id);
        let data = {
          itemName: itemInfo.itemName,
          category: itemInfo.category,
          price: itemInfo.price,
          status: itemInfo.status,
          image: imageBase64,
          updated: Timestamp.now(),
        };
        updateDoc(docRef, data)
          .then((docRef) => {
            navigate.push("/inventory-management");
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const dbRef = collection(db, "items");
        let data = {
          itemName: itemInfo.itemName,
          category: itemInfo.category,
          price: itemInfo.price,
          status: itemInfo.status,
          image: imageBase64,
          created: Timestamp.now(),
        };
        addDoc(dbRef, data)
          .then((docRef) => {
            setLoading(false);
            navigate.push("/inventory-management");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    let fileType = file.type; // image/jpeg
    let fileSize = file.size; // 3MB

    if (fileSize > 2 * 1000000) {
      alert(
        `File size is too large, please upload image of size less than 2MB.\nSelected File Size: ${
          fileSize / 1000000
        }MB only`
      );
      return;
    }
    getBase64(e.target.files[0], (result) => {
      setImageBase64(result);
    });
  };

  function getBase64(file, cb) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  const handleRemoveImage = () => {
    setImageBase64("");
  };

  return (
    <div>
      <AddItemForm
        category={category}
        status={status}
        itemInfo={itemInfo}
        onChange={(e) => handleOnChange(e)}
        handleChangeType={(e) => handleChangeType(e)}
        handleSubmit={(id) => handleSubmit(id)}
        error={error}
        loading={loading}
        handleImageUpload={handleImageUpload}
        image={imageBase64}
        handleRemoveImage={handleRemoveImage}
        view={
          props?.location?.state?.view ? props?.location?.state?.view : false
        }
        data={props?.location?.state?.data}
      />
    </div>
  );
}

export default AddItem;
