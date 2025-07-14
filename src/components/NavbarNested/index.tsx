import {
  IconFolder,
  IconFolderDown,
  IconFolderOpen,
  IconHome,
  IconReport,
  IconSettings,
  IconUsersGroup,
} from '@tabler/icons-react';
import { ScrollArea } from '@mantine/core';
import { LinksGroup } from '../NabarLinksGroup';
import classes from './index.module.css'

const NavList = [
  { label: 'Home', icon: IconHome, link: "/dashboard/home" },
  {
    label: 'Projects',
    icon: IconFolderOpen,
    links: [
      { label: 'City Funded', link: '/dashboard/projects/city-funded' },
      { label: 'Brgy Funded', link: '/dashboard/projects/brgy-funded' },
    ],
  },
  { label: 'Contractors', icon: IconUsersGroup, link: "/dashboard/contractors" },
  { label: 'Document', icon: IconFolder, link: "/document" },
  {
    label: 'Settings',
    icon: IconSettings,
    links: [
      { label: "Sustainable Dev't Goals", link: '/dashboard/settings/sdg' },
      { label: 'Source of Funds', link: '/dashboard/settings/source-of-funds' },
      { label: 'Project Types', link: '/dashboard/settings/type' },
      { label: 'Mode of implementation', link: '/dashboard/settings/incharge' },
      { label: 'Categories', link: '/dashboard/settings/category' },
      { label: 'Sectors', link: '/dashboard/settings/sector' },
      { label: 'Barangays', link: '/dashboard/settings/barangays' },
      // { label: 'Unit of measurements', link: '/' },
      // { label: 'Project Scope', link: '/' },
      { label: 'Takers', link: '/dashboard/settings/takers' },
      { label: 'Users', link: '/dashboard/settings/users' },
    ],
  },
  { label: 'Backlog', icon: IconFolderDown, link: '/' },
  {
    label: 'Reports',
    icon: IconReport,
    links: [
      { label: 'Summary List of Projects', link: '/dashboard/reports/summary-list-of-projects' },
      { label: 'Status of Projects Implementation by Year', link: '/dashboard/reports/summary-implementation-by-year' },
      { label: 'Summary of Projects per Types', link: '/dashboard/reports/summary-projects-per-type' },
      { label: 'Project Savings Reports', link: '/dashboard/reports/summary-savings-reports' },
      { label: 'Slippage Reports', link: '/dashboard/reports/summary-slippage-report' },
      { label: 'Project Financial Status', link: '/dashboard/reports/summary-financial-reports' },
      { label: 'Financial Status Summary Report', link: '/dashboard/reports/summary-financial-status-report' },
    ],
  },
];

export function NavbarNested() {
  const links = NavList.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <ScrollArea px="md" className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
    </ScrollArea>
  );
}