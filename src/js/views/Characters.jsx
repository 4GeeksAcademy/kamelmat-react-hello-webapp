import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    return (
    <div className="container">
        <h1>hola</h1>
    </div>
)
}