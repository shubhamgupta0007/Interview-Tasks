import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { slice } from "lodash";
export default class UserListDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userDetailsList: [],
            index: 5,
            isCompleted: false,
            initialPosts: [],
        };
    }

    loadMore() {
        this.setState({ index: this.state.index + 5 });
        setTimeout(() => {
            this.setState({
                initialPosts: slice(
                    this.state.userDetailsList,
                    0,
                    this.state.index
                ),
            });
            if (this.state.index >= this.state.userDetailsList.length) {
                this.setState({ isCompleted: true });
            }
        }, 100);
    }

    componentDidMount() {
        fetch("/api/index")
            .then((result) => result.json())
            .then((res) => {
                this.setState({ userDetailsList: res.userlist });
                this.setState({
                    initialPosts: slice(res.userlist, 0, 5),
                });
            });
    }
    save() {
        fetch("/api/save", {
            headers: {
                "content-type": "application/json",
            },
            method: "post",
        })
            .then((res) => res.json())
            .then((result) => {
                window.location.reload();
                console.log(result);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: "50px" }}>
                <div className="col-sm-12 mb-3 text-right">
                    <div
                        className="row"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        <div className="col-sm-12 col-lg-2 text-right">
                            <button
                                type="button"
                                onClick={() => this.save()}
                                className="btn btn-primary"
                            >
                                Update Users List
                            </button>
                        </div>
                        <div className="col-sm-12 col-lg-2">
                            <a
                                href="/api/Excel-Export"
                                className="btn btn-success  "
                            >
                                Download Excel
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h4
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Users List
                        </h4>
                    </div>
                    <div>
                        <Table responsive="sm" bordered hover>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Title</th>
                                    <th>First_name</th>
                                    <th>Last_name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th width="280px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.initialPosts &&
                                    this.state.initialPosts.map(
                                        (userLists, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{userLists.id}</td>
                                                    <td>
                                                        {
                                                            JSON.parse(
                                                                userLists.name
                                                            ).title
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            JSON.parse(
                                                                userLists.name
                                                            ).first
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            JSON.parse(
                                                                userLists.name
                                                            ).last
                                                        }
                                                    </td>
                                                    <td>{userLists.gender}</td>

                                                    <td>{userLists.email}</td>
                                                    <td>{userLists.phone}</td>
                                                    <td
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <Link
                                                            className="btn btn-dark"
                                                            to={
                                                                "edituser/" +
                                                                userLists.id
                                                            }
                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="d-grid mt-3 mb-5">
                    {this.state.isCompleted ? (
                        <button
                            onClick={() => this.loadMore()}
                            type="button"
                            className="btn btn-danger disabled"
                        >
                            That's It
                        </button>
                    ) : (
                        <button
                            onClick={() => this.loadMore()}
                            type="button"
                            className="btn btn-danger"
                        >
                            Load More +
                        </button>
                    )}
                </div>
            </div>
        );
    }
}
