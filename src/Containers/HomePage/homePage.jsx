import React, { useEffect, useState } from "react";
import TableComponent from "../../Components/Table";
import Axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { getAllBooks, deleteBooks } from "../../URL/index";
import LoadingState from "../../Components/Loader";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useHistory();
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = (e) => {
    setLoading(true);
    Axios.get(getAllBooks)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("errr", e);
        setLoading(false);
        return "";
      });
  };

  const handleEdit = (row) => {
    navigate.push({
      pathname: "/edit-book",
      state: {
        data: row,
        edit: true,
      },
    });
  };

  const viewBook = (data) => {
    navigate.push({
      pathname: "/view-book-details",
      state: {
        data: data,
        view: true,
      },
    });
  };

  const deleteBook = (id) => {
    Axios.delete(deleteBooks(id))
      .then((res) => {
        getBooks();
        toast("Book deleted successfully");
      })
      .catch((e) => {
        console.log("errr", e);
        toast("failed to delete book");
        return "";
      });
  };
  return (
    <div>
      {loading ? (
        <div className="loader-center">
          <LoadingState Width={100} Height={100} />
        </div>
      ) : (
        <TableComponent
          books={books}
          handleEdit={(row) => handleEdit(row)}
          deleteBook={(id) => deleteBook(id)}
          loading={loading}
          viewBook={viewBook}
        />
      )}
    </div>
  );
}

export default HomePage;
