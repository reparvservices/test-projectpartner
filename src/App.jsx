import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/profile/Profile";
import EditProfileResponsive from "./pages/profile/EditProfileResponsive";
import Feed from "./pages/Feed";
import Community from "./pages/Community";
import Properties from "./pages/properties/Properties";
import AddProperty from "./pages/properties/AddProperty";
import AddPropertyMobile from "./pages/properties/AddPropertyMobile";
import UpdateProperty from "./pages/properties/UpdateProperty";
import Map from "./pages/properties/Map";
import Employees from "./pages/employees/Employees";
import Enquiries from "./pages/enquiries/Enquiries";
import Customers from "./pages/customers/Customers";
import Subscription from "./pages/subscription/Subscription";
import TerritoryPartners from "./pages/territoryPartners/TerritoryPartners";
import SalesPartners from "./pages/salesPartners/SalesPartners";
import AddSalesPartner from "./pages/salesPartners/AddSalesPartner";
import AddTerritoryPartner from "./pages/territoryPartners/AddTerritoryPartner";
import Builders from "./pages/builders/Builders";
import AddBuilder from "./pages/builders/AddBuilder";
import ComparePlans from "./pages/subscription/ComparePlans";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<></>} />
        <Route path="/" element={<Layout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/map-view" element={<Map />} />
          <Route path="/property/add" element={<AddProperty />} />
          <Route path="/property/update" element={<UpdateProperty />} />
          <Route path="/property/add/Mobile" element={<AddPropertyMobile />} />
          <Route path="/not" element={<Notifications />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/builder/add" element={<AddBuilder />} />
          <Route path="/sales-partners" element={<SalesPartners />} />
          <Route path="/sales-partner/add" element={<AddSalesPartner />} />
          <Route path="/territory-partners" element={<TerritoryPartners />} />
          <Route path="/territory-partner/add" element={<AddTerritoryPartner />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscription/compare-plans" element={<ComparePlans />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfileResponsive />} />
        </Route>
        <Route path="*" element={<></>}></Route>
      </Routes>
    </>
  );
};

export default App;
