import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default function DialogTypography({ children }: PropsWithChildren): JSX.Element {
    return <Typography variant='h6' sx={{ color: (theme) => theme.palette.grey[400] }}>{children}</Typography>
}