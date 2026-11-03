import { Outlet, ScrollRestoration } from "react-router"
import { MainFooter } from "./MainFooter"
import { MainHeader } from "./MainHeader"
import { MainNav } from "./MainNav"

export const RootLayout = () => {
  return (
    <>
        <MainHeader />
        <MainNav />
        <main>
            <Outlet />
        </main>
        <MainFooter />
        <ScrollRestoration />
    </>
  )
}
