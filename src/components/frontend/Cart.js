import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Cart = () =>{

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    if(!localStorage.getItem('auth_token')){
        history.push("/");
        swal("Warning", "Login to go to Cart Page","error");
    }

    useEffect(() =>{
        
        let isMounted = true;

        axios.get(`api/cart`).then(res =>{
            if(isMounted){
                if(res.data.status === 200){
                    setCart(res.data.cart);
                    console.log(res.data.cart);
                    setLoading(false);
                }else if(res.data.status === 401){
                    history("/");
                    swal("Warning", res.data.message, "warning");
                }
            }    
        });

        return () => {isMounted = false};

    },[history]);

    if(loading){
        return <h4>loading Cart</h4>
    }else{
        var cart_HTML = "";

        if(cart.length > 0){
            cart_HTML = 
            <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Romove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, idx) =>{
                            return (
                                <tr key={idx}>
                                    <td width="10%">
                                        <img src={`http://localhost:8000/${item.product.image}`} alt="" width="50px" height="50px"/>
                                    </td>
                                    <td>{item.product.name}</td>
                                    <td width="15%" className="text-center">{item.product.selling_price}</td>
                                    <td width="15%">
                                        <div className="input-group">
                                            <button type="button" className="input-group-text">-</button>
                                            <div className="form-control text-center">{item.product_quantity}</div>
                                            <button type="button" className="input-group-text">+</button>
                                        </div>
                                    </td>
                                    <td width="15%" className="text-center">{item.product.selling_price * item.product_quantity}</td>
                                    <td width="10%">
                                        <button type="button" className="btn btn-danger btn-sm">Remove</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        
        }else{
            cart_HTML = 
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty</h4>
            </div>
        }
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Cart</h6>
                </div>
            </div>
            
            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {cart_HTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;