import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const Checkout = () =>{

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState([]);
    var total_price = 0;

    const [CheckoutInput, setCheckoutInput] = useState({
        firstname:'',
        lastname:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipcode:''
    });

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
                    setLoading(false);
                }else if(res.data.status === 401){
                    history("/");
                    swal("Warning", res.data.message, "warning");
                }
            }    
        });

        return () => {isMounted = false};

    },[history]);

    const handleInput = e =>{
        e.persist();
        setCheckoutInput({...CheckoutInput, [e.target.name]: e.target.value});
    }

    const sumbitOrder = (e) =>{
        e.preventDefault();

        const data = {
            firstname: CheckoutInput.firstname,
            lastname: CheckoutInput.lastname,
            phone: CheckoutInput.phone,
            email: CheckoutInput.email,
            address: CheckoutInput.address,
            city: CheckoutInput.city,
            state: CheckoutInput.state,
            zipcode: CheckoutInput.zipcode,
        };

        axios.post(`api/place-order`,data).then(res => {
            if(res.data.status === 200){
                swal("Order placed successfully", res.data.message, "success");
                setError([]);
                history.push("/thank-you");
            }else{
                swal("All fields are mandatory", "", "error");
                setError(res.data.errors);
            }
        });
    }

    if(loading){
        return <h4>loading Checkout</h4>
    }

    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Checkout</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Basic Information</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>First Name</label>
                                                <input type="text" name="firstname" onChange={handleInput} value={CheckoutInput.firstname} className="form-control"/>
                                                <small className="text-danger">{error.firstname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Last Name</label>
                                                <input type="text" name="lastname" onChange={handleInput} value={CheckoutInput.lastname} className="form-control"/>
                                                <small className="text-danger">{error.lastname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Phone Number</label>
                                                <input type="text" name="phone" onChange={handleInput} value={CheckoutInput.phone} className="form-control"/>
                                                <small className="text-danger">{error.phone}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Email Address</label>
                                                <input type="text" name="email" onChange={handleInput} value={CheckoutInput.email} className="form-control"/>
                                                <small className="text-danger">{error.email}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label>Full Address</label>
                                                <textarea rows="3" name="address" className="form-control" onChange={handleInput} value={CheckoutInput.address}></textarea>
                                                <small className="text-danger">{error.address}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>City</label>
                                                <input type="text" name="city" className="form-control" onChange={handleInput} value={CheckoutInput.city}/>
                                                <small className="text-danger">{error.city}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>State</label>
                                                <input type="text" name="state" className="form-control" onChange={handleInput} value={CheckoutInput.state}/>
                                                <small className="text-danger">{error.state}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Zip code</label>
                                                <input type="text" name="zipcode" className="form-control" onChange={handleInput} value={CheckoutInput.zipcode}/>
                                                <small className="text-danger">{error.zipcode}</small>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12">
                                        <hr color="black"/>
                                            <div className="form-group text-end">
                                                <button type="button" className="btn btn-primary" onClick={sumbitOrder}>Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th width="50%">Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, idx) =>{
                                                total_price += item.product.selling_price * item.product_quantity; 
                                                return (
                                                    <tr key={idx}>
                                                        <td>{item.product.name}</td>
                                                        <td>{item.product.selling_price}</td>
                                                        <td>{item.product_quantity}</td>
                                                        <td>{item.product.selling_price * item.product_quantity}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td colSpan="3" className="text-bold">Grand Total</td>
                                            <td className="text-bold">{total_price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;