import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserRole, 
  RolePermission, 
  ROLE_PERMISSIONS, 
  DEMO_USERS 
} from '../types/auth';

interface RestrictedModalState {
  isOpen: boolean;
  title: string;
  requiredRole: string;
  reason: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (employeeId: string, password: string) => Promise<boolean>;
  loginWithRole: (role: UserRole) => void;
  logout: () => void;
  permissions: RolePermission;
  checkPermission: (permissionKey: keyof RolePermission, actionTitle?: string, reason?: string) => boolean;
  restrictedModal: RestrictedModalState;
  closeRestrictedModal: () => void;
  showRestrictedModal: (title: string, requiredRole: string, reason: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'kmrl_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS[0]; // Default to Operator
      }
    }
    return DEMO_USERS[0]; // Default to Chief Operator for immediate interactive demo
  });

  const [restrictedModal, setRestrictedModal] = useState<RestrictedModalState>({
    isOpen: false,
    title: '',
    requiredRole: '',
    reason: ''
  });

  const isAuthenticated = !!user;
  const permissions: RolePermission = user 
    ? ROLE_PERMISSIONS[user.role] 
    : ROLE_PERMISSIONS.OPERATOR;

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (employeeId: string, _password: string): Promise<boolean> => {
    const matched = DEMO_USERS.find(
      u => u.employeeId.toLowerCase() === employeeId.trim().toLowerCase() ||
           u.name.toLowerCase().includes(employeeId.trim().toLowerCase())
    );
    if (matched) {
      setUser(matched);
      return true;
    }
    // Fallback default match
    setUser({
      id: `usr-${Date.now()}`,
      name: employeeId.trim() || 'KMRL Officer',
      employeeId: employeeId.toUpperCase() || 'KMRL-OP-TEMP',
      role: 'OPERATOR',
      roleTitle: 'OCC Duty Officer',
      department: 'KMRL Operations Division',
      avatarInitials: 'OP',
      lastLogin: 'Just now'
    });
    return true;
  };

  const loginWithRole = (role: UserRole) => {
    const matched = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setUser(matched);
  };

  const logout = () => {
    setUser(null);
  };

  const showRestrictedModal = (title: string, requiredRole: string, reason: string) => {
    setRestrictedModal({
      isOpen: true,
      title,
      requiredRole,
      reason
    });
  };

  const closeRestrictedModal = () => {
    setRestrictedModal(prev => ({ ...prev, isOpen: false }));
  };

  const checkPermission = (
    permissionKey: keyof RolePermission, 
    actionTitle: string = 'Authorized Operation',
    customReason?: string
  ): boolean => {
    if (!permissions[permissionKey]) {
      let requiredRole = 'Operator or Administrator';
      if (permissionKey === 'canConfigureSystem') requiredRole = 'Operations Manager or Administrator';
      else if (permissionKey === 'canDispatchTrains') requiredRole = 'Train Operator or Operations Manager';
      else if (permissionKey === 'canTriggerAI') requiredRole = 'OCC Controller or Operations Manager';

      showRestrictedModal(
        actionTitle,
        requiredRole,
        customReason || `Your current role (${user?.roleTitle || user?.role}) does not have permission to execute this operational control.`
      );
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithRole,
        logout,
        permissions,
        checkPermission,
        restrictedModal,
        closeRestrictedModal,
        showRestrictedModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
