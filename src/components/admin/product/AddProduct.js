import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import swal from 'sweetalert';

const AddProduct = () =>{

    const [categoryList, setCategoryList] = useState([]);
    
    const [picture, setPicture] = useState([]);

    const [errors, setErrorsList] = useState([]);

    const [productInput, setProduct] = useState({
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

    }, []);

    const handleInput = (e) =>{
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value});
    }

    const handleImage = e =>{
        e.persist();
        setPicture({ image: e.target.files[0] });
    }

    const SumbitProduct = (e) =>{

        

        e.preventDefault();

        const formData = new FormData();

        formData.append('image', picture.image);
        formData.append('id_category', productInput.id_category);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_description', productInput.meta_description);

        formData.append('brand', productInput.brand);
        formData.append('quantity', productInput.quantity);
        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('popular', productInput.popular);
        formData.append('featured', productInput.featured);
        formData.append('status', productInput.status);

        axios.post(`api/store-product`, formData).then(res =>{

            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   

            if(res.data.status === 200){
                console.log("réussi");
                swal("Success", res.data.message, "success");
                setProduct({...productInput, 
                    id_category: '',
                    slug: '',
                    name: '',
                    description: '',
                    meta_title: '',
                    meta_keyword: '',
                    meta_description: '',
                    image:'',
                    featured: '',
                    popular: '',
                    selling_price: '',
                    original_price: '',
                    quantity: '',
                    brand: '',
                    status: ''
                });

            }else if(res.data.status === 422){
                swal("All fiels are mandetory", "", "error");
                setErrorsList(res.data.errors);
            }
            
        });
        console.log("Il n'y a rien");
    }

    return (
        <div className="container-fluid pt-2">
        <div className="elevation-1 mb-2 p-2 bg-white">
            <h3>Add Product</h3>
        </div>
        <form encType="multipart/form-data" onSubmit={SumbitProduct}> 
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
                       <select name="id_category" onChange={handleInput} value={productInput.id_category} className="form-control">
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
                        <input type="text" name="slug" placeholder="slug" onChange={handleInput} value={productInput.slug} className="form-control"/>
                        <span className="text-danger">{errors.slug}</span>
                    </div>
                    
                    <div className="form-group mb-3">
                        <input type="text" name="name" placeholder="Name" onChange={handleInput} value={productInput.name} className="form-control"/>
                        <span className="text-danger">{errors.name}</span>
                    </div>
                    
                    <div className="form-group mb-3">
                        <textarea name="description" placeholder="Description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                    </div>

                </div>
                {/* SEO TAGS */}
                <div className="tab-pane card-body border fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    
                    <div className="form-group mb-3">
                        <input type="text" name="meta_title" placeholder="Meta title" onChange={handleInput} value={productInput.meta_title} className="form-control"/>
                        <span>{errors.meta_title}</span>
                    </div>

                    <div className="form-group mb-3">
                        <textarea name="meta_keyword" placeholder="Meta Keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control"></textarea>
                    </div>

                    <div className="form-group mb-3">
                        <textarea name="meta_description" placeholder="Meta Description" onChange={handleInput} value={productInput.meta_description} className="form-control"></textarea>
                    </div>
                </div>
                {/* Other details */}
                <div className="tab-pane card-body border fade" id="nav-other-details" role="tabpanel" aria-labelledby="nav-other-details-tab" tabindex="0">     
                    <div className="row">
                        <div className="col-md-4 form-group mb-3">
                            <label>Selling Price</label>
                            <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} placeholder="Selling Price" className="form-control"/>
                            <span className="text-danger">{errors.selling_price}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Original Price</label>
                            <input type="text" name="original_price" placeholder="Original Price" onChange={handleInput} value={productInput.original_price} className="form-control"/>
                            <span className="text-danger">{errors.original_price}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Quantity</label>
                            <input type="number" name="quantity" placeholder="Quantity" onChange={handleInput} value={productInput.quantity} className="form-control"/>
                            <span className="text-danger">{errors.quantity}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Brand</label>
                            <input type="text" name="brand" placeholder="Brand" onChange={handleInput} value={productInput.brand} className="form-control"/>
                            <span className="tex-danger">{errors.brand}</span>
                        </div>
                        <div className="col-md-8 form-group mb-3">
                            <label>Image</label>
                            <input type="file" name="image" onChange={handleImage} className="form-control"/>
                            <span className="text-danger">{errors.image}</span>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Featured (checked=shown)</label>
                            <input type="checkbox" name="featured" placeholder="Featured" onChange={handleInput} value={productInput.featured} className="w-50 h-50"/>
                        </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Popular (checked=shown)</label>
                            <input type="checkbox" name="popular" placeholder="popular" onChange={handleInput} value={productInput.popular} className="w-50 h-50"/>
                            </div>
                        <div className="col-md-4 form-group mb-3">
                            <label>Status (checked=hidden)</label>
                            <input type="checkbox" name="status" placeholder="status" onChange={handleInput} value={productInput.status} className="w-50 h-50"/>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary float-end">Enregistre</button>
        </form>    
    </div>
    );
}

export default AddProduct;