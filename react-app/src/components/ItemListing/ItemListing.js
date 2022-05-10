import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addOneItemThunk } from '../../store/item'
import { useHistory } from "react-router-dom";
function ItemListing() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("")
    const [image_url, setImage_url] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0);
    const [errors, setErrors] = useState([]);
    const user_id = useSelector(state => state.session.user.id);

    const itemSubmit = async e => {
        e.preventDefault();
        let newItem = {
            name,
            image_url,
            description,
            price,
            quantity,
            user_id,
            created_at: new Date()
        }
        await dispatch(addOneItemThunk(newItem))
        .then((res)=>{
            if(!res?.ok){
              setErrors(res?.errors)
            }else{
              setErrors([])
              history.push("/")
            }
        })
    }


    return (
        <div>
            <h1>Create A Listing</h1>
            <div>
                <form id="add-item-form" onSubmit={itemSubmit}>
                    <div>
                        {errors?.length > 0 && errors?.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <label>
                        Name:
                    </label>
                    <input
                        id="add-item-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>
                        Image Upload:
                    </label>
                    <input
                        id="add-item-image"
                        type="url"
                        value={image_url}
                        onChange={(e) => setImage_url(e.target.value)}
                    />
                    <label>
                        Description:
                    </label>
                    <input
                        id="add-item-description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>
                        Price:
                    </label>
                    <input
                        id="add-item-description"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label>
                        Quantity:
                    </label>
                    <input
                        id="add-item-description"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button type='submit' id="submit-button">Add Item</button>
                </form>
            </div>
        </div>
    )
}

export default ItemListing;