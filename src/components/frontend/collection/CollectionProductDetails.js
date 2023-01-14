import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";;

const CollectionProductDetails = (props) =>{

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

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

    if(loading){
        return (
            <h3>Collection Product Details...</h3>
        )
    }

    return (
        <>          
            <div>
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h5>Collection / {product.category.name} / Product</h5>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 border-end">
                                <img src="" alt="" className="w-100"/>
                            </div>

                            <div className="col-md-8">
                                <h4>
                                    {product.name}
                                    <span className="float-end badge btn-sm btn-danger badge-pil">Brand</span>
                                </h4>
                                <p>Product description</p>
                                <h4 className="mb-1">
                                    RS: 6546
                                    <s className="ms-2"> RS: 6546</s>
                                </h4>
                                <div>
                                    <label className="btn-sm btn-success px-4 mt-2">In Stock</label>
                                    <div className="row">
                                        <div className="col-md-3 mt-3">
                                            <div className="input-group"></div>
                                        </div>
                                    </div>
                                </div>
                                
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