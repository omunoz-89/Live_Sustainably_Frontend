import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    const { handleLogout } = props;
    const { exp, id, name, email } = props.user;
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();

    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login again.');
    }
    const userData = props.user ? 
    (<div className="columns">
        <div className="column is-4 is-offset-4">
        <div className="card">
        <h2 id='form-title' className="column is-2 is-offset-4">Profile</h2>
        <p className="column"><strong>Name:</strong> {name}</p>
        <p className="column"><strong>Email:</strong> {email}</p>
        <p className="column"><strong>ID:</strong> {id}</p>
        </div>
        </div>
    </div>) 
    : <h4>Loading...</h4>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div>
            { props.user ? userData : errorDiv() }
        </div>
    );

}

export default Profile;