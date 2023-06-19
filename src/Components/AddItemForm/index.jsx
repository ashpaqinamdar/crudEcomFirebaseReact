import React from "react";
import "./index.css";
import { InputBase } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@mui/material/Button";
import { IoIosArrowRoundBack } from "react-icons/io";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingState from "../Loader";
import { AiOutlineCloseCircle } from "react-icons/ai";

function AddItemForm({
  itemInfo,
  category,
  status,
  onChange,
  handleChangeType,
  handleSubmit,
  error,
  loading,
  handleImageUpload,
  image,
  handleRemoveImage,
  view,
  data,
}) {
  const navigate = useHistory();
  const navigateToHome = () => {
    navigate.push("/inventory-management");
  };
  console.log("sdada", view);
  return (
    <div className="containerForm">
      <IoIosArrowRoundBack
        style={{ fontSize: "40px", cursor: "pointer", marginLeft: "-6px" }}
        onClick={navigateToHome}
      />
      {!view ? (
        <div className="addBookForm">
          <div className="inputField">
            <label htmlFor="bookName">
              Item Name<span className="required-sign">*</span>
            </label>
            <InputBase
              id="itemName"
              name="itemName"
              type="text"
              onChange={(e) => onChange(e)}
              value={itemInfo.itemName}
              placeholder="Enter Item name"
            />
            {error.itemNameError && (
              <div className="errorTags">Please enter item name</div>
            )}
          </div>
          <div className="inputField">
            <label htmlFor="genre">
              Category<span className="required-sign">*</span>
            </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              onChange={(e) => onChange(e)}
              value={itemInfo.category}
              placeholder="Enter Item Category"
            >
              {category.map((item) => (
                <MenuItem value={item.category} key={item.id}>
                  {item.category}
                </MenuItem>
              ))}
            </Select>
            {error.categoryError && (
              <div className="errorTags">
                Please select a category<span className="required-sign">*</span>
              </div>
            )}
          </div>

          <div className="inputField">
            <label htmlFor="genre">
              Status<span className="required-sign">*</span>
            </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="status"
              onChange={(e) => onChange(e)}
              value={itemInfo.status}
              placeholder="Enter Item Category"
            >
              {status.map((item) => (
                <MenuItem value={item.status} key={item.id}>
                  {item.status}
                </MenuItem>
              ))}
            </Select>
            {error.statusError && (
              <div className="errorTags">
                Please select a status<span className="required-sign">*</span>
              </div>
            )}
          </div>

          <div className="inputField">
            <label htmlFor="price">
              Price (₹)<span className="required-sign">*</span>
            </label>
            <InputBase
              id="price"
              name="price"
              type="text"
              onChange={(e) => onChange(e)}
              value={itemInfo.price}
              placeholder="Enter Item price"
            />
            {error.priceError && (
              <div className="errorTags">Please enter a valid price</div>
            )}
          </div>
          <div className="inputField">
            {image ? (
              <>
                <img src={image} className="uploaded-image" />
                <div
                  onClick={handleRemoveImage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  <AiOutlineCloseCircle style={{ marginRight: 10 }} /> Remove
                  Image
                </div>
              </>
            ) : (
              <>
                <label htmlFor="price">Upload Item Image</label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event)}
                  value={image}
                />
              </>
            )}
          </div>
          <Button
            variant="contained"
            onClick={() => handleSubmit(itemInfo.id)}
            className="buttonClass"
            style={{ marginTop: "30px", padding: "6px 16px" }}
            loading={true}
          >
            {loading ? (
              <LoadingState Width={30} Height={20} initial={false} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      ) : (
        <div style={{ paddingLeft: 30 }}>
          {console.log("sadasd", data)}
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Book Name</label>
            <div style={{ marginTop: 10 }}>{itemInfo.bookName}</div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Genre</label>
            <div style={{ marginTop: 10 }}>{itemInfo.genre}</div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Available In</label>
            <div style={{ marginTop: 10 }}>
              {data.hardBound && <div>Hard Bound</div>}
              {data.paperBack && <div>Parperback</div>}
              {data.pdf && <div>PDF</div>}
            </div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Price</label>
            <div style={{ marginTop: 10 }}>{itemInfo.price}</div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Cover Image</label>
            <div style={{ marginTop: 10 }}>
              {image ? <img src={image} style={{ width: 100 }} /> : "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddItemForm;
