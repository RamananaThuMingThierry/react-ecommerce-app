import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";;

const CollectionProductDetails = (props) =>{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() =>{
        let isMounted = true;

        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;

        axios.get(`api/collections-view-product/${category_slug}/${product_slug}`).then(res =>{
            if(isMounted){
                if(res.data.status === 200){
                    setProduct(res.data.product);
                    console.log(res.data.product);
                    setLoading(false);
                }else if(res.data.status === 400){
                    swal("warning", res.data.message, "error");
                    history.push("/collection");
                }else if(res.data.status === 404){
                    swal("warning", res.data.message, "error");
                    history.push("/collection");
                }
            }
        })
        return () => {
            isMounted = false;
        }
    }, [props.match.params.category, props.match.params.product, history]);

    const handlDecrement = () =>{
        if(quantity > 1){
            setQuantity(preventCount => preventCount - 1);
        }
    }

    const handleIncrement = () =>{
        setQuantity(preventCount => preventCount + 1);
    }

    const SubmitAddToCart = e =>{
        e.preventDefault();

        const data = {
            product_id : product.id,
            product_quantity : quantity
        };

        axios.post(`api/add-to-cart`, data).then(res =>{
            if(res.data.status === 201){
                swal("Success", res.data.message, "successs");
            }else if(res.data.status === 409){
                swal("Warning", res.data.message, "warning");
            }else if(res.data.status === 404){
                swal("Warning", res.data.message, "warning");
            }else if(res.data.status === 401){
                swal("Error", res.data.message, "error");
            }
        });
    }

    if(loading){
        return (
            <h3>Collection Product Details...</h3>
        )
    }else{
        var avail_stock = "";
        if(product.quantity > 0){
            avail_stock =       
            <div>
                <label className="btn-sm btn-success px-4 mt-2">In Stock</label>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="input-group">
                            <button className="input-group-text" type="button" onClick={handlDecrement}>-</button>
                            <input type="text" value={quantity} className="form-control text-center"/>
                            <button className="input-group-text" type="button" onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3">
                        <button type="button" className="btn btn-primary w-100" onClick={SubmitAddToCart}>Add Cart</button>
                    </div>
                </div>
            </div>
        }else{
            avail_stock = 
            <div>
                <label className="btn sm btn-success px-4 mt-2">Out of Stock</label>
            </div>
        }
    }

    return (
        <>          
            <div>
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h5>Collection / {product.category.name} / {product.name}</h5>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 border-end">
                                <img src={`http://localhost:8000/${product.image}`} alt={product.name} className="w-100"/>
                            </div>

                            <div className="col-md-8">
                                <h4>
                                    {product.name}
                                    <span className="float-end badge btn-sm btn-danger badge-pil">Brand</span>
                                </h4>
                                <p>{product.description}</p>
                                <h4 className="mb-1">
                                    RS: {product.selling_price}
                                    <s className="ms-2"> {product.original_price} Ar</s>
                                </h4>
                                {avail_stock}
                                <button type="button" className="btn btn-danger mt-3">Add to whishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/admin/dashboard" className="btn btn-primary">Admin</Link>
        </>
    );
}

export default CollectionProductDetails;