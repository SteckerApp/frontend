import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Icons, paths } from '@/constants'

export type RouteAssign =
  | 'client_dashboard'
  | 'client_request'
  | 'client_brand'
  | 'client_workspace_and_team'
  | 'client_plan_and_billings'
  | 'client_request_chat'
  | 'switch_to_affiliate'
  | 'affiliate_dashboard'
  | 'affiliate_profile'
  | 'affiliate_withdrawal'
  | 'switch_to_client'
  | 'log_out'

export interface RouteItem {
  name: string
  path: string
  icon: ReactNode
  assign: RouteAssign
  /** Route exists but is not shown in the sidebar */
  hidden?: boolean
}

// ── Client dashboard ──────────────────────────────────────────────────────────
export const clientRoutes: RouteItem[] = [
  { name: 'Dashboard', path: paths.dashboardOverview, icon: <Icons.DashboardIcon />, assign: 'client_dashboard' },
  { name: 'Request', path: paths.dashboardRequest, icon: <Icons.DashboardIcon />, assign: 'client_request' },
  { name: 'Brand', path: paths.dashboardBrand, icon: <Icons.DashboardIcon />, assign: 'client_brand' },
  { name: 'Switch to Affiliate', path: paths.affiliateDashboard, icon: <Icons.DashboardIcon />, assign: 'switch_to_affiliate' },
  { name: 'Workspace and Team', path: paths.dashboardWorkspace, icon: <Icons.DashboardIcon />, assign: 'client_workspace_and_team' },
  { name: 'My plan & billings', path: paths.dashboardBilling, icon: <Icons.DashboardIcon />, assign: 'client_plan_and_billings' },
  { name: 'Log out', path: paths.login, icon: <Icons.DashboardIcon />, assign: 'log_out' },
  { name: 'Request Chat', path: paths.dashboardRequestChat, icon: <Icons.DashboardIcon />, assign: 'client_request_chat', hidden: true },
]

// ── Affiliate dashboard ───────────────────────────────────────────────────────
export const affiliateRoutes: RouteItem[] = [
  { name: 'Dashboard', path: paths.affiliateDashboard, icon: <Icons.DashboardIcon />, assign: 'affiliate_dashboard' },
  { name: 'Profile', path: paths.affiliateDashboardProfile, icon: <Icons.DashboardIcon />, assign: 'affiliate_profile' },
  { name: 'Withdrawal', path: paths.affiliateDashboardWithdrawal, icon: <Icons.DashboardIcon />, assign: 'affiliate_withdrawal' },
  { name: 'Switch to Client', path: paths.dashboardOverview, icon: <Icons.DashboardIcon />, assign: 'switch_to_client' },
  { name: 'Log out', path: paths.login, icon: <Icons.DashboardIcon />, assign: 'log_out' },
]

// ── Backwards-compatible exports (remove once nothing imports them) ──────────
export const routeItem: RouteItem[] = [...clientRoutes, ...affiliateRoutes]
export const clientArray: RouteAssign[] = clientRoutes.filter((r) => !r.hidden).map((r) => r.assign)
export const affiliateArray: RouteAssign[] = affiliateRoutes.map((r) => r.assign)

// ── Bottom nav ────────────────────────────────────────────────────────────────

export type FooterIcon =
  | string
  | ComponentType<SVGProps<SVGSVGElement>>;

export interface FooterLink {
  to: string
  icon: FooterIcon
  label: string
}

export const footerLinks: FooterLink[] = [
  { to: paths.dashboardOverview, icon: Icons.Dashboard2Icon, label: 'Home' },
  { to: paths.dashboardRequest, icon: Icons.RequestIcon, label: 'Request' },
  { to: paths.dashboardBrand, icon: Icons.BrandIcon, label: 'Brand' },
  { to: '', icon: Icons.OtherIcon, label: 'Others' },
]

export const footerLinks2: FooterLink[] = [
  { to: paths.affiliateDashboard, icon: Icons.Dashboard2Icon, label: 'Home' },
  { to: paths.affiliateDashboardProfile, icon: Icons.RequestIcon, label: 'Profile' },
  { to: paths.affiliateDashboardWithdrawal, icon: Icons.BrandIcon, label: 'Withdraw' },
  { to: '', icon: Icons.OtherIcon, label: 'Others' },
]