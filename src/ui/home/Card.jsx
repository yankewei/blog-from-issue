import { Card, CardBody } from "@nextui-org/react";

export default function MyCard({ title }) {
  return (
    <Card shadow="none">
      <CardBody>
        <p>{title}</p>
      </CardBody>
    </Card>
  );
}
