export type UserRole = 
  | 'OPERATOR' 
  | 'OPERATIONS_MANAGER' 
  | 'MAINTENANCE' 
  | 'STATION_CONTROLLER' 
  | 'ADMINISTRATOR';

export interface UserProfile {
  id: string;
  name: string;
  employeeId: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  avatarInitials: string;
  lastLogin: string;
  stationAssigned?: string;
}

export interface RolePermission {
  canDispatchTrains: boolean;
  canTriggerAI: boolean;
  canChangeScenario: boolean;
  canChangeParadigm: boolean;
  canViewMaintenance: boolean;
  canViewStationCrowd: boolean;
  canAccessAuditLogs: boolean;
  canConfigureSystem: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermission> = {
  OPERATOR: {
    canDispatchTrains: true,
    canTriggerAI: true,
    canChangeScenario: true,
    canChangeParadigm: true,
    canViewMaintenance: true,
    canViewStationCrowd: true,
    canAccessAuditLogs: true,
    canConfigureSystem: false
  },
  OPERATIONS_MANAGER: {
    canDispatchTrains: true,
    canTriggerAI: true,
    canChangeScenario: true,
    canChangeParadigm: true,
    canViewMaintenance: true,
    canViewStationCrowd: true,
    canAccessAuditLogs: true,
    canConfigureSystem: true
  },
  MAINTENANCE: {
    canDispatchTrains: false,
    canTriggerAI: false,
    canChangeScenario: false,
    canChangeParadigm: false,
    canViewMaintenance: true,
    canViewStationCrowd: false,
    canAccessAuditLogs: true,
    canConfigureSystem: false
  },
  STATION_CONTROLLER: {
    canDispatchTrains: false,
    canTriggerAI: false,
    canChangeScenario: false,
    canChangeParadigm: false,
    canViewMaintenance: false,
    canViewStationCrowd: true,
    canAccessAuditLogs: false,
    canConfigureSystem: false
  },
  ADMINISTRATOR: {
    canDispatchTrains: true,
    canTriggerAI: true,
    canChangeScenario: true,
    canChangeParadigm: true,
    canViewMaintenance: true,
    canViewStationCrowd: true,
    canAccessAuditLogs: true,
    canConfigureSystem: true
  }
};

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Rajesh Kumar',
    employeeId: 'KMRL-OP-4082',
    role: 'OPERATOR',
    roleTitle: 'Chief OCC Train Controller',
    department: 'OCC Traffic Control Division',
    avatarInitials: 'RK',
    lastLogin: 'Today, 08:14 IST'
  },
  {
    id: 'usr-2',
    name: 'Meera Nambiar',
    employeeId: 'KMRL-MGR-1004',
    role: 'OPERATIONS_MANAGER',
    roleTitle: 'General Manager (Operations)',
    department: 'Metro Operations & Headway Planning',
    avatarInitials: 'MN',
    lastLogin: 'Today, 07:45 IST'
  },
  {
    id: 'usr-3',
    name: 'Sanjay Varma',
    employeeId: 'KMRL-ENG-3021',
    role: 'MAINTENANCE',
    roleTitle: 'Rolling Stock Senior Engineer',
    department: 'Muttom Maintenance Depot',
    avatarInitials: 'SV',
    lastLogin: 'Today, 06:30 IST'
  },
  {
    id: 'usr-4',
    name: 'Anjali Nair',
    employeeId: 'KMRL-SC-5098',
    role: 'STATION_CONTROLLER',
    roleTitle: 'Station Controller (Edappally)',
    department: 'Station Services & Crowd Operations',
    avatarInitials: 'AN',
    stationAssigned: 'Edappally / Aluva Section',
    lastLogin: 'Today, 08:00 IST'
  },
  {
    id: 'usr-5',
    name: 'Dr. Arjun V.',
    employeeId: 'KMRL-ADM-0001',
    role: 'ADMINISTRATOR',
    roleTitle: 'Chief Technology Architect',
    department: 'Dept. of CSE-IoT & CSBT / KMRL AI Lab',
    avatarInitials: 'AV',
    lastLogin: 'Active Session'
  }
];
