import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IMainNav } from "@/interface";
import { NavLink } from "react-router-dom";

export function NavMain({ items }: IMainNav) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core links</SidebarGroupLabel>
      <SidebarMenu className="appSidebar">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <NavLink to={item.url}>
                {item.icon && <item.icon className={item.color} />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 text-gray-400" />
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
