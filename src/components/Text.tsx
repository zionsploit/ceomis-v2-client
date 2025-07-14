'use client'

import { Box, createPolymorphicComponent, MantineStyleProp, MantineTheme, px, TextProps, useMantineTheme } from "@mantine/core"
import { forwardRef, JSX } from "react"


/*
* ft means FontType used to display
*/
type FontTypeType = "heavyTitle" | "mediumTitle" | "title" | "smallTitle" | "medium" | "small" | "default" 

interface CustomTextProps  extends TextProps {
    label: string | JSX.Element
    ft?: FontTypeType,
    
}

function ft_helper(fontType: FontTypeType, theme: MantineTheme): MantineStyleProp {
    switch (fontType){
        case "heavyTitle":
            return {
                fontWeight: "bolder",
                fontSize: px(30)
            };
        case "mediumTitle":
            return {
                fontWeight: "bold",
                fontSize: px(25)
            };
        case "title":
            return {
                fontWeight: 500,
                fontSize: px(20)
            };
        case "smallTitle":
            return {
                fontWeight: 500,
                fontSize: theme.fontSizes.lg
            };
        case "medium":
            return {
                fontWeight: "normal",
                fontSize: theme.fontSizes.md
            }
        case "small":
            return {
                fontWeight: "normal",
                fontSize: theme.fontSizes.sm
            }
        case "default":
            return {
                fontWeight: 500,
                fontSize: theme.fontSizes.md
            }
    }
}


const TextComponent = forwardRef<HTMLParagraphElement, CustomTextProps>(({ label, ft = 'default', ...others }, ref) => {
    const theme = useMantineTheme()

    return (
         <Box 
            component="p" 
            p={0}
            m={0}
            style={ft_helper(ft, theme)}
            {...others} 
            ref={ref}>
            {label}
        </Box>
    )
});
TextComponent.displayName = "Text";

export const Text = createPolymorphicComponent<'p', CustomTextProps>(TextComponent);