import React from "react";
import { useAuth } from "./context/AuthContext";

const RoleBasedControl = ({ allowedRoles, children, hideContent = false }) => {
    const { user, hasAnyRole } = useAuth();

    if (!user) return null;

    const userHasRequiredRole = hasAnyRole(allowedRoles);

    if (!userHasRequiredRole) {
        return hideContent ? null : <div className="text-center p-4">No tienes permisos para acceder a esta sección.</div>;
    }

    return children;
};

export default RoleBasedControl;