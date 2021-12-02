import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Links } from './pages/Links';
import { DetailsLink } from './pages/DetailsLink';
import { CreateLink } from './pages/CreateLink';
import { Auth } from './pages/Auth';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route exact path='/links' element={<Links/>} />
        <Route exact path='/create' element={<CreateLink/>} />
        <Route path='/details/:id' element={<DetailsLink/>} />

        <Route path="*" element={<Navigate to ="/create" />}/>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route exact path='/' element={<Auth/>} />

      <Route path="*" element={<Navigate to ="/" />}/>
    </Routes>
  )
}