import React, { useState } from 'react';
import './ProfilePage.css'; // Custom CSS for styling
import { useSelector,useDispatch } from 'react-redux';
import { setlogout } from '../../redux-toolkit/userSlice';

const ProfilePage = () => {
  const isloggedin = useSelector((state) => state.user.isLoggedin);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: {
      house_no: '',
      street: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const getProfileinfo = () => {
    setProfile({
      name: '',
      email: '',
      phone_number: '',
      address: {
        house_no: '',
        street: '',
        area: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfile({
        ...profile,
        address: { ...profile.address, [addressField]: value },
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile data submitted:', profile);
  };

  const handleLogout = () => {
    dispatch(setlogout());
    console.log("logout");
  };

  return (
    isloggedin ? (
    <div className="profile-container">
      <div className="profile-box">
        <div className="header-row">
          <h2>Personal Info</h2>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p>Customize your profile information.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-row">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-row">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
              />
            </div>

            <div className="input-row">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={profile.phone_number}
                onChange={handleChange}
                pattern="[1-9]{1}[0-9]{9}"
              />
            </div>
          </div>

          <fieldset className="address-fieldset">
            <legend>Address</legend>

            <div className="form-grid">
              <div className="input-row">
                <label htmlFor="house_no">House No.</label>
                <input
                  type="text"
                  id="house_no"
                  name="address.house_no"
                  value={profile.address.house_no}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="address.street"
                  value={profile.address.street}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="area">Area</label>
                <input
                  type="text"
                  id="area"
                  name="address.area"
                  value={profile.address.area}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="address.pincode"
                  value={profile.address.pincode}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="address.city"
                  value={profile.address.city}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="address.state"
                  value={profile.address.state}
                  onChange={handleChange}
                />
              </div>
              <div className="input-row">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="address.country"
                  value={profile.address.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <div className="button-row">
            <button type="button" className="reset-button" onClick={getProfileinfo}>
              Reset
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    ) : (<h1></h1>)
  );
};

export default ProfilePage;
