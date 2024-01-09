import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import Empty from "./Empty";
import NewInvoiceForm from "./NewInvoiceForm";
import Filter from "./Filter";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const updatePosts = () => {
    getData();
  };

  const toggleNewInvoiceForm = () => {
    setShowNewInvoiceForm(!showNewInvoiceForm);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const getTotalInvoiceCount = () => {
    return posts.length;
  };

  return (
    <div>
      <Navbar
        toggleNewInvoice={toggleNewInvoiceForm}
        toggleFilter={toggleFilter}
        totalInvoiceCount={getTotalInvoiceCount()}
      ></Navbar>
      {showFilter && <Filter></Filter>}
      {showNewInvoiceForm && (
        <NewInvoiceForm
          updatePosts={updatePosts}
          toggleNewInvoice={toggleNewInvoiceForm}
        />
      )}
      <Empty></Empty>
      <div className="jobs-grid">
        {posts.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
