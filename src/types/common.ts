export type SidebarItemDetail = {
  icon: React.ReactNode
  title: string
  to: string
}
export type SidebarItem = {
  group: string
  items: SidebarItemDetail[]
}
