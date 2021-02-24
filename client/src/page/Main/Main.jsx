import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { response } from "express";

const inventories =[
  {
    name: "Heinz Ketchup",
    category: "Fridge",
    expiration: "02-25-22"
  },
  {
    name: "Pickle",
    category: "Fridge",
    expiration: "01-22-22"
  },

]

const Main = () => {
  // Inventory List
  const [inventories, setInventories] = useState([]);
  // Use First List
  const [firstUses, setFirstUses] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("/api/inventory")
      .then((response) => {
        setInventories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Use Function (It will move item listed in Inventory section to Use First Section upon click the "Use button")
  const useFirst = (inventory) => {
    setFirstUses((used) => {
      return [...used, inventory]
    })
  }

  // Delete
  const handleDeleteClick = (id) => {
    axios
      .delete(`/api/inventory/${id}`)
      .then((response) => {
        console.log(response.data);
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <div className= "container">
          <div className="row">
              <div className="col s12">
                  <Link 
                    to="/main/inventory/new"
                    className="waves-effect waves-light btn">
                        Add New Item
                    </Link>
              </div>
          </div>
          <div classNAme="row">
              <div className="col s6">
                  {/* Current Inventory List*/} 
                  <h2 className="current_inventory">Current Inventory</h2>
                    {inventories.map((inventory) => (
                      <li key={inventory.name} className="inventory_list">
                          Name: {inventory.name} Category: {inventory.category} Expiration Date: {inventory.expiration}

                          {/* Use Button */}
                          <button className="waves-effect waves-light btn" 
                          onClick={() => useFirst(inventories)}>
                          Use</button>

                          {/* Edit Button*/}
                          <Link 
                            to={`/main/inventory/${inventory._id}/edit`}
                            className="waves-effect waves-light btn"
                          >Edit</Link>

                          {/* Delete Button */}
                          <button className="waves-effect waves-light btn"
                          onClick={() => {
                            handleDeleteClick(inventory._id);
                          }}>
                          Delete
                          </button>   
                      </li>
                ))}
              </div>
              {/* USe First Items */}
              <div className="cold s6">
                  <h2 className="use_first">Use First Items</h2>
                    {firstUses.map((firstUse) => (
                      <li key={firstUse.name} className="first_list">
                          Name: {firstUse.name} Category: {firstUse.category} Expiration Date: {firstUse.expiration}
                          
                          {/* Delete Button */}
                          <button className="waves-effect waves-light btn"
                          onClick={() => {
                            handleDeleteClick(firstUse._id);
                          }}>
                          </button>
                      </li>
                    ))}
              </div>
          </div>
      </div>

  )
};

export default Main;