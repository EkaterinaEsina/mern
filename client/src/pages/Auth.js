import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
  const auth = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      console.log(data);
      message(data.message);
    } catch (err) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      console.log(data);
      auth.login(data.token, data.userId);
    } catch (err) {}
  }

  return (
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1>Cut Link</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authentication</span>

            <div>

              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};