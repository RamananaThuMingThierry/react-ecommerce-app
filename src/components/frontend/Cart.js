import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

const Cart = () =>{

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var total_price = 0;

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

    const handlDecrement = (card_id) =>{
        setCart(cart => 
            cart.map( item => 
                card_id === item.id ? {...item, product_quantity: item.product_quantity - (item.product_quantity > 1 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(card_id, 'desc');
    }

    const handleIncrement = (card_id) =>{
        setCart((cart) => 
            cart.map( item =>
                card_id === item.id ? {...item, product_quantity: item.product_quantity +1 } : item
            )
        );
        updateCartQuantity(card_id, 'in');
    }

    function updateCartQuantity(card_id, scope){
        axios.put(`api/cart-updatequantity/${card_id}/${scope}`).then(res => {
            if(res.data.status === 200){
                swal("Success", res.data.message, "success");
            }
        });
    }

    const deleteCartItem = (e, cart_id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        swal({
            title: "Vous êtes sûr?",
            text: "Voulez-vous vraiment supprimer ce catégorie?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`api/delete-cartitem/${cart_id}`).then(res =>{
                    if(res.data.status === 200){
                        swal("Success", res.data.message, "success");
                        thisClicked.closest("tr").remove();
                    }else if(res.data.status === 404){
                        swal("Error", res.data.message, "error");
                        thisClicked.innerHTML = "Remove";
                    }
                });
            } else {
              swal("La suppression a été annulé!");
              thisClicked.innerHTML = "Remove";
            }
          });

    }
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
                            
                            total_price += item.product.selling_price * item.product_quantity;

                            return (
                                <tr key={idx}>
                                    <td width="10%">
                                        <img src={`http://localhost:8000/${item.product.image}`} alt="" width="50px" height="50px"/>
                                    </td>
                                    <td>{item.product.name}</td>
                                    <td width="15%" className="text-center">{item.product.selling_price}</td>
                                    <td width="15%">
                                        <div className="input-group">
                                            <button type="button" className="input-group-text" onClick={() => handlDecrement(item.id)}>-</button>
                                            <div className="form-control text-center">{item.product_quantity}</div>
                                            <button type="button" className="input-group-text" onClick={() => handleIncrement(item.id)}>+</button>
                                        </div>
                                    </td>
                                    <td width="15%" className="text-center">{item.product.selling_price * item.product_quantity}</td>
                                    <td width="10%">
                                        <button type="button" className="btn btn-danger btn-sm" onClick={(e) => deleteCartItem(e, item.id)}>Remove</button>
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

                        <div className="col-md-8"></div>
                        <div className="col-md-4">
                            <div className="card card-body mt-3">
                                <h4>Sub Total : <span className="float-end">{total_price}</span></h4>
                                <h4>Grand Total : <span className="float-end">{total_price}</span></h4>
                                <hr/>
                                <Link to="/checkout" className="btn btn-primary">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;