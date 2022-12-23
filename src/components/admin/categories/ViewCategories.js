import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ViewCategory = () =>{
    
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useEffect([]);

    useEffect(() =>{

        axios.get(`api/view-category`).then(res =>{
            
            console(res.data.category);

            if(res.status === 200){
                setCategoryList(res.data.category);   
            }
            setLoading(false);
        });

    },[]);

    if(loading){
        return <h4>Loading category...</h4>
    }

    return (
        <div className="container-fluid">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Liste des catégories
                        <Link to="/admin/add-category" className="btn btn-success float-end btn-sm">Add Category</Link>    
                 </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th colSpan={2} className="text-center">Actions</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;