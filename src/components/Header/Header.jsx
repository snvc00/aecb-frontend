import {
    HeaderContainer,
    Header as HeaderCarbon,
    SkipToContent,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderMenu,
    HeaderSideNavItems,
    SideNav,
    SideNavItems,
    HeaderGlobalBar,
    HeaderGlobalAction
} from "carbon-components-react";
import {
    Login20 as Login,
    Logout20 as Logout,
} from "@carbon/icons-react";
import { AuthContext } from "../../Auth";
import { useContext } from "react";
import app from "../../firebase";
import { useHistory } from "react-router-dom";

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    let history = useHistory();

    const getPostfix = () => {
        if (!currentUser) {
            return "";
        }

        const domain = currentUser.email.split("@");
        return domain[1] === process.env.REACT_APP_ADMIN_DOMAIN ? "Admins" : "Clients";
    }

    const headerNamePostfix = getPostfix();

    const handleSession = async () => {
        if (currentUser) {
            await app.auth().signOut();
            sessionStorage.removeItem("token");
            history.push({
                pathname: "/",
                state: {
                    showSignoutModal: true
                }
            });
            window.location.reload();
        }
        else {
            window.location.replace("/login");
        }
    }

    return (
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                <HeaderCarbon aria-label="AECB">
                    <SkipToContent />
                    <HeaderMenuButton
                        aria-label="Open menu"
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName href="/" prefix="National Bank">
                        AECB {headerNamePostfix}
                    </HeaderName>

                    <HeaderNavigation aria-label="National Bank AECB">
                        <HeaderMenu aria-label="Clients" menuLinkName="Clients">
                            <HeaderMenuItem href="/preapproval">Preapproval Request</HeaderMenuItem>
                            <HeaderMenuItem href="/preapproval/history">My Preapprovals</HeaderMenuItem>
                        </HeaderMenu>
                        <HeaderMenu aria-label="Admins" menuLinkName="Admins">
                            <HeaderMenuItem href="/clients">Clients</HeaderMenuItem>
                            <HeaderMenuItem href="/cards">Credit Cards</HeaderMenuItem>
                            <HeaderMenuItem href="/promotions">Promotions</HeaderMenuItem>
                            <HeaderMenuItem href="/insurances">Insurances</HeaderMenuItem>
                            <HeaderMenuItem href="/clients/preapprovals">Preapproval Requests</HeaderMenuItem>
                        </HeaderMenu>
                        <HeaderMenuItem href="/card-promotions">Promotions</HeaderMenuItem>
                        <HeaderMenuItem href="/card-insurances">Insurances</HeaderMenuItem>
                    </HeaderNavigation>

                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label={currentUser ? "Logout" : "Login"}
                            tooltipAlignment="end"
                            onClick={handleSession}
                        >
                            {
                                currentUser ?
                                    <Logout />
                                    :
                                    <Login />
                            }
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>

                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}>
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <HeaderMenu aria-label="Clients" menuLinkName="Clients">
                                    <HeaderMenuItem href="/preapproval">Preapproval Request</HeaderMenuItem>
                                    <HeaderMenuItem href="/preapproval/history">My Preapprovals</HeaderMenuItem>
                                </HeaderMenu>
                                <HeaderMenu aria-label="Admins" menuLinkName="Admins">
                                    <HeaderMenuItem href="/clients">Clients</HeaderMenuItem>
                                    <HeaderMenuItem href="/cards">Credit Cards</HeaderMenuItem>
                                    <HeaderMenuItem href="/promotions">Promotions</HeaderMenuItem>
                                    <HeaderMenuItem href="/insurances">Insurances</HeaderMenuItem>
                                    <HeaderMenuItem href="/clients/preapprovals">Preapproval Requests</HeaderMenuItem>
                                </HeaderMenu>
                                <HeaderMenuItem href="/card-promotions">Promotions</HeaderMenuItem>
                                <HeaderMenuItem href="/card-insurances">Insurances</HeaderMenuItem>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                </HeaderCarbon>
            )}
        />
    )
}

export default Header;