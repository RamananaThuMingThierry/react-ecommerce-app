import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Product = () =>{

    const [loading, setLoading] = useState(true);
    const [productlist, setProductlist] = useState([]);

    useEffect(() => {
        
        axios.get(`api/list-product`).then(res => {

            if(res.status === 200){
                setProductlist(res.data.produits);
            }
            setLoading(false);
        });

    },[]);

    if(loading){
        return (
            <h1>Veuillez patientez ...!</h1>
        );
    }

    const deleteProduct = (e, id) =>{
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Suppression";

        swal({
            title: "Vous êtes sûr?",
            text: "Voulez-vous vraiment supprimer ce catégorie?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`api/delete-product/${id}`).then(res =>{
                    if(res.data.status === 200){
                        swal("Success", res.data.message, "success");
                        thisClicked.closest("tr").remove();
                    }else if(res.data.status === 404){
                        swal("Error", res.data.message, "error");
                        thisClicked.innerHTML = "<i class=\"fas fa-trash\"></i>";
                    }
                });
            } else {
              swal("La suppression a été annulé!");
              thisClicked.innerHTML = "<i class=\"fas fa-trash\"></i>";
            }
            
          });
    
    }

    return (
        <div className="container-fluid">
        <div className="card mt-4">
            <div className="card-header">
                <h4>
                    Liste des produits
                    <Link to="/admin/add-product" className="btn btn-success float-end btn-sm"><i className="fas fa-plus"></i></Link>    
             </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Selling price</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productlist.map( (item, i) =>{
                                    var var_status = "";
                                    if(item.status == '0'){
                                        var_status = "Shown";
                                    }else{
                                        var_status = "Hidden";
                                    }
                                    return (
                                        <tr key={i}>
                                            <td>{item.id}</td>
                                            <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt="image"/></td>
                                            <td>{item.category.name}</td>
                                            <td>{item.name}</td>
                                            <td>{item.selling_price}</td>
                                            <td>{var_status}</td>
                                            <td>
                                                <Link to={`view-product/${item.id}`} className="btn btn-warning btn-sm mr-2"><i className="fas fa-eye"></i></Link>
                                                <Link to={`edit-product/${item.id}`} className="btn btn-primary btn-sm mr-2"><i className="fa fa-edit"></i></Link>
                                                <button className="btn btn-danger btn-sm d-inline" onClick={(e) => deleteProduct(e, item.id)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    );
                                } )
                            }     
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Product;