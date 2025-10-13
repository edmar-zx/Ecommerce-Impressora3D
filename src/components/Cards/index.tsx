import React from "react";
import { Card, CardHeader, Icon, Value, Title } from "./styles";

type CardsProps = {
    emoji: React.ReactNode;
    title: string;
    value: string | number;
};

export function Cards({ emoji, title, value }: CardsProps) {
    return (
        <Card>
            <CardHeader>
                 <Icon>{emoji}</Icon>
                 <Value>{value}</Value>
            </CardHeader>
            <Title>{title}</Title>
        </Card>
    );
}
