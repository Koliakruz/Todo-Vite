import { ListItem } from "@mui/material";
import styled from "styled-components";

export const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: ${({ theme }) => theme.palette.background.item};
    border: 1px solid ${({ theme }) => theme.palette.border.default};
    border-radius: 4px;
    margin-bottom: 10px;

    &.completed {
        text-decoration: line-through;
    }
`;