import { navData } from "@/components/elements/sidebar/NavData";
import { NavMain } from "@/components/elements/sidebar/NavMain";
import { NavUser } from "@/components/elements/sidebar/NavUser";
import { TeamSwitcher } from "@/components/elements/sidebar/TeamSwitcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser user={navData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
