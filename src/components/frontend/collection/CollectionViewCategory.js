import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const CollectionVeiwCategory = () =>{

    const [Category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        
        let isMountered = true;

        axios.get(`api/all-category`).then(res =>{
            if(isMountered){
                if(res.data.status === 200){
                    setCategory(res.data.category);
                }  
            }
            setLoading(false);
        });

        return () => {
            isMountered = false;
        }
        
    },[]);

    if(loading){
        return (
            <h1>Collection ...</h1>
        );
    }

    return (
        <>
           
            <div>
                <div className="py-3 bg-warning">
                    <div className="container">
                        <h5>View Category</h5>
                    </div>
                </div>
                
                {
                    Category.map((item, idx) => {
                        return (
                            <div className="col-md-4" key={idx}>
                                <div className="card">
                                    <Link to="">
                                        <img src="" width="50px" alt="image"/>
                                    </Link>
                                    <div className="card-body">
                                        <Link to={`collections/${item.slug}`}>
                                            <h5>{item.name}</h5>
                                        </Link>
                                    </div>
                                </div>
                            </div>  
                        )
                    })
                }
                
            </div>
            <Link to="/admin/dashboard" className="btn btn-primary">Admin</Link>
        </>
    );
}

export default CollectionVeiwCategory;