var style = {
    backgroundColor: "black",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "250px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

function Footer({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

export default Footer;