import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditUserList() {
    const { id } = useParams();
    const [userlistdetails, setuserlistdetails] = useState([]);
    const [name, setName] = useState([]);
    const [address, setaddress] = useState([]);
    const [male, setmale] = useState();
    const [female, setFemale] = useState();
    const [title, setTitle] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();

    useEffect(() => {
        fetch("/api/Edit-User/" + id)
            .then((response) => response.json())
            .then((json_data) => {
                console.log(json_data.result.UsersListDetails);
                setuserlistdetails(json_data.result.UsersListDetails);
                setName(JSON.parse(json_data.result.UsersListDetails.name));
                setTitle(
                    JSON.parse(json_data.result.UsersListDetails.name).title
                );
                setFname(
                    JSON.parse(json_data.result.UsersListDetails.name).first
                );
                setLname(
                    JSON.parse(json_data.result.UsersListDetails.name).last
                );
                setaddress(
                    JSON.parse(json_data.result.UsersListDetails.address)
                );
                if (
                    json_data.result.UsersListDetails.gender == "Male" ||
                    json_data.result.UsersListDetails.gender == "male"
                ) {
                    setmale(true);
                    setFemale(false);
                } else {
                    setmale(false);
                    setFemale(true);
                }
            });
    }, [0]);

    const genderUpdate = (requestData) => {
        console.log(requestData.target.value);
        if (requestData.target.checked == true) {
            // let userlistdetails = userlistdetails;

            userlistdetails.gender = requestData.target.value;

            // setuserlistdetails(userlistdetails);
        }
    };

    const onEventChange = (requestData) => {
        let Name = requestData.target.name;
        let value = requestData.target.value;
        if (Name == "email") {
            userlistdetails.email = value;
        }
        if (Name == "phone") {
            userlistdetails.phone = value;
        }
        if (Name == "title" || Name == "first" || Name == "last") {
            let nameData = name;
            nameData[Name] = value;
            userlistdetails.name = JSON.stringify(nameData);
        }
        if (
            Name == "street" ||
            Name == "number" ||
            Name == "city" ||
            Name == "state" ||
            Name == "country"
        ) {
            let addressData = address;
            if (Name == "street") {
                addressData.street["name"] = value;
            } else if (Name == "number") {
                addressData.street[Name] = value;
            } else {
                addressData[Name] = value;
            }
            userlistdetails.address = addressData;
        }

        console.log(userlistdetails);
    };

    const onSubmit = () => {
        fetch("/api/Update-User/" + id, {
            method: "put",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userlistdetails),
        })
            .then((json_data) => json_data.json())
            .then((response) => {
                console.log(response);
                if (response.response == "success") {
                    window.location.href = "/";
                }
            });
    };

    return (
        <div className="container" style={{ marginTop: "10px" }}>
            <Link
                style={{
                    margin: "20px",
                }}
                className="btn btn-warning"
                to="/"
            >
                Home Page
            </Link>
            <div
                style={{
                    background: "#dc3545",
                    color: " #fff",
                    padding: "10px",
                }}
                className="card-header"
            >
                <h4 className="card-title text-center">User Edit</h4>
            </div>
            <div className="card">
                <form className="" method="put">
                    <div
                        className="card-body"
                        style={{
                            padding: "25px",
                            background: "#afafaf61",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <div className="col-5">
                            <div className="column">
                                <div className="form-group col-12">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="title"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={title}
                                    ></input>
                                </div>
                                <div className="form-group col-12">
                                    <label>FirstName</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="first"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={fname}
                                    ></input>
                                </div>
                                <div className="form-group col-12">
                                    <label>LastName</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="last"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={lname}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="column">
                                <div className="form-group col-12">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="form-control"
                                        name="email"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={userlistdetails.email}
                                    ></input>
                                </div>
                                <div className="form-group col-12">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="phone"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={userlistdetails.phone}
                                    ></input>
                                </div>
                                <div className="form-group col-12">
                                    <label>Gender</label>
                                    <br />
                                    <input
                                        type="radio"
                                        name="gender"
                                        onChange={(requestData) =>
                                            genderUpdate(requestData)
                                        }
                                        defaultChecked={male}
                                        value="Male"
                                    />
                                    Male{" "}
                                    <input
                                        type="radio"
                                        name="gender"
                                        onChange={(requestData) =>
                                            genderUpdate(requestData)
                                        }
                                        defaultChecked={female}
                                        value="Female"
                                    />
                                    Female
                                </div>
                            </div>
                        </div>{" "}
                    </div>

                    <div
                        className="card-body"
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "25px",
                            background: "#afafaf61",
                            paddingTop: "0px",
                        }}
                    >
                        <div className="col-5 mt-2">
                            <div className="column">
                                <div className="form-group col-12">
                                    <label>No</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="number"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={address.street?.number}
                                    ></input>
                                </div>
                                <div className="form-group col-12">
                                    <label>Street Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="street"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={address.street?.name}
                                    ></input>
                                </div>
                                <div className="form-group col-12">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="city"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={address.city}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-5 mt-2">
                            <div className="column">
                                <div className="form-group col-12">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="state"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={address.state}
                                    ></input>
                                </div>
                                <div className="form-group col-12">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="country"
                                        onChange={(requestData) =>
                                            onEventChange(requestData)
                                        }
                                        defaultValue={address.country}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "20px",
                        }}
                        className="footer  text-center"
                    >
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={() => onSubmit()}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
