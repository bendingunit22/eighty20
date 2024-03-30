import { FormGroup, Input, Form, Button, Col, Label } from 'reactstrap';

export default function EntryTable({handler}) {
    return (
    <Form onSubmit={handler}>
        <FormGroup row>
            <Label
                for="date"
                xl={2}
            >
                Date
            </Label>
            <Col className='column' xl={10}>
                <Input
                    id="date"
                    name="date"
                    placeholder="1970-01-01"
                    type="date"
                    className='formEntry'
                    required
                >
                </Input>
            </Col>
        </FormGroup>
        <FormGroup row>
        <Label
            for="easy"
            sm={2}
        >
            Easy
        </Label>
            <Col xl={10}
            >
                <Input
                    id="easy"
                    name="easy"
                    placeholder="0"
                    type="integer"
                    required
                >
                </Input>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label
                for="hard"
                sm={2}
            >
                Hard
            </Label>
            <Col xl={10}
            >
                <Input
                    id="hard"
                    name="hard"
                    placeholder="0"
                    type="integer"
                    required
                >
                </Input>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label
                for="kilometers"
                sm={2}
            >
                Kilometers
            </Label>
            <Col xl={10}
            >
                <Input
                    id="kilometers"
                    name="kilometers"
                    placeholder="0"
                    type="float"
                    required
                >
                </Input>
            </Col>
        </FormGroup>
        <Button>
        Upload
        </Button>
    </Form>
)};