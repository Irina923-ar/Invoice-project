import React, { useState } from "react";

function NewInvoiceForm({ updatePosts, toggleNewInvoice }) {
  const [formData, setFormData] = useState({
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientName: "",
    clientEmail: "",
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    paymentDue: "",
    paymentTerms: "",
    description: "",
    items: [],
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;

    if (field === "quantity" || field === "price") {
      const quantity = parseFloat(updatedItems[index]["quantity"]) || 0;
      const price = parseFloat(updatedItems[index]["price"]) || 0;
      updatedItems[index]["total"] = (quantity * price).toFixed(2);
    }

    setFormData({ ...formData, items: updatedItems });
  };

  const handleSaveAsDraft = async () => {
    try {
      const response = await fetch("your-draft-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, isDraft: true }),
      });

      if (response.ok) {
        console.log("Invoice saved as draft!");
      } else {
        console.error("Failed to save invoice as draft");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveAndSend = async () => {
    try {
      const response = await fetch("http://localhost:3030/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Invoice data saved successfully!");
        updatePosts();
      } else {
        console.error("Failed to save invoice data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddNewItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { name: "", quantity: "", price: "", total: "" },
      ],
    });
  };

  const handleDiscord = async () => {};

  return (
    <div className="edit-form">
      {formData ? (
        <>
          <div className="form">
            <div className="id-post">New Invoice</div>
            <div className="title-form">Bill Form</div>
            <label className="subtitle">Street Address</label>
            <input className="content" value={formData.senderAddress.street} />
            <div className="container-form">
              <div className="container-form-div">
                <label className="subtitle">City</label>
                <input
                  className="content"
                  value={formData.senderAddress.city}
                />
              </div>
              <div className="container-form-div">
                <label className="subtitle">Post Code</label>
                <input
                  className="content"
                  value={formData.senderAddress.postCode}
                />
              </div>
              <div>
                <label className="subtitle">Country</label>
                <input
                  className="content"
                  value={formData.senderAddress.country}
                />
              </div>
            </div>
            <div className="title-form">Bill To</div>
            <label className="subtitle">Client's Name</label>
            <input className="content" value={formData.clientName} />
            <label className="subtitle mt">Client's Email</label>
            <input className="content" value={formData.clientEmail} />
            <label className="subtitle mt">Street Address</label>
            <input className="content" value={formData.clientAddress.street} />
            <div className="container-form">
              <div className="container-form-div">
                <label className="subtitle">City</label>
                <input
                  className="content"
                  value={formData.clientAddress.city}
                />
              </div>
              <div className="container-form-div">
                <label className="subtitle">Post Code</label>
                <input
                  className="content"
                  value={formData.clientAddress.postCode}
                />
              </div>
              <div>
                <label className="subtitle">Country</label>
                <input
                  className="content"
                  value={formData.clientAddress.country}
                />
              </div>
            </div>
            <div className="container-form">
              <div className="container-form-div">
                <label className="subtitle">Invoice Date</label>
                <input
                  className="content input-date"
                  value={formData.paymentDue}
                />
                <svg
                  className="input-date-svg"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.693h13.334V14z"
                    fill="#7E88C3"
                    fill-rule="nonzero"
                    opacity=".5"
                  />
                </svg>
              </div>
              <div>
                <label className="subtitle">Payment Terms</label>
                <input
                  className="content input-date"
                  value={`Net ${formData.paymentTerms} Days`}
                ></input>
                <svg
                  className="input-days-svg"
                  width="11"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1l4.228 4.228L9.456 1"
                    stroke="#7C5DFA"
                    stroke-width="2"
                    fill="none"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <label className="subtitle mt">Project Description</label>
            <input className="content" value={formData.description} />
            <div className="item-list">Item List</div>
            <div className="container-item-change">
              <div className="item-change">
                <div className="subtitle">Item Name</div>
                <div className="subtitle">QTY.</div>
                <div className="subtitle">Price</div>
                <div className="subtitle">Total</div>
              </div>
              <div>
                {formData.items.map((item, index) => (
                  <div className="item-change" key={index}>
                    <input
                      className="content"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      className="content"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                    />
                    <input
                      className="content"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                    />
                    <div className="item" value={item.price}>
                      {item.total}
                    </div>
                    <button className="btn-trash">
                      <svg
                        width="13"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                          fill="#888EB0"
                          fill-rule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="btn-cancel-edit btn-add-item"
              onClick={handleAddNewItem}
            >
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fillRule="nonzero"
                />
              </svg>
              Add New Item
            </button>

            <div className="buttons-form">
              <button
                className="btn-cancel-edit"
                onClick={() => toggleNewInvoice(false)}
              >
                Discard
              </button>
              <button className="save-draft-btn" onClick={handleSaveAsDraft}>
                Save as Draft
              </button>
              <button className="mark-as-paid" onClick={handleSaveAndSend}>
                Save & Send
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default NewInvoiceForm;