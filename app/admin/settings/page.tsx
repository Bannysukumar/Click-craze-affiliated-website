import { getSiteSettings } from "@/lib/data"
import { AdminSettingsClient } from "./admin-settings-client"

export default async function AdminSettingsPage() {
  const siteSettings = await getSiteSettings()
  return <AdminSettingsClient siteSettings={siteSettings} />
}
