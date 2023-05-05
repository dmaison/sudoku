import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { alpha } from "@mui/material"

const Cell = ({ answer, column, index, row, section }) => {

    const theme = useTheme(),
    oddSection = Boolean( section % 2 === 0 ),
    borderColorBottom = useMemo( () => theme.palette[ ( oddSection || ( row % 3 === 0 ) ) ? 'primary' : 'secondary' ].light, [ theme, oddSection, row ]),
    borderColorRight = useMemo( () => theme.palette[ ( oddSection || ( column % 3 === 0 ) ) ? 'primary' : 'secondary' ].light, [ theme, oddSection, column ]);

    return (
        <Box
            sx={{
                alignItems: 'center',
                backgroundColor: oddSection ? alpha( theme.palette.secondary.light, .2 ) : null,
                borderBottom: row < 9 ? `1px solid ${ borderColorBottom }` : null,
                borderRight: column % 9 > 0 ? `1px solid ${ borderColorRight }` : null,
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                width: '100%'
            }}>
            { answer }
        </Box>
    )

}

export default Cell