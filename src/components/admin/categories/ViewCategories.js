import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ViewCategory = () =>{
    
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() =>{

        axios.get(`api/view-category`).then(res =>{
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
                        <Link to="/admin/add-category" className="btn btn-success float-end btn-sm"><i className="fas fa-plus"></i></Link>    
                 </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categoryList.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.slug}</td>
                                                <td>{item.status}</td>
                                                <td className="text-center">
                                                    <Link to={`see-category/${item.id}`} className="btn btn-warning btn-sm mr-2"><i className="fas fa-eye"></i></Link>
                                                    <Link to={`edit-category/${item.id}`} className="btn btn-primary btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                                    <button className="btn btn-danger btn-sm d-inline"><i className="fas fa-trash"></i></button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;