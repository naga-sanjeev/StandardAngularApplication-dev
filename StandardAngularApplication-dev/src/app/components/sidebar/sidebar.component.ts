import { Component, OnInit } from '@angular/core';

declare const $: any;
interface MenuItem {
  title: string;
  icon: string;
  path: string;
  class?: string;
  submenu?: MenuItem[];
  showSubmenu?: boolean; // Added property for showing/hiding submenu
}
export const ROUTES: MenuItem[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard' },
  { path: '/user-profile', title: 'User Profile', icon: 'person' },
  { path: '/table-list', title: 'Table List', icon: 'content_paste' },
  { path: '/typography', title: 'Typography', icon: 'library_books' },
  // { path: '/icons', title: 'Icons', icon: 'bubble_chart' },
  // { path: '/maps', title: 'Maps', icon: 'location_on' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications' },
  {
    path: '', title: 'Material Elements', icon: 'apps',
    submenu: [
      { path: '/standard-buttons',title: 'Standard Buttons', icon: '' },
      { title: 'Dropdowns', path: '/dropdowns', icon: '' },
      { title: 'Icons', path: '/icons', icon: '' },
      { title: 'Cards', path: '/cards', icon: '' },
      { title: 'List Groups', path: '/listgroups', icon: '' },
      { title: 'Stepper', path: '/stepper', icon: '' },
      { title: 'Badges', path: '/badges', icon: '' }
    ]
  },
  {
    path: '', title: 'Material Components', icon: 'widgets',
    submenu: [
      { title: 'Tabs', path: '/tabs', icon: '' },
      { title: 'Accordions', path: '/accordion', icon: '' },
      { title: 'Modals', path: '/modal', icon: '' },
      { title: 'Progress Bar', path: '/progressbar', icon: '' },
      { title: 'Tooltip & Popovers', path: '/tooltipandpopovers', icon: '' },
      { title: 'Carousel', path: '/carousel', icon: '' },
      { title: 'Pagination', path: '/pagination', icon: '' },
      { title: 'LineChart', path: '/lineChart', icon: '' },
      { title: 'BarChart', path: '/barChart', icon: '' },
      { title: 'PieChart', path: '/pieChart', icon: '' },
      { title: 'Toolbar', path: '/toolbar', icon: '' }
    ]

  },
  // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {
   }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
  
  toggleSubmenu(menuItem: MenuItem): void {
    menuItem.showSubmenu = !menuItem.showSubmenu;
  }
}
