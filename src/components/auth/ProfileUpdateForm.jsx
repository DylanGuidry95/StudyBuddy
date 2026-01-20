import { useState } from "react";
import "./SignUpPopup.css";

function ProfileUpdateForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleInformationUpdate = async (e) => {
        e.prevemtDefault();
        setLoading(true);
        //Make update call
        setLoading(false);
        //Display error messages
    }

    return (
        <div className="signup-overlay">
            <div className="signup-modal">
                <div className="signup-header">
                    <strong>Profile Details</strong>
                </div>
                <button onClick={setEdit}>Edit Information</button>
                <form onSubmit={handleInformationUpdate}>
                    <div className="signup-content">
                        <div className="form-field">
                            <label>First Name</label>
                            <input
                                value={firstName}
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                disabled={edit}
                            />
                        </div>
                        <div className="form-field">
                            <label>Last Name</label>
                            <input
                                value={lastName}
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                disabled={edit}
                            />
                        </div>
                        {edit &&
                            <>
                                <div className="form-field">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmedPassword}
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmedPassword(e.target.value)}
                                        required
                                    />
                                    {password !== confirmedPassword && (
                                        <p style={{ color: "red" }}> Passwords do not match</p>
                                    )}
                                </div>
                            </>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileUpdateForm