import { Container } from "@mui/material";

const PageContainer = ({ children }) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {children}
        </Container>
    );
};

export default PageContainer;
