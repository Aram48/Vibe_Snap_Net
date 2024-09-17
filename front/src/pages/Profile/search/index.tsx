import { useEffect, useState } from "react";
import { IUser } from "../../../helpers/types";
import { searchUsers } from "../../../helpers/api";
import { BASE, DEF } from "../../../helpers/default";
import { Link } from "react-router-dom";

export const Search = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        if (!text.trim()) {
            setUsers([]);
        } else {
            searchUsers(text)
                .then(response => {
                    setUsers(response.payload as IUser[]);
                });
        }
    }, [text]);

    return (
        <div className="container my-4">
            <input
                className="form-control mb-3"
                placeholder="Search for friends..."
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <small className="text-muted mb-3">Found {users.length} user{users.length !== 1 ? 's' : ''}</small>
            <div className="row g-4">
                {users.map(user => (
                    <div key={user.id} className="col-md-4 col-lg-3">
                        <div className="card text-center">
                            <img
                                className="card-img-top profile-pic rounded-circle mx-auto mt-3"
                                src={user.picture ? BASE + user.picture : DEF}
                                alt={`${user.name} ${user.surname}`}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{user.name} {user.surname}</h5>
                                <Link to={'/profile/' + user.id} className="btn btn-outline-success">View Profile</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};