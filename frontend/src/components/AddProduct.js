import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {

        if(!name || !price || !category || !brand){
            setError(true);
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch ("http://127.0.0.1:5000/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, brand, userId }),
            headers: {
                'Content-Type':'application/json',
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result = await result.json();
        if(result){
            navigate('/');
        }
    }

    return (
        <div className='center'>
            <div>
                <h3>Add Product </h3>
                <input className='input-field' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                { error && !name && <label className='invalid-input'>Enter valid input</label> }

                <input className='input-field' type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' />
                { error && !price && <label className='invalid-input'>Enter valid input</label> }

                <input className='input-field' type='text' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Category' />
                { error && !category && <label className='invalid-input'>Enter valid input</label> }

                <input className='input-field' type='text' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='Enter Brand' />
                { error && !name && <label className='invalid-input'>Enter valid input</label> }

                <button type='button' onClick={addProduct}>Add</button>
            </div>
        </div>
    )
}

export default AddProduct;