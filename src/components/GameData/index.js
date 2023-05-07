import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const GameData = () => {

    const errors = useSelector( state => state.playArea.errors );

    return (
        <Container>
            <Typography>{ `Errors: ${ errors }` }</Typography>
        </Container>
    )

}

export default GameData