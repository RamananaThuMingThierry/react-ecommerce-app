import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
const ViewProduct = (props) =>{

    
    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [product, setProduct] = useState([]);

    useEffect(() =>{ 
        
        const product_id = props.match.params.id;
        axios.get(`api/see-product/${product_id}`).then(res =>{
            if(res.data.status === 200){
                setProduct(res.data.product);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/product");
            }
            setLoading(false);
        });
    },[props.match.params.id]);

    if(loading){
        return (
            <h2>Veuillez patientez ...</h2>
        );
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row elevation-1 bg-white mb-2">
                <h2 className="pt-2">
                    Produit 
                    <Link to="/admin/product" className="btn btn-danger float-end btn-rounded-0" type="button">Retour</Link>
                </h2>
            </div>
            <div className="row elevation-1 pt-2 bg-white">
                <div className="col-md-4">
                    <img src={`http://localhost:8000/${product.image}`} className="mt-2 img-thumbnail w-100"/>
                    <div className="form-group mb-2 mt-2">
                        <label>Nom</label>
                        <input type="" desabled value={product.name} className="form-control rounded-0"/>
                    </div>
                </div>
            
                <div className="col-md-4">
            
                    <div className="form-group mb-2">
                        <label>Slug</label>
                        <input type="" desabled value={product.name} className="form-control rounded-0"/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Meta title</label>
                        <input type="" desabled value={product.meta_title} className="form-control rounded-0"/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Meta Keyword</label>
                        <input type="" desabled value={product.meta_keyword} className="form-control rounded-0"/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Description</label>
                        <textarea desabled className="form-control rounded-0">
                            {product.description}
                        </textarea>
                    </div>
                    <div className="form-group mb-2">
                        <label>Meta Description</label>
                        <textarea desabled className="form-control rounded-0">
                            {product.meta_description}
                        </textarea>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group mb-2">
                        <label>Selling price</label>
                        <input type="" desabled value={product.selling_price} className="form-control rounded-0"/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Original price</label>
                        <input type="" desabled value={product.original_price} className="form-control rounded-0"/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Quantité</label>
                        <input type="" desabled value={product.quantity} className="form-control rounded-0"/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Brand</label>
                        <input type="" desabled value={product.brand} className="form-control rounded-0"/>
                    </div>
                    <div className="form-group mb-2">
                        <label>Category</label>
                        <input type="" desabled value={product.category.name} className="form-control rounded-0"/>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Featured</label>
                            <input type="checkbox" className="w-50 h-50"/>
                        </div>
                        <div className="col-md-4">
                            <label>Featured</label>
                            <input type="checkbox" className="w-50 h-50"/>
                        </div>
                        <div className="col-md-4">
                            <label>Featured</label>
                            <input type="checkbox" className="w-50 h-50"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;