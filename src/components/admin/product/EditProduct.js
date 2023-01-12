import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const EditProduct = (props) =>{

    const history = useHistory();
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [picture, setPicture] = useState([]);

    const [errors, setErrorsList] = useState([]);

    const [product, setProduct] = useState({
        id_category: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_description: '',

        featured: '',
        popular: '',
        selling_price: '',
        original_price: '',
        quantity: '',
        
        brand: '',
        status: ''
    });

    useEffect(() =>{

        axios.get(`api/all-category`).then(res =>{
            if(res.data.status === 200){
                setCategoryList(res.data.category);
            }
        });

        const id = props.match.params.id;
        axios.get(`api/retreive-product/${id}`).then(res =>{
            if(res.data.status === 200){
                setProduct(res.data.product);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push('/admin/product');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) =>{
        e.persist();
        setProduct({...product, [e.target.name]: e.target.value});
    }

    const handleImage = e =>{
        e.persist();
        setPicture({ image: e.target.files[0] });
    }

    const SubmitUpdateProduct = (e) =>{
        e.preventDefault();

        const id_product = props.match.params.id;
        const formData = new FormData();

        formData.append('image', picture.image);
        formData.append('id_category', product.id_category);
        formData.append('slug', product.slug);
        formData.append('name', product.name);
        formData.append('description', product.description);

        formData.append('meta_title', product.meta_title);
        formData.append('meta_keyword', product.meta_keyword);
        formData.append('meta_description', product.meta_description);

        formData.append('brand', product.brand);
        formData.append('quantity', product.quantity);
        formData.append('selling_price', product.selling_price);
        formData.append('original_price', product.original_price);
        formData.append('popular', product.popular);
        formData.append('featured', product.featured);
        formData.append('status', product.status);

        axios.put(`api/update-product/${id_product}`, formData).then(res =>{
            
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   

            if(res.data.status === 200){
                swal("Success", res.data.message, "success");
                history.push('admin/product');
            }else if(res.data.status === 422){
                swal("All fiels are mandetory", "", "error");
                setErrorsList(res.data.errors);
            }
            
        });

    }

    if(loading){
        return (
            <h1>Update Product ...</h1>
        );
    }

    return (
        <div className="container-fluid pt-2">
        <div className="elevation-1 mb-2 p-2 bg-white">
            <h3>Edit Product</h3>
        </div>
        <form onSubmit={SubmitUpdateProduct} encType="multipart/form-data"> 
            <nav>
                <div className="nav elevation-1 bg-white nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">SEO TAGS</button>
                    <button className="nav-link" id="nav-other-details-tab" data-bs-toggle="tab" data-bs-target="#nav-other-details" type="button" role="tab" aria-controls="nav-other-details" aria-selected="false">Other details</button>
                </div>
            </nav>
            <div className="tab-content bg-white elevation-1" id="nav-tabContent">
                {/* Home */}
                <div className="tab-pane card-body border fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    
                    <div className="form-group mb-3">
                       <label>Select category</label>
                       <select name="id_category" onChange={handleInput} value={product.id_category} className="form-control">
                            <option>Select category</option>
                            {
                                categoryList.map((category) => {
                                    return (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    );
                                })
                            }
                       </select>
                        <small className="text-danger">{errors.id_category}</small>
                    </div>
                    
                    <div className="form-group mb-3">
                        <input type="text" name="slug" placeholder="slug" onChange={handleInput} value={product.slug} className="form-control"/>
                        <span className="text-danger">{errors.slug}</span>
                    </div>
                    
                    <div className="form-group mb-3">
                        <input type="text" name="name" placeholder="Name" onChange={handleInput} value={product.name} className="form-control"/>
                        <span className="text-danger">{errors.name}</span>
                    </div>
                    
                    <div className="form-group mb-3">
                        <textarea name="description" placeholder="Description" onChange={handleInput} value={product.description} className="form-control"></textarea>
                    </div>

                </div>
                {/* SEO TAGS */}
                <div className="tab-pane card-body border fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    
                    <div className="form-group mb-3">
                        <input type="text" name="meta_title" placeholder="Meta title" onChange={handleInput} value={product.meta_title} className="form-control"/>
                        <span>{errors.meta_title}</span>
                    </div>

                    <div className="form-group mb-3">
                        <textarea name="meta_keyword" placeholder="Meta Keyword" onChange={handleInput} value={product.meta_keyword} className="form-control"></textarea>
                    </div>

                    <div className="form-group mb-3">
                        <textarea name="meta_description" placeholder="Meta Description" onChange={handleInput} value={product.meta_description} className="form-control"></textarea>
                    </div>
                </div>
                {/* Other details */}
                <div className="tab-pane card-body border fade" id="nav-other-details" role="tabpanel" aria-labelledby="nav-other-details-tab" tabindex="0">     
                    <div className="row">
                        <div className="col-md-4 form-group mb-3">
                            <label>Selling Price</label>
                            <input type="text" name="selling_price" onChange={handleInput} value={product.selling_price} placeholder="Selling Price" className="form-control"/>
                            <span className="text-danger">{errors.selling_price}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Original Price</label>
                            <input type="text" name="original_price" placeholder="Original Price" onChange={handleInput} value={product.original_price} className="form-control"/>
                            <span className="text-danger">{errors.original_price}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Quantity</label>
                            <input type="number" name="quantity" placeholder="Quantity" onChange={handleInput} value={product.quantity} className="form-control"/>
                            <span className="text-danger">{errors.quantity}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Brand</label>
                            <input type="text" name="brand" placeholder="Brand" onChange={handleInput} value={product.brand} className="form-control"/>
                            <span className="tex-danger">{errors.brand}</span>
                        </div>
                        <div className="col-md-8 form-group mb-3">
                            <label>Image</label>
                            <input type="file" name="image" onChange={handleImage} className="form-control"/>
                            <span className="text-danger">{errors.image}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Featured (checked=shown)</label>
                            <input type="checkbox" name="featured" placeholder="Featured" onChange={handleInput} value={product.featured} className="w-50 h-50"/>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Popular (checked=shown)</label>
                            <input type="checkbox" name="popular" placeholder="popular" onChange={handleInput} value={product.popular} className="w-50 h-50"/>
                            </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Status (checked=hidden)</label>
                            <input type="checkbox" name="status" placeholder="status" onChange={handleInput} value={product.status} className="w-50 h-50"/>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary float-end">Enregistre</button>
        </form>    
    </div>
    );
}

export default EditProduct;