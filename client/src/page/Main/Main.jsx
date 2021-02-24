import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { response } from "express";

const Main = () => {
  const [inventories, setInventories] = useState([]);
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
                        Add new item
                    </Link>
              </div>
          </div>
          <div classNAme="row">
                {/* Current Inventory List*/}
              <div className="col s6">
                  <h2 className="current_inventory">Current Inventory</h2>
                {inventories.map((inventory) => (
                    <li key={inventory.name} className="inventory_list">
                        Name: {inventory.name} Category: {inventory.category} Expiration Date: {inventory.expiration}
                    </li>
                ))}
              </div>
              {/* USe First Items */}
              <div className="cold s6">
                  <h2 className="use_first">Use First Items</h2>
                    {}

              </div>
          </div>
      </div>

  )



};
