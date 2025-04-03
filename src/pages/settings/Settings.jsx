import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../features/auth/authSlice";
import "./Settings.css";
import { toast } from "react-toastify";

const Settings = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mail: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        mail: user.mail || "", 
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.first_name.trim()) errors.first_name = "First name is required";
    if (!formData.last_name.trim()) errors.last_name = "Last name is required";

    if (!formData.mail.trim()) errors.mail = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.mail)) errors.mail = "Invalid email format";

    if (formData.password && formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mail: formData.mail,
      password: formData.password || undefined,
    };

    dispatch(updateUser(updatedData))
      .unwrap()
      .then(() => toast.success("Profile updated successfully!"))
      .catch((err) => toast.error(err || "Failed to update profile"));
  };

  return (
    <div className="settings-main">
      <div className="event-header">
        <span className="first-span">Profile</span>
        <div className="event-content">
          <span>Manage settings for your profile</span>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <h2>Edit Profile</h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group-settings">
              <label>First name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {validationErrors.first_name && <p className="error-text">{validationErrors.first_name}</p>}
            </div>

            <div className="form-group-settings">
              <label>Last name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {validationErrors.last_name && <p className="error-text">{validationErrors.last_name}</p>}
            </div>

            <div className="form-group-settings">
              <label>Email</label>
              <input
                type="email"
                name="mail"
                value={formData.mail}
                disabled
              />
              {validationErrors.mail && <p className="error-text">{validationErrors.mail}</p>}
            </div>

            <div className="form-group-settings">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {validationErrors.password && <p className="error-text">{validationErrors.password}</p>}
            </div>

            <div className="form-group-settings">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {validationErrors.confirmPassword && <p className="error-text">{validationErrors.confirmPassword}</p>}
            </div>

            <div className="form-actions">
              <button type="submit">Save</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
