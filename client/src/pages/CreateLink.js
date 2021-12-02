import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CreateLink = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const { request } = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}`});
        navigate(`/details/${data.link._id}`);
      } catch (err) {}
    }
  }

    return (
        <div className="row">
          <div className="col offset-s2" style={{ paddingTop: '2rem'}}>
            <div className="input-field">
              <input
                placeholder="Put your link"
                id="link"
                type="text"
                value={link}
                onChange={event => {setLink(event.target.value)}}
                onKeyPress={pressHandler}
              />
              <label htmlFor="link">Put your link</label>
            </div>
          </div>
        </div>
    )
};