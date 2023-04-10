import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [uptime, setUptime] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [price, setPrice] = useState("");
  const [isPriceDisabled, setIsPriceDisabled] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const templates = [
    { name: "Template A", isPriceDisabled: false },
    { name: "Template B", isPriceDisabled: true },
    { name: "Template C", isPriceDisabled: false },
  ];

  const handleTemplateChange = (e) => {
    const selectedTemplate = e.target.value;
    setSelectedTemplate(selectedTemplate);
    setIsPriceDisabled(
      templates.find((template) => template.name === selectedTemplate)
        .isPriceDisabled
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUptimeChange = (e) => {
    setUptime(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <h2>Registration Form</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />

        <label htmlFor="uptime">Uptime:</label>
        <input
          type="text"
          id="uptime"
          value={uptime}
          onChange={handleUptimeChange}
        />

        <label htmlFor="template">Template:</label>
        <select
          id="template"
          value={selectedTemplate}
          onChange={handleTemplateChange}
        >
          <option value="">Select a template</option>
          {templates.map((template) => (
            <option key={template.name} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
          disabled={isPriceDisabled}
        />
      </form>

      <h2>Template Form</h2>
      <form>
        <label htmlFor="template-name">Name:</label>
        <input type="text" id="template-name" />

        <label htmlFor="uptime-setting">Uptime:</label>
        <select id="uptime-setting">
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>

        <label htmlFor="price-setting">Price:</label>
        <select id="price-setting">
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </form> */}
    </>
  );
}

export default RegistrationForm;
