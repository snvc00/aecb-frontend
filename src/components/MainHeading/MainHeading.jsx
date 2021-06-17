const styles = {
    marginBottom: 30,
}

const MainHeading = ({ children }) => {
    return (
        <h2 style={styles}>
            <strong>
                {children}
            </strong>
        </h2>
    );
}

export default MainHeading;