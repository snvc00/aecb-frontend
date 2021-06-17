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

const Header = () => {
    const { currentUser } = useContext(AuthContext);

    const getPostfix = () => {
        if (!currentUser) {
            return "";
        }

        const domain = currentUser.email.split("@");
        return domain[1] === "alumnos.udg.mx" ? "Administrativos" : "Clientes";
    }

    const headerNamePostfix = getPostfix();

    const handleSession = () => {
        if (currentUser) {
            app.auth().signOut();
            sessionStorage.clear();
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
                        aria-label="Abrir menú"
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName href="/" prefix="Banco Nacional">
                        AECB {headerNamePostfix}
                    </HeaderName>

                    <HeaderNavigation aria-label="Banco Nacional AECB">
                        <HeaderMenu aria-label="Clientes" menuLinkName="Clientes">
                            <HeaderMenuItem href="/preaprobacion">Solicitar Preaprobación</HeaderMenuItem>
                            <HeaderMenuItem href="/preaprobacion/historial">Historial de Solicitudes</HeaderMenuItem>
                        </HeaderMenu>
                        <HeaderMenu aria-label="Administradores" menuLinkName="Administradores">
                            <HeaderMenuItem href="/clientes">Clientes</HeaderMenuItem>
                            <HeaderMenuItem href="/tarjetas">Tarjetas de Crédito</HeaderMenuItem>
                            <HeaderMenuItem href="/promociones">Promociones</HeaderMenuItem>
                            <HeaderMenuItem href="/seguros">Seguros</HeaderMenuItem>
                            <HeaderMenuItem href="/clientes/solicitudes">Solicitudes</HeaderMenuItem>
                        </HeaderMenu>
                        <HeaderMenuItem href="/promociones-tarjetas">Promociones</HeaderMenuItem>
                        <HeaderMenuItem href="/seguros-tarjetas">Seguros</HeaderMenuItem>
                    </HeaderNavigation>

                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label={currentUser ? "Cerrar Sesión" : "Iniciar Sesión"}
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
                        aria-label="Navegación lateral"
                        expanded={isSideNavExpanded}
                        isPersistent={false}>
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <HeaderMenu aria-label="Clientes" menuLinkName="Clientes">
                                    {/*isCurrentPage*/}
                                    <HeaderMenuItem href="/preaprobacion">Solicitar Preaprobación</HeaderMenuItem>
                                    <HeaderMenuItem href="/preaprobacion/historial">Historial de Solicitudes</HeaderMenuItem>
                                </HeaderMenu>
                                <HeaderMenu aria-label="Administradores" menuLinkName="Administradores">
                                    <HeaderMenuItem href="/clientes">Clientes</HeaderMenuItem>
                                    <HeaderMenuItem href="/tarjetas">Tarjetas de Crédito</HeaderMenuItem>
                                    <HeaderMenuItem href="/promociones">Promociones</HeaderMenuItem>
                                    <HeaderMenuItem href="/seguros">Seguros</HeaderMenuItem>
                                    <HeaderMenuItem href="/clientes/solicitudes">Solicitudes</HeaderMenuItem>
                                </HeaderMenu>
                                <HeaderMenuItem href="/promociones-tarjetas">Promociones</HeaderMenuItem>
                                <HeaderMenuItem href="/seguros-tarjetas">Seguros</HeaderMenuItem>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                </HeaderCarbon>
            )}
        />
    )
}

export default Header;