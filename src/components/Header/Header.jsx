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
    SideNavItems
} from "carbon-components-react";

const Header = () => {
    return (
        <HeaderContainer
            render={({isSideNavExpanded, onClickSideNavExpand}) => (
                <HeaderCarbon aria-label="AECB">
                    <SkipToContent />
                    <HeaderMenuButton
                        aria-label="Abrir menú"
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName href="/" prefix="Banco Nacional">
                        AECB
                    </HeaderName>
                    <HeaderNavigation aria-label="Banco Nacional AECB">
                        <HeaderMenu aria-label="Clientes" menuLinkName="Clientes">
                            {/*isCurrentPage*/}
                            <HeaderMenuItem href="#">Solicitar Preaprobación</HeaderMenuItem>
                            <HeaderMenuItem href="#">Detalle de Solicitud</HeaderMenuItem>
                            <HeaderMenuItem href="#">Historial de Solicitudes</HeaderMenuItem>
                        </HeaderMenu>
                        <HeaderMenu aria-label="Administradores" menuLinkName="Administradores">
                            <HeaderMenuItem href="#">Clientes Registrados</HeaderMenuItem>
                            <HeaderMenuItem href="#">Tarjetas de Crédito</HeaderMenuItem>
                            <HeaderMenuItem href="#">Reportes</HeaderMenuItem>
                        </HeaderMenu>
                        <HeaderMenuItem href="#">Nuestros Beneficios</HeaderMenuItem>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Navegación lateral"
                        expanded={isSideNavExpanded}
                        isPersistent={false}>
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <HeaderMenu aria-label="Clientes" menuLinkName="Clientes">
                                    {/*isCurrentPage*/}
                                    <HeaderMenuItem href="#">Solicitar Preaprobación</HeaderMenuItem>
                                    <HeaderMenuItem href="#">Detalle de Solicitud</HeaderMenuItem>
                                    <HeaderMenuItem href="#">Historial de Solicitudes</HeaderMenuItem>
                                </HeaderMenu>
                                <HeaderMenu aria-label="Administradores" menuLinkName="Administradores">
                                    <HeaderMenuItem href="#">Clientes Registrados</HeaderMenuItem>
                                    <HeaderMenuItem href="#">Tarjetas de Crédito</HeaderMenuItem>
                                    <HeaderMenuItem href="#">Reportes</HeaderMenuItem>
                                </HeaderMenu>
                                <HeaderMenuItem href="#">Nuestros Beneficios</HeaderMenuItem>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                </HeaderCarbon>
            )}
        />
    )
}

export default Header;