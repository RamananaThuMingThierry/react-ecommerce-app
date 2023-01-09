import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory } from "react-router-dom";

const EditCategory = (props) =>{

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleInput = e =>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value});
    }

    useEffect(() =>{

        const id_category = props.match.params.id;
        
        axios.get(`api/edit-category/${id_category}`).then(res =>{
            if(res.data.status === 200){
                setCategory(res.data.category);
            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                history.push("/admin/view-category");
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const status = categoryInput.status;

    if(loading){
        return <h4>Loading category...</h4>
    }

    const updateCategory = e =>{
        e.preventDefault();

        const id_category = props.match.params.id;

        const data = categoryInput;

        axios.put(`api/update-category/${id_category}`, data).then(res =>{
            if(res.data.status === 200){
                swal("Success", res.data.message, "success");
                history.push("/admin/view-category");
                setErrors([]);
            }else if(res.data.status === 422){
                
                swal("All fields are mandetory", "", "error");
                setErrors(res.data.errors);

            }else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                history.push("/admin/view-category");
            }
        });
    }

    return (
        <div className="container-fluid pt-2">
            <div className="elevation-1 mb-2 p-2 bg-white">
                <h3>
                    Edit Category
                    <Link to="/admin/view-category" className="btn btn-danger btn-sm float-end"><i className="fas fa-angle-left"></i></Link>
                </h3>
            </div>
            <form onSubmit={updateCategory}>
                <nav>
                    <div className="nav elevation-1 bg-white nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                    </div>
                </nav>
                <div className="tab-content bg-white elevation-1" id="nav-tabContent">
                    <div className="tab-pane card-body border fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        
                        <div className="form-group mb-3">
                            <input type="text" name="slug" placeholder="Slug" onChange={handleInput} value={categoryInput.slug} className="form-control"/>
                            <small className="text-danger">{errors.slug}</small>
                        </div>
                        
                        <div className="form-group mb-3">
                            <input type="text" name="name" placeholder="Name" onChange={handleInput} value={categoryInput.name} className="form-control"/>
                            <small className="text-danger">{errors.name}</small>
                        </div>
                        
                        <div className="form-group mb-3">
                            <textarea name="description" placeholder="Description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                        </div>
                        
                        <div className="form-group mb-3">
                            <label>status </label>
                            <input type="checkbox" name="status" defaultChecked={categoryInput.status === 1 ? true : false} onChange={handleInput}/>
                            Status 0: show / 1: hidden
                        </div>

                    </div>
                    <div className="tab-pane card-body border fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                        
                        <div className="form-group mb-3">
                            <input type="text" name="meta_title" placeholder="Meta title"  onChange={handleInput} value={categoryInput.meta_title} className="form-control"/>
                            <small className="text-danger">{errors.meta_title}</small>
                        </div>

                        <div className="form-group mb-3">
                            <textarea name="meta_keyword" placeholder="Meta Keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
                        </div>

                        <div className="form-group mb-3">
                            <textarea name="meta_description" placeholder="Meta Description"  onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary float-end">Modifier</button>
            </form>    
        </div>
    );
}

export default EditCategory;