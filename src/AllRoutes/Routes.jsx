import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RoadDamageReport from '../Components/Citizen/Pages/RoadDamageReport/RoadDamageReport'
import RoadDamageReportGov from '../Components/Gov/Pages/RoadDamageReportGov/RoadDamageReportGov'
import Home from '../Components/Home/Home'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home/>}  />
      <Route path='/roaddamage'   element={<RoadDamageReport/>}  />
      <Route path='/government'   element={<RoadDamageReportGov/>}  />

      </Routes>
    </div>
  )
}

export default AllRoutes
