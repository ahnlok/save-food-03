import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ItemForm from "../../components/ItemForm/ItemForm";

const Add = () => {
    const history = useHistory();

    const handleFormSubmit = (e, formObject) => {
        e.preventDefault();
        axios
            .post("/api/inventory", formObject)
            .then((response) => {
                console.log(response.data);
                history.push(`/inventory/${response.data_id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <ItemForm 
                    handleFormSubmit={handleFormSubmit}
                    buttonText="Create"
                />
            </div>
        </div>
    )
}

export default Add;