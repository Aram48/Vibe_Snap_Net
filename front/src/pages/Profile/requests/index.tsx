import { useEffect, useState } from "react";
import { getAllRequests, handleAcceptRequest, hanldeDeclineRequest } from "../../../helpers/api";
import { IRequest } from "../../../helpers/types";
import { Link } from "react-router-dom";
import { BASE, DEF } from "../../../helpers/default";

export const Requests = () => {

    const [list, setList] = useState<IRequest[]>([]);

    useEffect(() => {
        getAllRequests().then((response) => {
            setList(response.payload as IRequest[]);
        });
    }, []);

    const handleAccept = (id: number) => {
        handleAcceptRequest(id)
            .then(() => {
                setList(list.filter((e) => e.id != id));
            });
    };

    const handleDecline = (id: number) => {
        hanldeDeclineRequest(id)
            .then(() => {
                setList(list.filter((e) => e.id != id));
            })
    };

    return (
        <div className="container mt-5">
            <h3>Requests</h3>
            {list.length > 0 ? (
                <ul className="list-group">
                    {list.map((req) => (
                        <li key={req.id} className="list-group-item d-flex align-items-center">
                            <img
                                src={req.user.picture ? BASE + req.user.picture : DEF}
                                alt={req.user.name}
                                className="rounded-circle me-3"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <span className="fw-bold">
                                {req.user.name} {req.user.surname}
                            </span>
                            <div className="ms-auto">
                                <button onClick={() => handleAccept(req.id)} className="btn btn-outline-info btn-sm me-2">
                                    Accept
                                </button>
                                <button onClick={() => handleDecline(req.id)} className="btn btn-outline-danger btn-sm me-2">
                                    Decline
                                </button>
                                <Link to={"/profile/" + req.user.id} className="btn btn-outline-info btn-sm me-2">
                                    Account
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">You have no follower requests yet.</p>
            )}
        </div>
    );
};