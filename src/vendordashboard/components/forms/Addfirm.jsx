import React, { useState, useEffect } from 'react';
import { API_URL } from './data/apiPath';

const AddFirm = ({ showaddproducthandler }) => {
    const [firname, setFirname] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [image, setImage] = useState(null);
    const [token, setToken] = useState("");

    // Fetch token from local storage on mount
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    // Handle checkbox change for category
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(prevCategory => 
            prevCategory.includes(value) 
                ? prevCategory.filter(item => item !== value)  // Deselect
                : [...prevCategory, value]  // Select
        );
    };

    // Handle checkbox change for region
    const handleRegionChange = (e) => {
        const value = e.target.value;
        setRegion(prevRegion => 
            prevRegion.includes(value) 
                ? prevRegion.filter(item => item !== value)  // Deselect
                : [...prevRegion, value]  // Select
        );
    };

    const addfirmhandler = async (e) => {
        e.preventDefault();

        try {
            if (!token) {
                console.log({ error: "Token not found" });
                return;
            }

            const formData = new FormData();
            formData.append('firname', firname);
            formData.append('area', area);
            formData.append('category', category.join(","));  // Convert array to string
            formData.append('region', region.join(","));  // Convert array to string
            formData.append('offer', offer);
            formData.append('image', image);

            const response = await fetch(`${API_URL}/vendor/add-firm`, {
                method: 'POST',
                headers: { 'token': token },
                body: formData,
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                alert("Firm added successfully");
                setFirname("");
                setArea("");
                setCategory([]);
                setRegion([]);
                setOffer("");
                setImage(null);
                localStorage.setItem('firmid', data.id);
                showaddproducthandler();
            } else {
                alert("Firm add failed");
            }
        } catch (error) {
            alert("Error adding firm");
            console.log(error);
        }
    };

    return (
        token ? (
            <div className="login-page">
                <div className="box-add">
                    <div className="name">
                        <h1 className="h1">ADD FIRM</h1>
                    </div>
                    <div className="form_div-add">
                        <form className="page-add" onSubmit={addfirmhandler}>
                            <label className="label-1">Firm Name</label>
                            <input type="text" value={firname} onChange={(e) => setFirname(e.target.value)} required />

                            <label className="label-1">Area</label>
                            <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required />

                            <label className="label-1">Category</label>
                            <div className="check">
                                <label>Veg</label>
                                <input
                                    className='check-1'
                                    type="checkbox"
                                    value="veg"
                                    checked={category.includes("veg")}
                                    onChange={handleCategoryChange}
                                />
                                <label>Non-Veg</label>
                                <input
                                    className='check-2'
                                    type="checkbox"
                                    value="non-veg"
                                    checked={category.includes("non-veg")}
                                    onChange={handleCategoryChange}
                                />
                            </div>

                            <label className="label-1">Region</label>
                            <div className="check">
                                <label>South-Indian</label>
                                <input
                                    className='check-1'
                                    type="checkbox"
                                    value="south-indian"
                                    checked={region.includes("south-indian")}
                                    onChange={handleRegionChange}
                                />
                                <label>North-Indian</label>
                                <input
                                    className='check-2'
                                    type="checkbox"
                                    value="north-indian"
                                    checked={region.includes("north-indian")}
                                    onChange={handleRegionChange}
                                />
                            </div>

                            <label className="label-1">Offer</label>
                            <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} required />

                            <label className="label-1">Firm Image</label>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

                            <input className="submit" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        ) : (
            <div className='login-page'><h1>Login required</h1></div>
        )
    );
};

export default AddFirm;
